from sqlalchemy import Column, Integer, String, Float, ForeignKey, JSON, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.core.database import Base

class FeedbackType(str, enum.Enum):
    LIKE    = "like"
    DISLIKE = "dislike"
    SAVED   = "saved"

class Recommendation(Base):
    __tablename__ = "recommendations"

    id               = Column(Integer, primary_key=True, index=True)
    user_id          = Column(Integer, ForeignKey("users.id"), nullable=False)
    occasion         = Column(String)
    weather_temp     = Column(Float)
    weather_condition= Column(String)
    outfit_items     = Column(JSON)
    confidence_score = Column(Float)
    reasoning        = Column(JSON)
    feedback         = Column(Enum(FeedbackType), nullable=True)
    created_at       = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="recommendations")