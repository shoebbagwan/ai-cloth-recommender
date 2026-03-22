import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal, engine, Base
from app.models.clothing import ClothingItem
Base.metadata.create_all(bind=engine)

ITEMS = [
  {"name":"White Linen Shirt","category":"top","color":"White","color_hex":"#F5F0E8","fabric":"linen","season":"summer","occasions":["daily","office","travel"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":22,"temp_max":42,"price":1200,"brand":"Fabindia"},
  {"name":"Navy Cotton Kurta","category":"top","color":"Navy","color_hex":"#1A2B4A","fabric":"cotton","season":"all_season","occasions":["daily","festival","casual"],"suitable_body_types":["hourglass","rectangle","triangle","apple"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":18,"temp_max":38,"price":800,"brand":"W"},
  {"name":"Sage Green Blouse","category":"top","color":"Sage","color_hex":"#7A8C6E","fabric":"silk","season":"all_season","occasions":["office","party","date"],"suitable_body_types":["hourglass","inv","rectangle"],"suitable_skin_tones":["warm","neutral"],"temp_min":18,"temp_max":35,"price":1800,"brand":"Zara"},
  {"name":"Ivory Peplum Top","category":"top","color":"Ivory","color_hex":"#F5EFE6","fabric":"chiffon","season":"summer","occasions":["party","date","casual"],"suitable_body_types":["rectangle","triangle","apple"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":20,"temp_max":38,"price":1500,"brand":"H&M"},
  {"name":"Coral Cotton Tee","category":"top","color":"Coral","color_hex":"#E87B5A","fabric":"cotton","season":"summer","occasions":["daily","casual","travel"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["warm","neutral"],"temp_min":24,"temp_max":42,"price":600,"brand":"Uniqlo"},
  {"name":"Black Sleeveless Blouse","category":"top","color":"Black","color_hex":"#1A1714","fabric":"polyester","season":"all_season","occasions":["office","party","date"],"suitable_body_types":["hourglass","rectangle","inv"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":18,"temp_max":35,"price":900,"brand":"Mango"},
  {"name":"Mustard Yellow Kurti","category":"top","color":"Mustard","color_hex":"#C4973A","fabric":"cotton","season":"all_season","occasions":["daily","festival","casual"],"suitable_body_types":["hourglass","rectangle","inv","triangle"],"suitable_skin_tones":["warm","neutral"],"temp_min":18,"temp_max":38,"price":700,"brand":"Biba"},
  {"name":"Dusty Pink Wrap Top","category":"top","color":"Dusty Pink","color_hex":"#C9968A","fabric":"chiffon","season":"summer","occasions":["party","date","casual"],"suitable_body_types":["rectangle","triangle","apple","hourglass"],"suitable_skin_tones":["cool","neutral"],"temp_min":20,"temp_max":38,"price":1400,"brand":"Vero Moda"},
  {"name":"Olive Linen Top","category":"top","color":"Olive","color_hex":"#6B7A5A","fabric":"linen","season":"summer","occasions":["daily","travel","casual"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["warm","neutral"],"temp_min":22,"temp_max":42,"price":1100,"brand":"Fabindia"},
  {"name":"Royal Blue Silk Blouse","category":"top","color":"Royal Blue","color_hex":"#2C4A8C","fabric":"silk","season":"all_season","occasions":["office","party","date"],"suitable_body_types":["hourglass","rectangle","inv"],"suitable_skin_tones":["cool","neutral"],"temp_min":18,"temp_max":35,"price":2200,"brand":"Zara"},
  {"name":"Terracotta Embroidered Kurti","category":"top","color":"Terracotta","color_hex":"#C4703F","fabric":"cotton","season":"all_season","occasions":["festival","daily","casual"],"suitable_body_types":["hourglass","rectangle","triangle","apple"],"suitable_skin_tones":["warm"],"temp_min":18,"temp_max":38,"price":1200,"brand":"W"},
  {"name":"Burgundy Velvet Blouse","category":"top","color":"Burgundy","color_hex":"#6B1A2A","fabric":"synthetic","season":"all_season","occasions":["party","wedding","date"],"suitable_body_types":["hourglass","rectangle","inv"],"suitable_skin_tones":["cool","neutral"],"temp_min":15,"temp_max":30,"price":1800,"brand":"Mango"},
  {"name":"Pastel Mint Shirt","category":"top","color":"Mint","color_hex":"#B2D8C8","fabric":"cotton","season":"summer","occasions":["daily","office","casual"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["cool","neutral"],"temp_min":22,"temp_max":40,"price":900,"brand":"Uniqlo"},
  {"name":"Floral Print Kurti","category":"top","color":"Multicolor","color_hex":"#E8A87C","fabric":"cotton","season":"summer","occasions":["daily","festival","casual"],"suitable_body_types":["hourglass","rectangle","triangle","apple"],"suitable_skin_tones":["warm","neutral"],"temp_min":20,"temp_max":38,"price":850,"brand":"Biba"},
  {"name":"Beige Slim Chinos","category":"bottom","color":"Beige","color_hex":"#C8B89A","fabric":"cotton","season":"all_season","occasions":["daily","office","casual"],"suitable_body_types":["hourglass","rectangle","inv","triangle"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":18,"temp_max":38,"price":1400,"brand":"Zara"},
  {"name":"Black Wide-Leg Trousers","category":"bottom","color":"Black","color_hex":"#1A1714","fabric":"synthetic","season":"all_season","occasions":["office","party","date"],"suitable_body_types":["hourglass","rectangle","inv","apple"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":15,"temp_max":35,"price":1600,"brand":"Mango"},
  {"name":"Terracotta A-line Skirt","category":"bottom","color":"Terracotta","color_hex":"#C4703F","fabric":"cotton","season":"summer","occasions":["daily","date","casual"],"suitable_body_types":["hourglass","triangle","apple","rectangle"],"suitable_skin_tones":["warm"],"temp_min":22,"temp_max":40,"price":1200,"brand":"Fabindia"},
  {"name":"Olive Cargo Pants","category":"bottom","color":"Olive","color_hex":"#6B7A5A","fabric":"cotton","season":"all_season","occasions":["daily","travel","casual"],"suitable_body_types":["rectangle","inv","hourglass"],"suitable_skin_tones":["warm","neutral"],"temp_min":18,"temp_max":35,"price":1800,"brand":"H&M"},
  {"name":"Navy Palazzo Pants","category":"bottom","color":"Navy","color_hex":"#1A2B4A","fabric":"chiffon","season":"all_season","occasions":["party","daily","casual"],"suitable_body_types":["hourglass","triangle","apple","rectangle"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":18,"temp_max":38,"price":1300,"brand":"W"},
  {"name":"White Cotton Palazzo","category":"bottom","color":"White","color_hex":"#F5F0E8","fabric":"cotton","season":"summer","occasions":["daily","festival","casual"],"suitable_body_types":["hourglass","triangle","apple"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":22,"temp_max":42,"price":900,"brand":"Biba"},
  {"name":"Dark Denim Jeans","category":"bottom","color":"Dark Blue","color_hex":"#2A3A5A","fabric":"denim","season":"all_season","occasions":["daily","casual","travel"],"suitable_body_types":["hourglass","rectangle","inv","triangle"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":15,"temp_max":32,"price":2000,"brand":"Levi's"},
  {"name":"Mustard Midi Skirt","category":"bottom","color":"Mustard","color_hex":"#C4973A","fabric":"cotton","season":"all_season","occasions":["daily","date","casual"],"suitable_body_types":["hourglass","triangle","apple"],"suitable_skin_tones":["warm"],"temp_min":18,"temp_max":38,"price":1100,"brand":"Zara"},
  {"name":"Black Pencil Skirt","category":"bottom","color":"Black","color_hex":"#1A1714","fabric":"synthetic","season":"all_season","occasions":["office","party","date"],"suitable_body_types":["hourglass","rectangle","inv"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":15,"temp_max":35,"price":1300,"brand":"Mango"},
  {"name":"Cream Linen Trousers","category":"bottom","color":"Cream","color_hex":"#F0EBE0","fabric":"linen","season":"summer","occasions":["office","daily","travel"],"suitable_body_types":["hourglass","rectangle","inv","triangle"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":22,"temp_max":42,"price":1700,"brand":"Uniqlo"},
  {"name":"Black Leggings","category":"bottom","color":"Black","color_hex":"#1A1714","fabric":"synthetic","season":"all_season","occasions":["gym","daily","casual"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":15,"temp_max":35,"price":700,"brand":"Nike"},
  {"name":"Coral Wrap Dress","category":"dress","color":"Coral","color_hex":"#E87B5A","fabric":"chiffon","season":"summer","occasions":["party","date","casual"],"suitable_body_types":["hourglass","triangle","apple","rectangle"],"suitable_skin_tones":["warm","neutral"],"temp_min":22,"temp_max":40,"price":2200,"brand":"Zara"},
  {"name":"Ivory Midi Dress","category":"dress","color":"Ivory","color_hex":"#F5EFE6","fabric":"linen","season":"summer","occasions":["daily","casual","date"],"suitable_body_types":["hourglass","rectangle","inv","triangle"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":22,"temp_max":40,"price":2500,"brand":"Mango"},
  {"name":"Forest Green Jumpsuit","category":"dress","color":"Forest Green","color_hex":"#2A4A2A","fabric":"synthetic","season":"all_season","occasions":["party","date","casual"],"suitable_body_types":["hourglass","rectangle","inv"],"suitable_skin_tones":["warm","neutral"],"temp_min":18,"temp_max":35,"price":2800,"brand":"Vero Moda"},
  {"name":"Navy Blue Maxi Dress","category":"dress","color":"Navy","color_hex":"#1A2B4A","fabric":"chiffon","season":"summer","occasions":["party","beach","date"],"suitable_body_types":["hourglass","rectangle","triangle","apple"],"suitable_skin_tones":["cool","neutral"],"temp_min":22,"temp_max":42,"price":3000,"brand":"H&M"},
  {"name":"Terracotta Anarkali","category":"dress","color":"Terracotta","color_hex":"#C4703F","fabric":"chiffon","season":"all_season","occasions":["festival","wedding","party"],"suitable_body_types":["hourglass","triangle","apple","rectangle"],"suitable_skin_tones":["warm"],"temp_min":18,"temp_max":38,"price":3500,"brand":"Biba"},
  {"name":"Black Bodycon Dress","category":"dress","color":"Black","color_hex":"#1A1714","fabric":"synthetic","season":"all_season","occasions":["party","date"],"suitable_body_types":["hourglass","rectangle"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":18,"temp_max":35,"price":2000,"brand":"Zara"},
  {"name":"Dusty Rose Salwar Suit","category":"dress","color":"Dusty Rose","color_hex":"#C9968A","fabric":"cotton","season":"all_season","occasions":["daily","festival","casual"],"suitable_body_types":["hourglass","rectangle","triangle","apple"],"suitable_skin_tones":["cool","neutral"],"temp_min":18,"temp_max":38,"price":1800,"brand":"W"},
  {"name":"Sage Shirt Dress","category":"dress","color":"Sage","color_hex":"#7A8C6E","fabric":"linen","season":"summer","occasions":["daily","office","casual"],"suitable_body_types":["hourglass","rectangle","inv","triangle"],"suitable_skin_tones":["warm","neutral"],"temp_min":22,"temp_max":40,"price":2200,"brand":"Uniqlo"},
  {"name":"Royal Blue Lehenga","category":"dress","color":"Royal Blue","color_hex":"#2C4A8C","fabric":"silk","season":"all_season","occasions":["wedding","festival"],"suitable_body_types":["hourglass","triangle","apple","rectangle"],"suitable_skin_tones":["cool","neutral"],"temp_min":15,"temp_max":35,"price":12000,"brand":"designer"},
  {"name":"Pink Floral Midi Dress","category":"dress","color":"Pink","color_hex":"#E8A0A0","fabric":"chiffon","season":"summer","occasions":["party","date","casual"],"suitable_body_types":["hourglass","rectangle","triangle","apple"],"suitable_skin_tones":["cool","neutral"],"temp_min":22,"temp_max":40,"price":2400,"brand":"H&M"},
  {"name":"Olive Linen Blazer","category":"outerwear","color":"Olive","color_hex":"#7A8C6E","fabric":"linen","season":"all_season","occasions":["office","smart casual","date"],"suitable_body_types":["hourglass","rectangle","inv","triangle"],"suitable_skin_tones":["warm","neutral"],"temp_min":18,"temp_max":35,"price":3500,"brand":"Zara"},
  {"name":"Camel Wool Coat","category":"outerwear","color":"Camel","color_hex":"#C8A06A","fabric":"wool","season":"winter","occasions":["formal","office","travel"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["warm","neutral"],"temp_min":8,"temp_max":20,"price":8000,"brand":"Mango"},
  {"name":"Denim Jacket","category":"outerwear","color":"Dark Blue","color_hex":"#2A3A5A","fabric":"denim","season":"all_season","occasions":["daily","casual","travel"],"suitable_body_types":["hourglass","rectangle","inv","triangle"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":15,"temp_max":28,"price":2500,"brand":"Levi's"},
  {"name":"Black Leather Jacket","category":"outerwear","color":"Black","color_hex":"#1A1714","fabric":"leather","season":"all_season","occasions":["casual","party","date"],"suitable_body_types":["hourglass","rectangle","inv"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":12,"temp_max":25,"price":6000,"brand":"Zara"},
  {"name":"Navy Blazer","category":"outerwear","color":"Navy","color_hex":"#1A2B4A","fabric":"synthetic","season":"all_season","occasions":["office","formal","smart casual"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":15,"temp_max":32,"price":4000,"brand":"Arrow"},
  {"name":"Tan Block Heels","category":"footwear","color":"Tan","color_hex":"#C8A06A","fabric":"leather","season":"all_season","occasions":["office","party","date"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["warm","neutral"],"temp_min":15,"temp_max":40,"price":2500,"brand":"Clarks"},
  {"name":"White Canvas Sneakers","category":"footwear","color":"White","color_hex":"#F5F5F0","fabric":"synthetic","season":"all_season","occasions":["daily","gym","casual"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":15,"temp_max":40,"price":3000,"brand":"Nike"},
  {"name":"Brown Leather Sandals","category":"footwear","color":"Brown","color_hex":"#8B6B3A","fabric":"leather","season":"summer","occasions":["daily","casual","travel"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["warm","neutral"],"temp_min":22,"temp_max":42,"price":1800,"brand":"Bata"},
  {"name":"Gold Kolhapuri Sandals","category":"footwear","color":"Gold","color_hex":"#B8963E","fabric":"leather","season":"all_season","occasions":["festival","wedding","party"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["warm","neutral"],"temp_min":18,"temp_max":42,"price":2000,"brand":"Kolhapuri"},
  {"name":"Black Stilettos","category":"footwear","color":"Black","color_hex":"#1A1714","fabric":"leather","season":"all_season","occasions":["party","office","formal"],"suitable_body_types":["hourglass","rectangle","inv","triangle"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":15,"temp_max":35,"price":3500,"brand":"Aldo"},
  {"name":"Nude Ballet Flats","category":"footwear","color":"Nude","color_hex":"#D4B8A0","fabric":"leather","season":"all_season","occasions":["office","daily","casual"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["warm","neutral"],"temp_min":15,"temp_max":40,"price":2200,"brand":"Clarks"},
  {"name":"Silver Strappy Heels","category":"footwear","color":"Silver","color_hex":"#C0C0C0","fabric":"synthetic","season":"all_season","occasions":["party","wedding","date"],"suitable_body_types":["hourglass","rectangle","inv","triangle"],"suitable_skin_tones":["cool","neutral"],"temp_min":15,"temp_max":40,"price":2800,"brand":"Steve Madden"},
  {"name":"Gold Jhumka Earrings","category":"accessory","color":"Gold","color_hex":"#B8963E","fabric":"leather","season":"all_season","occasions":["festival","wedding","daily"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["warm","neutral"],"temp_min":10,"temp_max":42,"price":800,"brand":"Tanishq"},
  {"name":"Silver Drop Earrings","category":"accessory","color":"Silver","color_hex":"#C0C0C0","fabric":"leather","season":"all_season","occasions":["party","office","date"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["cool","neutral"],"temp_min":10,"temp_max":42,"price":1200,"brand":"Accessorize"},
  {"name":"Brown Leather Tote","category":"accessory","color":"Brown","color_hex":"#6B4C30","fabric":"leather","season":"all_season","occasions":["office","daily","travel"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["warm","neutral"],"temp_min":10,"temp_max":42,"price":3500,"brand":"Hidesign"},
  {"name":"Ivory Silk Dupatta","category":"accessory","color":"Ivory","color_hex":"#F5EFE6","fabric":"silk","season":"all_season","occasions":["festival","wedding","daily"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":10,"temp_max":42,"price":1500,"brand":"Fabindia"},
  {"name":"Black Clutch","category":"accessory","color":"Black","color_hex":"#1A1714","fabric":"leather","season":"all_season","occasions":["party","date","formal"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["warm","cool","neutral"],"temp_min":10,"temp_max":42,"price":2000,"brand":"Aldo"},
  {"name":"Gold Chain Necklace","category":"accessory","color":"Gold","color_hex":"#B8963E","fabric":"leather","season":"all_season","occasions":["party","office","daily"],"suitable_body_types":["hourglass","rectangle","inv","triangle","apple"],"suitable_skin_tones":["warm","neutral"],"temp_min":10,"temp_max":42,"price":2500,"brand":"Tanishq"},
]

def seed():
    db = SessionLocal()
    try:
        existing = db.query(ClothingItem).count()
        if existing > 0:
            print(f"Already has {existing} items. Skipping.")
            return
        count = 0
        for item in ITEMS:
            obj = ClothingItem(
                name=item["name"],
                category=item["category"],
                color=item["color"],
                color_hex=item["color_hex"],
                fabric=item["fabric"],
                season=item["season"],
                occasions=item["occasions"],
                suitable_body_types=item["suitable_body_types"],
                suitable_skin_tones=item["suitable_skin_tones"],
                temp_min=item["temp_min"],
                temp_max=item["temp_max"],
                price=item["price"],
                brand=item.get("brand",""),
                is_user_item=False,
            )
            db.add(obj)
            count += 1
        db.commit()
        print(f"Successfully seeded {count} clothing items!")
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed()