import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

data = pd.DataFrame({
    "item": ["Laptop", "Phone", "Headphones", "Camera"],
    "description": [
        "electronics computer device",
        "mobile smartphone communication",
        "audio music sound",
        "photography video camera"
    ]
})

vectorizer = TfidfVectorizer()
vectors = vectorizer.fit_transform(data["description"])

def recommend_items(user_input):
    user_vec = vectorizer.transform([user_input])
    similarity = cosine_similarity(user_vec, vectors)
    scores = similarity[0]

    ranked = sorted(list(enumerate(scores)), key=lambda x: x[1], reverse=True)

    return [data.iloc[i[0]]["item"] for i in ranked[:3]]