"""
Private routes — only registered in local/dev environments.
Used for seeding and testing without going through the full auth flow.
"""
from typing import Any

from fastapi import APIRouter
from pydantic import BaseModel

from app.core.dependencies import SessionDep
from app.core.security import get_password_hash
from app.modules.users.models import User
from app.modules.users.schemas import UserPublic

router = APIRouter(tags=["private"], prefix="/private")


class PrivateUserCreate(BaseModel):
    email: str
    password: str
    full_name: str
    is_verified: bool = False


@router.post("/users/", response_model=UserPublic)
def create_user(user_in: PrivateUserCreate, session: SessionDep) -> Any:
    """Create a user directly (no auth required). Local env only."""
    user = User(
        email=user_in.email,
        full_name=user_in.full_name,
        hashed_password=get_password_hash(user_in.password),
    )
    session.add(user)
    session.commit()
    return user
