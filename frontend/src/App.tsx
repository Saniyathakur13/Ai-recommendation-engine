import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const search = async (q: string) => {
    if (!q) return;

    setQuery(q);
    setLoading(true);

    try {
      const res = await axios.get(
        `https://ai-recommendation-engine-b73q.vercel.app/`
      );
      setResults(res.data.results);
    } catch {
      setResults(["Error fetching results"]);
    }

    setLoading(false);
  };
  useEffect(() => {
  axios.get("http://127.0.0.1:8000/categories")
    .then(res => setCategories(res.data.categories))
    .catch(err => console.error(err));
}, []);

  return (
  <div style={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    fontFamily: "Inter, sans-serif",
    padding: "40px"
  }}>

    {/* 🔥 Header */}
    <div style={{ textAlign: "center", marginBottom: "30px" }}>
      <h1 style={{
        fontSize: "40px",
        fontWeight: "bold",
        marginBottom: "8px"
      }}>
        AI Recommendation Engine
      </h1>

      <p style={{ color: "#94a3b8" }}>
        Discover products, tools & ideas instantly
      </p>
    </div>

    {/* 🔍 Search Bar */}
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginBottom: "30px"
    }}>
      <div style={{
        display: "flex",
        background: "#1e293b",
        borderRadius: "14px",
        padding: "6px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
      }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search(query)}
          placeholder="Search anything (music, gadgets, travel...)"
          style={{
            width: "420px",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            background: "transparent",
            color: "white",
            fontSize: "15px"
          }}
        />

        <button
          onClick={() => search(query)}
          style={{
            padding: "12px 18px",
            borderRadius: "10px",
            border: "none",
            background: "#6366f1",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Search
        </button>
      </div>
    </div>

    {/* 📂 Categories */}
    <div style={{ marginBottom: "40px" }}>
      <h2 style={{
        marginBottom: "12px",
        fontSize: "18px",
        color: "#cbd5f5"
      }}>
        Explore Categories
      </h2>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px"
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => search(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: "999px",
              border: "1px solid #334155",
              background: "#020617",
              color: "#cbd5f5",
              cursor: "pointer",
              transition: "0.2s"
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#1e293b")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#020617")
            }
          >
            {cat}
          </button>
        ))}
      </div>
    </div>

    {/* ⏳ Loading */}
    {loading && (
      <p style={{ textAlign: "center", color: "#94a3b8" }}>
        Finding best recommendations...
      </p>
    )}

    {/* ❌ Empty State */}
    {!loading && results.length === 0 && (
      <p style={{ textAlign: "center", color: "#64748b" }}>
        Try searching something like <b>“laptop”</b> or <b>“fitness”</b>
      </p>
    )}

    {/* 🧾 Results */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: "20px"
    }}>
      {results.map((item, index) => (
        <div
          key={index}
          style={{
            padding: "18px",
            borderRadius: "16px",
            background: "linear-gradient(145deg, #1e293b, #0f172a)",
            textAlign: "left",
            transition: "0.25s",
            cursor: "pointer",
            border: "1px solid #1e293b"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.border = "1px solid #6366f1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.border = "1px solid #1e293b";
          }}
        >
          <h3 style={{
            marginBottom: "8px",
            fontSize: "16px",
            fontWeight: "600"
          }}>
            {item}
          </h3>

          <p style={{
            fontSize: "13px",
            color: "#94a3b8"
          }}>
            AI Recommended
          </p>
        </div>
      ))}
    </div>
  </div>
);
}
export default App;
