from fastapi import APIRouter
from app.services.weather_service import WeatherService

router = APIRouter()
weather_svc = WeatherService()

@router.get("/{city}")
def get_weather(city: str):
    """Get current weather for a city with fabric advice."""
    weather = weather_svc.get_current_weather(city)
    band    = weather_svc.get_temp_band(weather["temp"])
    advice  = weather_svc.get_fabric_advice(band)
    return {
        "weather": weather,
        "temp_band": band,
        "fabric_advice": advice
    }