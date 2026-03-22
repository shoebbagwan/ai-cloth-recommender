from sqlalchemy import Column, Integer, String, Float, Boolean, Enum, JSON
from sqlalchemy.orm import relationship
import enum
from app.core.database import Base

class ClothingCategory(str, enum.Enum):
    TOP        = "top"
    BOTTOM     = "bottom"
    DRESS      = "dress"
    OUTERWEAR  = "outerwear"
    FOOTWEAR   = "footwear"
    ACCESSORY  = "accessory"

class Season(str, enum.Enum):
    SUMMER     = "summer"
    WINTER     = "winter"
    MONSOON    = "monsoon"
    ALL_SEASON = "all_season"

class Fabric(str, enum.Enum):
    COTTON     = "cotton"
    LINEN      = "linen"
    WOOL       = "wool"
    SILK       = "silk"
    POLYESTER  = "polyester"
    DENIM      = "denim"
    CHIFFON    = "chiffon"
    SYNTHETIC  = "synthetic"
    LEATHER    = "leather"

class ClothingItem(Base):
    __tablename__ = "clothing_items"

    id                  = Column(Integer, primary_key=True, index=True)
    name                = Column(String, nullable=False)
    category            = Column(Enum(ClothingCategory), nullable=False)
    color               = Column(String)
    color_hex           = Column(String)
    fabric              = Column(Enum(Fabric))
    season              = Column(Enum(Season))
    occasions           = Column(JSON)
    suitable_body_types = Column(JSON)
    suitable_skin_tones = Column(JSON)
    temp_min            = Column(Float, default=15)
    temp_max            = Column(Float, default=45)
    image_url           = Column(String)
    price               = Column(Float)
    brand               = Column(String)
    is_user_item        = Column(Boolean, default=False)
    owner_id            = Column(Integer, nullable=True)