from app.core.database import engine
from sqlalchemy import text

with engine.connect() as conn:
    conn.execute(text("ALTER TABLE users ADD COLUMN gender VARCHAR DEFAULT 'unisex'"))
    conn.commit()
    print('Gender column added successfully!')