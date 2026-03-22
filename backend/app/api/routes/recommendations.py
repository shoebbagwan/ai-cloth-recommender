from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from app.core.database import get_db
from app.services.recommendation_engine import RecommendationEngine
from app.models.recommendation import Recommendation, FeedbackType

router = APIRouter()
engine = RecommendationEngine()

@router.get("/")
def get_recommendations(
    occasion: str = "daily",
    city: str = "Mumbai",
    body_type: str = "hourglass",
    skin_tone: str = "warm",
    gender: str = "female",
    db: Session = Depends(get_db)
):
    user_profile = {
        "body_type":  body_type,
        "skin_tone":  skin_tone,
        "gender":     gender,
        "budget_max": 5000,
    }
    results = engine.get_recommendations(user_profile, occasion, city)
    return {
        "recommendations": results,
        "count": len(results),
        "occasion": occasion,
        "city": city,
    }

class SaveOutfitRequest(BaseModel):
    user_id: int
    occasion: str
    weather_temp: float
    weather_condition: str
    outfit_name: str
    outfit_items: List[dict]
    confidence_score: float
    feedback: str

@router.post("/save")
def save_outfit(data: SaveOutfitRequest, db: Session = Depends(get_db)):
    rec = Recommendation(
        user_id          = data.user_id,
        occasion         = data.occasion,
        weather_temp     = data.weather_temp,
        weather_condition= data.weather_condition,
        outfit_items     = data.outfit_items,
        confidence_score = data.confidence_score,
        reasoning        = [f"Saved outfit: {data.outfit_name}"],
        feedback         = FeedbackType.SAVED if data.feedback == "saved" else FeedbackType.LIKE,
    )
    db.add(rec)
    db.commit()
    db.refresh(rec)
    return {"message": "Outfit saved successfully!", "id": rec.id}

@router.get("/saved/{user_id}")
def get_saved_outfits(user_id: int, db: Session = Depends(get_db)):
    saved = db.query(Recommendation).filter(
        Recommendation.user_id == user_id,
        Recommendation.feedback.in_([FeedbackType.SAVED, FeedbackType.LIKE])
    ).all()
    return {
        "saved_outfits": [
            {
                "id": r.id,
                "occasion": r.occasion,
                "outfit_items": r.outfit_items,
                "confidence_score": r.confidence_score,
                "created_at": str(r.created_at),
            } for r in saved
        ],
        "count": len(saved)
    }

@router.post("/{recommendation_id}/feedback")
def submit_feedback(
    recommendation_id: int,
    feedback: str,
    db: Session = Depends(get_db)
):
    return {
        "message": "Feedback recorded",
        "recommendation_id": recommendation_id,
        "feedback": feedback
    }