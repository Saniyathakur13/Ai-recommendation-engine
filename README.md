# AI Recommendation Engine 🚀

## 📌 Overview

An AI-inspired recommendation engine that suggests products based on user search queries. Built with a modern full-stack architecture using React (frontend) and FastAPI (backend).

---

## 🧠 Features

* 🔍 Smart keyword-based search
* 📂 Dynamic categories (20+)
* 📦 1000+ product dataset
* ⚡ Fast API responses
* 🎯 Clean UI with interactive search
* ❌ No fake results (strict matching)

---

## 🏗️ Tech Stack

### Frontend

* React + TypeScript
* Axios
* Tailwind CSS

### Backend

* FastAPI (Python)
* JSON-based dataset

---

## 📁 Project Structure

```
ai-recommendation-engine/
│
├── backend/
│   ├── main.py
│   ├── data.json
│   ├── generate_data.py
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.css
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Backend

```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

* `/` → health check
* `/categories` → get all categories
* `/recommend?query=...` → search recommendations

---

## 🚀 Future Improvements

* Add product images & pricing
* Connect real database (MongoDB / PostgreSQL)
* Add filters (category, brand)
* Improve UI with modern design
* Add semantic AI (embeddings)

---

## 👩‍💻 Author

Built as a full-stack AI project for learning and portfolio.
