# HRMS Lite 🚀

A lightweight Human Resource Management System for managing employees and tracking daily attendance.

## Live Demo

| Service  | URL |
|----------|-----|
| Frontend | `https://your-app.vercel.app` *(replace after deploy)* |
| Backend  | `https://your-api.onrender.com` *(replace after deploy)* |
| API Docs | `https://your-api.onrender.com/docs` |

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS      |
| Backend    | Python 3.11, FastAPI, SQLAlchemy  |
| Database   | PostgreSQL (prod), SQLite (dev)   |
| Deploy FE  | Vercel                            |
| Deploy BE  | Render                            |

---

## Features

**Employee Management**
- Add employees (ID, Name, Email, Department)
- View all employees with search/filter
- Delete employee (cascades to attendance records)
- Duplicate ID and email validation

**Attendance Management**
- Mark attendance (Present / Absent) per employee per day
- Prevent duplicate attendance for the same day
- Filter attendance records by date
- View present/absent/total summary per employee

**Dashboard**
- Total employee count
- Department count
- Today's present & absent count
- Quick-access cards & recent employee preview

---

## Run Locally

### Prerequisites
- Python 3.10+
- Node.js 18+

### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment
cp .env.example .env
# .env defaults to SQLite — no DB setup needed for local dev

# Start the server
uvicorn main:app --reload
```

API will be at: http://localhost:8000
Interactive docs: http://localhost:8000/docs

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# VITE_API_URL is set to http://localhost:8000 by default

# Start dev server
npm run dev
```

Frontend will be at: http://localhost:5173

---

## Deployment

### Backend → Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your repository
4. Set the root directory to `backend`
5. Configure:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Create a **PostgreSQL** database on Render
7. Add environment variable: `DATABASE_URL` → *(copy from your Render PostgreSQL)*
8. Deploy

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your repository
3. Set root directory to `frontend`
4. Add environment variable: `VITE_API_URL` → `https://your-render-service.onrender.com`
5. Deploy

---

## API Endpoints

### Employees
| Method | Endpoint                    | Description          |
|--------|-----------------------------|----------------------|
| GET    | `/employees/`               | List all employees   |
| POST   | `/employees/`               | Add a new employee   |
| GET    | `/employees/{id}`           | Get single employee  |
| DELETE | `/employees/{id}`           | Delete an employee   |

### Attendance
| Method | Endpoint                            | Description                     |
|--------|-------------------------------------|---------------------------------|
| POST   | `/attendance/`                      | Mark attendance                 |
| GET    | `/attendance/{employee_id}`         | Get records (optional ?date=)   |
| GET    | `/attendance/summary/{employee_id}` | Get present/absent summary      |

### Dashboard
| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | `/dashboard/stats`  | Dashboard statistics |

---

## Project Structure

```
hrms-lite/
├── backend/
│   ├── main.py           # FastAPI app entry point
│   ├── database.py       # SQLAlchemy engine & session
│   ├── models.py         # ORM models (Employee, Attendance)
│   ├── schemas.py        # Pydantic schemas & validators
│   ├── requirements.txt
│   ├── .env.example
│   └── routers/
│       ├── employees.py
│       ├── attendance.py
│       └── dashboard.py
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── api/api.js        # Axios API client
    │   ├── components/
    │   │   ├── Layout.jsx    # Sidebar + top bar
    │   │   └── UI.jsx        # Reusable components
    │   └── pages/
    │       ├── Dashboard.jsx
    │       ├── Employees.jsx
    │       └── Attendance.jsx
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

---

## Assumptions & Limitations

- Single admin user — no authentication/authorization required
- SQLite is used for local development; PostgreSQL for production
- Employee IDs are admin-assigned strings (e.g. `EMP001`)
- Attendance can only be marked once per employee per day (duplicate is rejected)
- Leave management, payroll, and other advanced HR features are out of scope
