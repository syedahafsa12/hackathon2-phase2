from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.config import settings
from app.database import create_db_and_tables
from app.routers import auth_router, tasks_router, tags_router

# Initialize FastAPI
app = FastAPI(
    title="Hackathon Todo API",
    description="Production-grade todo API for Hackathon II",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limiting
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


# Include routers
app.include_router(auth_router)
app.include_router(tasks_router)
app.include_router(tags_router)


# Startup event
@app.on_event("startup")
def on_startup():
    create_db_and_tables()


# Health check
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "environment": settings.environment,
    }


# Root
@app.get("/")
async def root():
    return {"message": "Hackathon Todo API - Phase II"}
