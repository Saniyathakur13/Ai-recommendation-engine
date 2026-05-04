from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .dataset import items

app = FastAPI()

# ✅ CORS (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ai-recommendation-engine-tawny.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📂 LOAD DATA FROM JSON FILE



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

    # ✅ remove duplicates
    return list(set(results))


# 🏠 HOME API (DEBUG)
@app.get("/")
def home():
    return {
        "message": "Backend is Live!",
        "total_items": len(items),
        "file_found": any(os.path.exists(p) for p in possible_paths)
    }

# 📂 GET ALL CATEGORIES
@app.get("/categories")
def get_categories():
    categories = list(set([item.get("category", "") for item in items]))
    return {"categories": categories}


# 🔍 RECOMMENDATION API
@app.get("/recommend")
def recommend(query: str = ""):
    # ✅ show default items on dashboard
    if not query:
        return {
            "results": [item.get("name") for item in items[:20]]
        }

    results = search_items(query)

    # ✅ strict: no fake results
    if not results:
        return {
            "results": [],
            "message": "No results found"
        }

    return {"results": results}
