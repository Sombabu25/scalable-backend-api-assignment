# 🚀 Backend Developer Intern Assignment – Scalable REST API

## 📌 Overview

This project implements a **scalable backend system** with authentication, role-based access control, and CRUD operations, along with a minimal frontend for interaction.

Built as part of a backend developer internship assignment to demonstrate real-world API design, security practices, and system scalability.

---

## 🛠️ Tech Stack

* **Backend:** FastAPI (Python)
* **Database:** SQLite (SQLAlchemy ORM)
* **Authentication:** JWT (JSON Web Tokens)
* **Password Hashing:** Bcrypt (Passlib)
* **Frontend:** HTML + JavaScript (Vanilla)
* **API Docs:** Swagger UI (auto-generated)

---

## ✨ Features

### 🔐 Authentication & Security

* User registration with password hashing
* Secure login with JWT token generation
* Protected routes using token-based authentication
* Input validation using Pydantic schemas

### 👥 Role-Based Access Control

* Two roles: `user` and `admin`
* Users can:

  * Create tasks
  * View their own tasks
* Admin can:

  * Delete any task

### 📦 Task Management (CRUD)

* Create tasks
* View user-specific tasks
* Delete tasks (admin only)

### 📄 API Design

* RESTful endpoints
* Proper HTTP status codes
* Modular structure for scalability

---

## 📁 Project Structure

```
project/
│── backend/
│   ├── main.py          # API routes
│   ├── models.py        # Database models
│   ├── schemas.py       # Request/response schemas
│   ├── auth.py          # JWT & security logic
│   ├── database.py      # DB connection
│   └── requirements.txt
│
│── frontend/
│   ├── index.html
│   ├── dashboard.html
│   └── app.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone <your-repo-link>
cd project/backend
```

### 2️⃣ Install Dependencies

```
pip install -r requirements.txt
```

### 3️⃣ Run Server

```
uvicorn main:app --reload
```

### 4️⃣ Open API Docs

```
http://127.0.0.1:8000/docs
```

---

## 🔑 API Usage Flow

1. Register a user → `/register`
2. Login → `/login`
3. Copy JWT token
4. Click **Authorize** in Swagger
5. Use protected endpoints (`/tasks`)

---

## 🧪 Example Credentials

```
Email: admin@test.com
Password: 123456
```

👉 This user gets **admin privileges**

---

## 🔒 Security Practices Implemented

* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* Role-based authorization
* Input validation with Pydantic

---

## 🚀 Scalability Considerations

This project is designed with scalability in mind:

* Modular architecture (separation of concerns)
* Easily extendable to microservices
* Can integrate:

  * Redis for caching
  * PostgreSQL for production DB
  * Docker for containerization
* Supports horizontal scaling via load balancers

---

## 🌐 Frontend

A minimal frontend is included to:

* Register & login users
* Store JWT token
* Perform API requests
* Display responses

---

## 📌 Future Improvements

* Refresh token mechanism
* Pagination for tasks
* Docker deployment
* Logging & monitoring
* CI/CD integration

---

## 🙌 Author

**Your Name**
Backend Developer Intern Candidate

---
