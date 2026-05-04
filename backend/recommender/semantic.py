import json
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Load dataset
with open("data.json", "r") as f:
    data = json.load(f)

items = [item["name"] for item in data]

model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model.encode(items)

def semantic_recommend(query):
    q = model.encode([query])
    scores = cosine_similarity(q, embeddings)[0]

    ranked = sorted(
        list(enumerate(scores)),
        key=lambda x: x[1],
        reverse=True
    )

    return [items[i[0]] for i in ranked[:15]]