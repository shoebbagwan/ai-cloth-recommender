from app.services.ml_model import ml_model
from app.services.weather_service import WeatherService

OUTFIT_DATABASE = [
    {
        "id": 1,
        "name": "The Office Classic",
        "items": [
            {"name": "White Linen Shirt",      "category": "top",      "color": "white", "fabric": "Linen",      "color_hex": "#f0ebe0"},
            {"name": "Black Wide-Leg Trousers", "category": "bottom",   "color": "black", "fabric": "Wool blend", "color_hex": "#1a1714"},
            {"name": "Tan Block Heels",         "category": "footwear", "color": "tan",   "fabric": "Leather",    "color_hex": "#c8a06a"},
        ],
        "occasions": ["office", "formal"],
        "suitable_body_types": ["hourglass", "rectangle", "triangle"],
        "suitable_skin_tones": ["warm", "neutral"],
        "temp_min": 20, "temp_max": 38, "base_score": 0.96,
    },
    {
        "id": 2,
        "name": "Breezy Saturday",
        "items": [
            {"name": "Sage Green Blouse",    "category": "top",      "color": "sage",  "fabric": "Silk",   "color_hex": "#7a8c6e"},
            {"name": "Beige Slim Chinos",     "category": "bottom",   "color": "beige", "fabric": "Cotton", "color_hex": "#c8b89a"},
            {"name": "White Canvas Sneakers", "category": "footwear", "color": "white", "fabric": "Canvas", "color_hex": "#f5f5f0"},
        ],
        "occasions": ["daily", "casual", "travel"],
        "suitable_body_types": ["hourglass", "rectangle", "inv"],
        "suitable_skin_tones": ["warm", "neutral", "cool"],
        "temp_min": 22, "temp_max": 38, "base_score": 0.93,
    },
    {
        "id": 3,
        "name": "Festival-Ready Look",
        "items": [
            {"name": "Coral Wrap Dress",       "category": "dress",     "color": "coral", "fabric": "Chiffon", "color_hex": "#e87b5a"},
            {"name": "Gold Kolhapuri Sandals", "category": "footwear",  "color": "gold",  "fabric": "Leather", "color_hex": "#b8963e"},
            {"name": "Ivory Silk Dupatta",     "category": "accessory", "color": "ivory", "fabric": "Silk",    "color_hex": "#f5efe6"},
        ],
        "occasions": ["festival", "party", "wedding"],
        "suitable_body_types": ["hourglass", "triangle", "apple"],
        "suitable_skin_tones": ["warm", "neutral"],
        "temp_min": 20, "temp_max": 38, "base_score": 0.91,
    },
    {
        "id": 4,
        "name": "Smart Casual Date",
        "items": [
            {"name": "Ivory Midi Dress",   "category": "dress",     "color": "ivory", "fabric": "Linen",   "color_hex": "#f5efe6"},
            {"name": "Olive Linen Blazer", "category": "outerwear", "color": "olive", "fabric": "Linen",   "color_hex": "#7a8c6e"},
            {"name": "Nude Block Heels",   "category": "footwear",  "color": "nude",  "fabric": "Leather", "color_hex": "#d4b8a0"},
        ],
        "occasions": ["date", "party", "casual"],
        "suitable_body_types": ["hourglass", "rectangle", "inv"],
        "suitable_skin_tones": ["warm", "neutral", "cool"],
        "temp_min": 18, "temp_max": 35, "base_score": 0.88,
    },
    {
        "id": 5,
        "name": "Weekend Market Run",
        "items": [
            {"name": "Terracotta A-line Skirt", "category": "bottom",    "color": "terracotta", "fabric": "Cotton",  "color_hex": "#c4703f"},
            {"name": "White Linen Shirt",        "category": "top",       "color": "white",      "fabric": "Linen",   "color_hex": "#f0ebe0"},
            {"name": "Brown Leather Tote",       "category": "accessory", "color": "brown",      "fabric": "Leather", "color_hex": "#6b4c30"},
        ],
        "occasions": ["daily", "casual", "travel"],
        "suitable_body_types": ["hourglass", "triangle", "apple"],
        "suitable_skin_tones": ["warm"],
        "temp_min": 22, "temp_max": 38, "base_score": 0.85,
    },
    {
        "id": 6,
        "name": "Evening Party Look",
        "items": [
            {"name": "Sage Green Blouse",  "category": "top",       "color": "sage",  "fabric": "Silk",    "color_hex": "#7a8c6e"},
            {"name": "Black Palazzo Pants","category": "bottom",    "color": "black", "fabric": "Chiffon", "color_hex": "#1a1714"},
            {"name": "Gold Drop Earrings", "category": "accessory", "color": "gold",  "fabric": "Metal",   "color_hex": "#b8963e"},
        ],
        "occasions": ["party", "date", "festival"],
        "suitable_body_types": ["hourglass", "rectangle", "inv"],
        "suitable_skin_tones": ["warm", "neutral", "cool"],
        "temp_min": 18, "temp_max": 35, "base_score": 0.82,
    },
]


class RecommendationEngine:
    def __init__(self):
        self.weather_svc = WeatherService()

    def get_recommendations(self, user_profile: dict, occasion: str, city: str):
        weather = self.weather_svc.get_current_weather(city)
        temp    = weather["temp"]
        scored  = []

        for outfit in OUTFIT_DATABASE:
            score = self._score_outfit(outfit, user_profile, occasion, temp)
            if score > 0.3:
                scored.append({
                    **outfit,
                    "confidence_score": round(score, 2),
                    "reasoning":        self._get_reasoning(outfit, weather, occasion),
                    "weather":          weather,
                })

        scored.sort(key=lambda x: x["confidence_score"], reverse=True)
        return scored[:6]

    def _score_outfit(self, outfit, user_profile, occasion, temp):
        try:
            ml_score = ml_model.predict_score(
                occasion,
                user_profile.get('body_type', 'hourglass'),
                user_profile.get('skin_tone', 'warm'),
                user_profile.get('gender', 'female'),
                temp
            )
        except Exception:
            ml_score = outfit['base_score']

        base  = outfit['base_score']
        score = (ml_score * 0.6) + (base * 0.4)

        if outfit['temp_min'] <= temp <= outfit['temp_max']:
            score += 0.05
        else:
            score -= 0.20

        if occasion in outfit['occasions']:
            score += 0.05
        else:
            score -= 0.10

        if user_profile.get('body_type') in outfit['suitable_body_types']:
            score += 0.03

        if user_profile.get('skin_tone') in outfit['suitable_skin_tones']:
            score += 0.03

        return min(max(score, 0), 1.0)

    def _get_reasoning(self, outfit, weather, occasion):
        reasons = []
        temp = weather["temp"]
        if outfit["temp_min"] <= temp <= outfit["temp_max"]:
            reasons.append(f"Fabric suits {temp}°C weather in {weather['city']}")
        if occasion in outfit["occasions"]:
            reasons.append(f"Perfect for {occasion}")
        reasons.append("Matches your colour palette")
        reasons.append("Flatters your body type")
        return reasons