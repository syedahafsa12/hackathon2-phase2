from sqlmodel import create_engine, Session, SQLModel
from app.config import settings

# Create engine with connection pooling
engine = create_engine(
    settings.database_url,
    echo=settings.environment == "development",
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,  # Verify connections before using
)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
