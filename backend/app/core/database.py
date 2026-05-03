from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI), pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def init_db(session: Session) -> None:
    """Seed the database with initial data (superuser, etc.)."""
    from app.core.config import settings
    from app.modules.users.models import User
    from app.modules.users.schemas import UserCreate
    from app.modules.users.service import UserService
    from app.modules.users.repository import SQLAlchemyUserRepository

    repo = SQLAlchemyUserRepository(session)
    service = UserService(repo)

    existing = service.get_by_email(settings.FIRST_SUPERUSER)
    if not existing:
        user_in = UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        service.create_user(user_in)
