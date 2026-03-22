# AttireAI 👗

> Your personal AI style advisor — powered by real weather, body science and machine learning.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-ML-F7931E?style=flat-square&logo=scikit-learn)](https://scikit-learn.org/)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=flat-square&logo=sqlite)](https://sqlite.org/)

---

## What is AttireAI?

AttireAI recommends the perfect outfit every morning based on your **body type**, **skin tone**, **gender**, **occasion** and **today's real weather**. It uses a Random Forest ML model to score and rank outfits — like having a personal stylist who knows the weather and your style.

---

## Features

- 🌤️ **Live weather** — real temperature and humidity via OpenWeatherMap API
- 🤖 **AI recommendations** — Random Forest ML model ranks 6 outfits with confidence scores
- 🧵 **Fabric advice** — suggests right fabrics based on actual temperature
- 🔐 **Authentication** — register and login with JWT tokens and bcrypt password hashing
- 👥 **Gender-aware** — Male / Female / Other with appropriate clothing for each
- 💾 **Save outfits** — Love it and Save buttons store outfits permanently in database
- 📋 **Outfit history** — Profile page shows all previously saved outfits
- 🧩 **Onboarding quiz** — 4-step style quiz to personalise recommendations

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, Vite, React Router, Axios |
| Backend | FastAPI, Uvicorn, SQLAlchemy, SQLite |
| Security | JWT (python-jose), bcrypt (passlib) |
| ML | scikit-learn (Random Forest), NumPy, Pandas |
| External API | OpenWeatherMap |

---

## Getting Started

### Prerequisites

- Node.js v18+
- Python 3.10+
- Free OpenWeatherMap API key → [Sign up here](https://openweathermap.org/api)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ai-cloth-recommender.git
cd ai-cloth-recommender
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Set up backend

```bash
cd backend
python -m venv venv
```

Activate virtual environment:

```bash
# Windows
venv\Scripts\activate

# Mac / Linux
source venv/bin/activate
```

Install Python packages:

```bash
pip install fastapi uvicorn sqlalchemy pydantic pydantic-settings python-jose passlib "bcrypt==4.0.1" python-multipart httpx scikit-learn numpy pandas python-dotenv
```

### 4. Create `.env` file inside `backend/`

```env
OPENWEATHER_API_KEY=your_api_key_here
DATABASE_URL=sqlite:///./cloth_recommender.db
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=60
ALGORITHM=HS256
```

### 5. Seed the database

```bash
python seed_clothing.py
```

This adds 53 clothing items to the database.

---

## Running the App

Open **two terminals** at the same time.

**Terminal 1 — Frontend**

```bash
# From project root
npm run dev
```

Runs at → `http://localhost:5173`

**Terminal 2 — Backend**

```bash
# From backend/ folder with venv activated
uvicorn app.main:app --reload --port 8080
```

Runs at → `http://localhost:8080`

Interactive API docs → `http://localhost:8080/docs`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create new user account |
| `POST` | `/api/auth/login` | Login — returns JWT token |
| `GET` | `/api/auth/me/{user_id}` | Get user profile |
| `GET` | `/api/weather/{city}` | Real weather + fabric advice |
| `GET` | `/api/recommendations/` | Get 6 ML-ranked outfit recommendations |
| `POST` | `/api/recommendations/save` | Save a liked outfit |
| `GET` | `/api/recommendations/saved/{user_id}` | Get all saved outfits for a user |

---

## Project Structure

```
ai-cloth-recommender/
│
├── src/                          # React frontend
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── OnboardingPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── WardrobePage.jsx
│   │   └── ProfilePage.jsx
│   ├── components/
│   │   └── layout/Navbar.jsx
│   ├── utils/api.js              # All Axios API calls
│   ├── App.jsx
│   └── index.css
│
├── backend/
│   ├── app/
│   │   ├── api/routes/
│   │   │   ├── auth.py
│   │   │   ├── recommendations.py
│   │   │   └── weather.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   └── security.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── clothing.py
│   │   │   └── recommendation.py
│   │   ├── services/
│   │   │   ├── weather_service.py
│   │   │   ├── recommendation_engine.py
│   │   │   └── ml_model.py
│   │   └── main.py
│   ├── seed_clothing.py
│   └── .env                      # Never commit this file
│
├── package.json
├── vite.config.js
└── README.md
```

---

## How the ML Model Works

The Random Forest model scores each outfit based on 5 inputs:

```
Inputs → Occasion, Body type, Skin tone, Gender, Temperature

Final Score = (ML score × 0.6) + (Base score × 0.4)
            + Weather match  (+0.05)
            + Occasion match (+0.05)
            + Body type match (+0.03)
            + Skin tone match (+0.03)
```

Trained on 840 synthetic data points. As users save and like outfits, the model can be retrained on real feedback data for better accuracy.

---

## Deploying to Production

Change one line in `.env` to switch from SQLite to PostgreSQL:

```env
DATABASE_URL=postgresql://username:password@host/dbname
```

Recommended hosting:

| Service | For | Cost |
|---------|-----|------|
| [Vercel](https://vercel.com/) | Frontend | Free |
| [Render](https://render.com/) | Backend | Free tier |
| [Supabase](https://supabase.com/) | PostgreSQL database | Free tier |

---

## License

This project is licensed under the MIT License.

---

<div align="center">
  Built with ❤️ &nbsp;·&nbsp; AttireAI 2026
</div>
