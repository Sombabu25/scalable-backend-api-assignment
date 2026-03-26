from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import database, models, schemas, auth
from auth import get_current_user, get_db, admin_only
from passlib.context import CryptContext
import uvicorn

app = FastAPI(
    title="Task Management API",
    description="A scalable REST API with JWT authentication and role-based access control",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5500", "http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

# Register
@app.post("/api/v1/register", 
          summary="Register a new user",
          response_model=dict,
          responses={400: {"description": "Email already registered"}})
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Register a new user with email and password. Admin role assigned to admin@test.com"""
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = models.User(
        email=user.email,
        password=hash_password(user.password),
        role="admin" if user.email == "admin@test.com" else "user"
    )
    db.add(new_user)
    db.commit()
    return {"message": "User created successfully"}

# Login
@app.post("/api/v1/login",
          summary="Authenticate user",
          response_model=dict,
          responses={401: {"description": "Invalid credentials"}})
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Authenticate user and return JWT token"""
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    from jose import jwt
    token = jwt.encode({"user_id": db_user.id}, auth.SECRET, algorithm="HS256")
    return {"access_token": token, "token_type": "bearer", "user_role": db_user.role}

# Create Task
@app.post("/api/v1/tasks",
          summary="Create a new task",
          response_model=dict,
          responses={401: {"description": "Authentication required"}})
def create_task(
    task: schemas.TaskCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Create a new task for the authenticated user"""
    new_task = models.Task(
        title=task.title,
        description=task.description,
        owner_id=current_user.id
    )
    db.add(new_task)
    db.commit()
    return {"message": "Task created successfully", "task_id": new_task.id}

# Get Tasks
@app.get("/api/v1/tasks",
         summary="Get user's tasks",
         response_model=list,
         responses={401: {"description": "Authentication required"}})
def get_tasks(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Retrieve all tasks belonging to the authenticated user"""
    return db.query(models.Task).filter(models.Task.owner_id == current_user.id).all()

# Delete Task (Admin only)
@app.delete("/api/v1/tasks/{task_id}",
            summary="Delete a task",
            response_model=dict,
            responses={401: {"description": "Authentication required"}, 
                       403: {"description": "Admin access required"},
                       404: {"description": "Task not found"}})
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(admin_only)
):
    """Delete any task (Admin only)"""
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}

@app.on_event("startup")
def startup():
    database.Base.metadata.create_all(bind=database.engine)