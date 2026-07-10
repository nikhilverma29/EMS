# 🗂️ Employee Management System (EMS)

A full-stack Employee Management System built with **Express.js** (backend) and **React + Vite** (frontend).

---

## 🚀 Features

- ➕ Add employees (name, department, salary)
- 🗑️ Delete employees
- 🔍 Search by name and department
- 📊 Sort by name, department, or salary (asc/desc)
- 🏢 Locked department dropdown (10 preset departments)
- ✅ Form validation — no empty fields allowed
- 🌙 / ☀️ Light/Dark monochrome theme toggle

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, Vite |
| Backend | Node.js, Express 5 |
| Styling | Vanilla CSS (CSS Variables) |
| Data | In-memory (JSON array) |

---

## 📁 Project Structure

```
EMS/
├── backend/                # Express REST API
│   ├── controllers/        # Route handlers
│   ├── data/               # In-memory employee data
│   ├── middleware/         # Logger middleware
│   ├── routes/             # API routes
│   └── server.js           # Entry point (port 5000)
│
└── frontend/
    └── client/             # React + Vite app
        ├── src/
        │   ├── App.jsx     # Main component
        │   └── index.css   # Global styles + theme
        └── .env            # VITE_API_URL=http://localhost:5000
```

---

## ⚙️ Setup & Running Locally

### 1. Backend

```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend/client
npm install
npm run dev
# Runs on http://localhost:5173
```

> Make sure `.env` exists in the frontend folder:
> ```
> VITE_API_URL=http://localhost:5000
> ```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employees` | Get all employees |
| GET | `/employees/:id` | Get employee by ID |
| POST | `/employees` | Add new employee |
| PUT | `/employees/:id` | Update employee |
| DELETE | `/employees/:id` | Delete employee |

---

## 🏢 Available Departments

Engineering · Marketing · Sales · Human Resources · Finance · Operations · Design · Legal · Customer Support · Product Management

---

## 📝 Notes

- Data is **in-memory** — resets when the backend server restarts
- No database integration yet (planned upgrade: MongoDB/PostgreSQL)
