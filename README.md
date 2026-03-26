# Task Management API

A scalable REST API with JWT authentication and role-based access control, built with FastAPI and SQLAlchemy.

##  Features

### Backend (Primary Focus)
- ✅ User registration & login with JWT authentication
- ✅ Role-based access control (User vs Admin)
- ✅ CRUD operations for tasks
- ✅ API versioning (/api/v1/)
- ✅ Input validation and sanitization
- ✅ Comprehensive error handling
- ✅ API documentation with Swagger/OpenAPI
- ✅ Secure password hashing with bcrypt
- ✅ SQLite database with proper schema design

### Frontend (Supportive)
- ✅ Modern, responsive UI with vanilla JavaScript
- ✅ User registration and login forms
- ✅ Protected dashboard with task management
- ✅ Real-time task CRUD operations
- ✅ User-friendly error and success messages
- ✅ Role-based UI elements

### Security & Scalability
- ✅ JWT token handling
- ✅ Input validation and sanitization
- ✅ Password strength requirements
- ✅ Scalable project structure
- ✅ API versioning for future enhancements

##  Prerequisites

- Python 3.8+
- pip package manager

##  Installation

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Anything.ai Backend Assignment/project/backend"
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the server**
   ```bash
   uvicorn main:app --reload
   ```

The API will be available at `http://127.0.0.1:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Start a simple HTTP server**
   ```bash
   python -m http.server 5500
   ```

The frontend will be available at `http://localhost:5500`

##  API Documentation

### Swagger UI
Visit `http://127.0.0.1:8000/docs` for interactive API documentation

### ReDoc
Visit `http://127.0.0.1:8000/redoc` for alternative API documentation

## 🗄️ Database Schema

### Users Table
- `id`: Primary key
- `email`: Unique email address
- `password`: Hashed password
- `role`: User role ('user' or 'admin')

### Tasks Table
- `id`: Primary key
- `title`: Task title (3-100 characters)
- `description`: Task description (10-500 characters)
- `completed`: Boolean status
- `owner_id`: Foreign key to Users table

##  Authentication & Authorization

### JWT Token Flow
1. User registers or logs in
2. Server returns JWT token
3. Client includes token in Authorization header
4. Server validates token for protected routes

### Role-Based Access
- **Users**: Can create and view their own tasks
- **Admins**: Can create/view their tasks AND delete any task

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit

##  API Endpoints

### Authentication
- `POST /api/v1/register` - Register new user
- `POST /api/v1/login` - User authentication

### Tasks
- `POST /api/v1/tasks` - Create new task (authenticated)
- `GET /api/v1/tasks` - Get user's tasks (authenticated)
- `DELETE /api/v1/tasks/{task_id}` - Delete task (admin only)

##  Testing

### Test Users
- **Admin**: `admin@test.com` (any valid password)
- **Regular User**: Any other email

### Sample API Calls

#### Register User
```bash
curl -X POST "http://127.0.0.1:8000/api/v1/register" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "Password123"}'
```

#### Login
```bash
curl -X POST "http://127.0.0.1:8000/api/v1/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "Password123"}'
```

#### Create Task
```bash
curl -X POST "http://127.0.0.1:8000/api/v1/tasks" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title": "Sample Task", "description": "This is a sample task description"}'
```

##  Project Structure

```
project/
├── backend/
│   ├── main.py              # FastAPI application and routes
│   ├── database.py          # Database configuration
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas with validation
│   ├── auth.py              # Authentication logic
│   └── requirements.txt     # Python dependencies
└── frontend/
    ├── index.html           # Login/Registration page
    ├── dashboard.html       # Protected dashboard
    └── app.js              # Frontend JavaScript logic
```

##  Configuration

### Environment Variables
- `DATABASE_URL`: SQLite database path (default: "sqlite:///./test.db")
- `SECRET`: JWT secret key (default: "secretkey")

### Database
- Uses SQLite for simplicity
- Easy to migrate to PostgreSQL/MySQL
- Automatic table creation on startup

##  Deployment Considerations

### Production Enhancements
1. **Database**: Migrate to PostgreSQL or MySQL
2. **Security**: Use environment variables for secrets
3. **Caching**: Implement Redis for session management
4. **Logging**: Add structured logging
5. **Monitoring**: Health checks and metrics
6. **Containerization**: Docker deployment

### Scalability Architecture
- **Microservices**: Split auth, tasks, and user services
- **Load Balancing**: Nginx or cloud load balancer
- **Caching Layer**: Redis for frequent queries
- **Message Queue**: Celery for background tasks
- **CDN**: For static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

##  License

This project is part of a backend developer internship assignment.

##  Support

For questions or issues regarding this assignment, please contact the hiring team.

---

**Note**: This project demonstrates backend development skills including API design, security practices, database management, and frontend integration. It's designed to be easily extensible and production-ready with minimal modifications.
