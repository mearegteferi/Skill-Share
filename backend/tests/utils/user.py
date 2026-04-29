from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.modules.users.models import User
from app.modules.users.repository import SQLAlchemyUserRepository
from app.modules.users.schemas import UserCreate, UserUpdate
from app.modules.users.service import UserService
from tests.utils.utils import random_email, random_lower_string


def user_service(db: Session) -> UserService:
    return UserService(SQLAlchemyUserRepository(db))


def create_user(db: Session, user_create: UserCreate) -> User:
    return user_service(db).create_user(user_create)


def update_user(db: Session, db_user: User, user_update: UserUpdate) -> User:
    return user_service(db).update_user(db_user, user_update)


def get_user_by_email(db: Session, email: str) -> User | None:
    return user_service(db).get_by_email(email)


def user_authentication_headers(
    *, client: TestClient, email: str, password: str
) -> dict[str, str]:
    data = {"username": email, "password": password}

    r = client.post(f"{settings.API_V1_STR}/login/access-token", data=data)
    response = r.json()
    auth_token = response["access_token"]
    headers = {"Authorization": f"Bearer {auth_token}"}
    return headers


def create_random_user(db: Session) -> User:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = create_user(db, user_in)
    return user


def authentication_token_from_email(
    *, client: TestClient, email: str, db: Session
) -> dict[str, str]:
    """
    Return a valid token for the user with given email.

    If the user doesn't exist it is created first.
    """
    password = random_lower_string()
    user = get_user_by_email(db, email)
    if not user:
        user_in_create = UserCreate(email=email, password=password)
        user = create_user(db, user_in_create)
    else:
        user_in_update = UserUpdate(password=password)
        if not user.id:
            raise Exception("User id not set")
        user = update_user(db, user, user_in_update)

    return user_authentication_headers(client=client, email=email, password=password)
