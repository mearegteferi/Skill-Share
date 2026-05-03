import uuid
from typing import Protocol

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.modules.users.models import User


class UserRepository(Protocol):
    def create(self, user: User) -> User: ...
    def get(self, user_id: uuid.UUID) -> User | None: ...
    def get_by_email(self, email: str) -> User | None: ...
    def list(self, *, skip: int = 0, limit: int = 100) -> list[User]: ...
    def count(self) -> int: ...
    def delete(self, user: User) -> None: ...
    def save(self, user: User) -> User: ...


class SQLAlchemyUserRepository:
    def __init__(self, session: Session) -> None:
        self.session = session

    def create(self, user: User) -> User:
        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)
        return user

    def get(self, user_id: uuid.UUID) -> User | None:
        return self.session.get(User, user_id)

    def get_by_email(self, email: str) -> User | None:
        stmt = select(User).where(User.email == email)
        return self.session.execute(stmt).scalar_one_or_none()

    def list(self, *, skip: int = 0, limit: int = 100) -> list[User]:
        stmt = select(User).order_by(User.created_at.desc()).offset(skip).limit(limit)
        return list(self.session.execute(stmt).scalars().all())

    def count(self) -> int:
        stmt = select(func.count()).select_from(User)
        return self.session.execute(stmt).scalar_one()

    def delete(self, user: User) -> None:
        self.session.delete(user)
        self.session.commit()

    def save(self, user: User) -> User:
        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)
        return user
