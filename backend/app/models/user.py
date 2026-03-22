from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.core.database import Base

class BodyType(str, enum.Enum):
    RECTANGLE = "rectangle"
    TRIANGLE = "triangle"
    INVERTED_TRIANGLE = "inverted_triangle"
    HOURGLASS = "hourglass"
    APPLE = "apple"

class SkinTone(str, enum.Enum):
    COOL = "cool"
    WARM = "warm"
    NEUTRAL = "neutral"

class Gender(str, enum.Enum):
    MALE   = "male"
    FEMALE = "female"
    UNISEX = "unisex"

class StylePersona(str, enum.Enum):
    CLASSIC = "classic"
    CASUAL = "casual"
    STREETWEAR = "streetwear"
    FORMAL = "formal"
    BOHEMIAN = "bohemian"
    SPORTY = "sporty"

class User(Base):
    __tablename__ = "users"

    id               = Column(Integer, primary_key=True, index=True)
    email            = Column(String, unique=True, index=True, nullable=False)
    hashed_password  = Column(String, nullable=False)
    full_name        = Column(String)
    gender = Column(Enum(Gender), default=Gender.UNISEX)
    body_type        = Column(Enum(BodyType))
    skin_tone        = Column(Enum(SkinTone))
    style_persona    = Column(Enum(StylePersona))
    height_cm        = Column(Float)
    weight_kg        = Column(Float)
    location_city    = Column(String, default="Mumbai")
    budget_max       = Column(Float, default=5000)
    is_active        = Column(Boolean, default=True)
    onboarding_done  = Column(Boolean, default=False)
    created_at       = Column(DateTime, default=datetime.utcnow)

    recommendations  = relationship("Recommendation", back_populates="user")