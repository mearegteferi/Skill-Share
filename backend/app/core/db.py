from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings
from app.models import Base
from app.modules.users.models import User
from app.modules.users.repository import SQLAlchemyUserRepository
from app.modules.users.schemas import UserCreate
from app.modules.users.service import UserService

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI), pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def init_db(session: Session) -> None:
    # Tables should be created with Alembic migrations. If migrations are not used,
    # Base.metadata.create_all(engine) can initialize the schema for local prototypes.
    # Base is imported here so Alembic and optional create_all calls see all models.
    _ = Base

    user = session.execute(
        select(User).where(User.email == settings.FIRST_SUPERUSER)
    ).scalar_one_or_none()
    if not user:
        user_in = UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        UserService(SQLAlchemyUserRepository(session)).create_user(user_in)
