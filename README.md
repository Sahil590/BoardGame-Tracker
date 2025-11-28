# Boardgame Tracker

A React + Django application to track boardgame scores over time.

## Structure

- `backend/`: Django REST Framework backend.
- `frontend/`: React frontend (Vite).

## Setup

### Backend

1. Navigate to `backend/`.
2. Create a virtual environment: `python3 -m venv .venv`.
3. Activate it: `source .venv/bin/activate`.
4. Install dependencies: `pip install django djangorestframework django-cors-headers`.
5. Run migrations: `python manage.py migrate`.
6. Run server: `python manage.py runserver`.

### Frontend

1. Navigate to `frontend/`.
2. Install dependencies: `npm install`.
3. Run dev server: `npm run dev`.

## Usage

Open `http://localhost:5173` to use the application.
API is available at `http://localhost:8000/api/`.
