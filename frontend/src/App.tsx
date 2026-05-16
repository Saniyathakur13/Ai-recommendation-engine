import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://ai-recommendation-engine-b73q.vercel.app/";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);

    try {
      const res = await axios.get(
        `${API}/recommend?query=${searchQuery}`
      );

      console.log(res.data);

      if (res.data.results) {
        setResults(res.data.results);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error(err);
      setResults([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    axios
      .get(`${API}/categories`)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data.categories || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        fontFamily: "Arial",
        padding: "40px"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "42px",
          marginBottom: "10px"
        }}
      >
        AI Recommendation Engine
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#94a3b8",
          marginBottom: "30px"
        }}
      >
        Search anything instantly
      </p>

      {/* SEARCH */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px"
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search(query);
            }
          }}
          placeholder="Search laptop, music, gaming..."
          style={{
            width: "400px",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            color: "black",
            fontSize: "16px"
          }}
        />

        <button
          onClick={() => search(query)}
          style={{
            marginLeft: "10px",
            padding: "14px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#6366f1",
            color: "white",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>

      {/* CATEGORIES */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "40px"
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setQuery(cat);
              search(cat);
            }}
            style={{
              padding: "8px 14px",
              borderRadius: "20px",
              border: "1px solid #334155",
              background: "#1e293b",
              color: "white",
              cursor: "pointer"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <p style={{ textAlign: "center" }}>
          Finding recommendations...
        </p>
      )}

      {/* RESULTS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
          gap: "20px"
        }}
      >
        {results.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "14px"
            }}
          >
            <h3>{item}</h3>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "14px"
              }}
            >
              AI Recommended
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
