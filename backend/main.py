from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .dataset import items

app = FastAPI()

# ✅ CORS (allow frontend)
app.add_middleware(
    CORSMiddleware,
    # Remove the "/" at the end of the URL - it must match exactly!
    allow_origins=["https://ai-recommendation-engine-tawny.vercel.app"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔍 SMART SEARCH (NO DUPLICATES)
def search_items(query: str):
    query = query.lower().strip()
    results = []

    for item in items:
        name = item.get("name", "").lower()
        category = item.get("category", "").lower()

        if (
            query in name
            or query in category
            or any(word in name for word in query.split())
        ):
            results.append(item.get("name"))

    return list(set(results))


# 🏠 HOME API
@app.get("/")
def home():
    return {
        "message": "Backend is Live! 🚀",
        "total_items": len(items)
    }

# 📂 GET ALL CATEGORIES
@app.get("/categories")
def get_categories():
    # Filter out empty categories and sort them
    categories = sorted(list(set([item.get("category", "") for item in items if item.get("category")])))
    return {"categories": categories}


# 🔍 RECOMMENDATION API
@app.get("/recommend")
def recommend(query: str = ""):
    if not query:
        return {
            "results": [item.get("name") for item in items[:20]]
        }

    results = search_items(query)

    if not results:
        return {
            "results": [],
            "message": f"No results found for '{query}'"
        }

    return {"results": results}
    app = app
