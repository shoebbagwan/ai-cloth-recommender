import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import pickle
import os

class OutfitMLModel:
    def __init__(self):
        self.model = RandomForestClassifier(
            n_estimators=100,
            random_state=42,
            max_depth=10
        )
        self.is_trained = False
        self.model_path = "ml_model.pkl"

    def _encode_features(self, occasion, body_type, skin_tone, gender, temp):
        OCCASIONS  = ['daily','office','party','wedding','gym','travel','date','festival']
        BODY_TYPES = ['hourglass','rectangle','triangle','inv','apple']
        SKIN_TONES = ['warm','cool','neutral']
        GENDERS    = ['male','female','unisex']

        occ_vec  = [1 if occasion  == o else 0 for o in OCCASIONS]
        bt_vec   = [1 if body_type == b else 0 for b in BODY_TYPES]
        skin_vec = [1 if skin_tone == s else 0 for s in SKIN_TONES]
        gen_vec  = [1 if gender    == g else 0 for g in GENDERS]
        temp_vec = [temp / 50.0]

        return occ_vec + bt_vec + skin_vec + gen_vec + temp_vec

    def train(self, training_data):
        if not training_data:
            self._train_with_synthetic_data()
            return

        X, y = [], []
        for d in training_data:
            features = self._encode_features(
                d['occasion'], d['body_type'],
                d['skin_tone'], d['gender'], d['temp']
            )
            X.append(features)
            y.append(d['score_bucket'])

        self.model.fit(X, y)
        self.is_trained = True
        self._save_model()

    def _train_with_synthetic_data(self):
        X, y = [], []
        occasions  = ['daily','office','party','wedding','gym','travel','date','festival']
        body_types = ['hourglass','rectangle','triangle','inv','apple']
        skin_tones = ['warm','cool','neutral']
        genders    = ['male','female','unisex']
        temps      = [15, 20, 25, 28, 32, 35, 38]

        for occ in occasions:
            for bt in body_types:
                for skin in skin_tones:
                    for gen in genders:
                        for temp in temps:
                            features = self._encode_features(occ, bt, skin, gen, temp)
                            # Smart scoring logic
                            score = 0.7
                            if occ == 'office' and bt in ['hourglass','rectangle']: score += 0.1
                            if occ == 'party'  and skin in ['warm','cool']:         score += 0.1
                            if temp > 30 and occ in ['daily','travel']:             score += 0.05
                            if gen == 'female' and occ in ['wedding','party']:      score += 0.1
                            if gen == 'male'   and occ in ['office','formal']:      score += 0.1
                            score = min(score, 1.0)
                            bucket = 'high' if score > 0.85 else 'medium' if score > 0.7 else 'low'
                            X.append(features)
                            y.append(bucket)

        self.model.fit(X, y)
        self.is_trained = True
        self._save_model()
        print(f"ML model trained with {len(X)} synthetic samples!")

    def predict_score(self, occasion, body_type, skin_tone, gender, temp):
        if not self.is_trained:
            self._load_or_train()

        features = self._encode_features(occasion, body_type, skin_tone, gender, temp)
        bucket = self.model.predict([features])[0]
        proba  = self.model.predict_proba([features])[0]
        max_proba = max(proba)

        if bucket == 'high':   return round(0.85 + (max_proba * 0.15), 2)
        if bucket == 'medium': return round(0.70 + (max_proba * 0.15), 2)
        return round(0.50 + (max_proba * 0.20), 2)

    def _save_model(self):
        with open(self.model_path, 'wb') as f:
            pickle.dump(self.model, f)

    def _load_or_train(self):
        if os.path.exists(self.model_path):
            with open(self.model_path, 'rb') as f:
                self.model = pickle.load(f)
            self.is_trained = True
        else:
            self._train_with_synthetic_data()

# Global instance
ml_model = OutfitMLModel()
ml_model._load_or_train()