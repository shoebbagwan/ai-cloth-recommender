import httpx
from app.core.config import settings

TEMP_BANDS = {
    "very_hot": {"min": 35, "max": 60,  "fabrics": ["Cotton", "Linen"],            "tip": "Very hot! Wear only lightweight natural fabrics."},
    "hot":      {"min": 28, "max": 35,  "fabrics": ["Cotton", "Linen", "Chiffon"], "tip": "Hot and humid. Stick to breathable fabrics."},
    "warm":     {"min": 20, "max": 28,  "fabrics": ["Cotton", "Synthetic"],        "tip": "Warm weather. Light fabrics work well."},
    "mild":     {"min": 15, "max": 20,  "fabrics": ["Cotton", "Light Wool"],       "tip": "Mild weather. A light jacket would help."},
    "cool":     {"min": 10, "max": 15,  "fabrics": ["Wool", "Synthetic"],          "tip": "Cool weather. Layer up for warmth."},
    "cold":     {"min": -10,"max": 10,  "fabrics": ["Wool", "Fleece", "Silk"],     "tip": "Cold weather. Wear warm layers."},
}

class WeatherService:
    BASE_URL = "https://api.openweathermap.org/data/2.5"

    def get_current_weather(self, city: str) -> dict:
        if not settings.OPENWEATHER_API_KEY:
            return self._mock_weather(city)
        try:
            url  = f"{self.BASE_URL}/weather?q={city}&appid={settings.OPENWEATHER_API_KEY}&units=metric"
            resp = httpx.get(url, timeout=10)
            data = resp.json()
            return {
                "city":        city,
                "temp":        data["main"]["temp"],
                "feels_like":  data["main"]["feels_like"],
                "humidity":    data["main"]["humidity"],
                "condition":   data["weather"][0]["main"],
                "description": data["weather"][0]["description"],
                "wind_speed":  data["wind"]["speed"],
            }
        except Exception:
            return self._mock_weather(city)

    def _mock_weather(self, city: str) -> dict:
        return {
            "city":        city,
            "temp":        32,
            "feels_like":  35,
            "humidity":    72,
            "condition":   "Clear",
            "description": "clear sky",
            "wind_speed":  3.5,
        }

    def get_temp_band(self, temp: float) -> str:
        for band, vals in TEMP_BANDS.items():
            if vals["min"] <= temp <= vals["max"]:
                return band
        return "warm"

    def get_fabric_advice(self, band: str) -> dict:
        return TEMP_BANDS.get(band, TEMP_BANDS["warm"])