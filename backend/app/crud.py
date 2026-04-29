from sqlalchemy.orm import Session

from app.modules.users.models import User
from app.modules.users.repository import SQLAlchemyUserRepository
from app.modules.users.schemas import UserCreate, UserUpdate
from app.modules.users.service import UserService


def _user_service(session: Session) -> UserService:
    return UserService(SQLAlchemyUserRepository(session))


def create_user(*, session: Session, user_create: UserCreate) -> User:
    return _user_service(session).create_user(user_create)


def update_user(*, session: Session, db_user: User, user_in: UserUpdate) -> User:
    return _user_service(session).update_user(db_user, user_in)


def get_user_by_email(*, session: Session, email: str) -> User | None:
    return _user_service(session).get_by_email(email)


def authenticate(*, session: Session, email: str, password: str) -> User | None:
    return _user_service(session).authenticate(email=email, password=password)
