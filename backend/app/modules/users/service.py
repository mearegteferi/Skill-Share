import uuid

from app.core.security import get_password_hash, verify_password
from app.modules.users.models import User
from app.modules.users.repository import UserRepository
from app.modules.users.schemas import UserCreate, UserUpdate, UserUpdateMe

# Constant-time dummy hash used when the user is not found, to prevent
# timing-based email enumeration attacks.
_DUMMY_HASH = (
    "$argon2id$v=19$m=65536,t=3,p=4"
    "$MjQyZWE1MzBjYjJlZTI0Yw"
    "$YTU4NGM5ZTZmYjE2NzZlZjY0ZWY3ZGRkY2U2OWFjNjk"
)


class UserService:
    def __init__(self, repository: UserRepository) -> None:
        self.repository = repository

    # ------------------------------------------------------------------
    # Reads
    # ------------------------------------------------------------------

    def get(self, user_id: uuid.UUID) -> User | None:
        return self.repository.get(user_id)

    def get_by_email(self, email: str) -> User | None:
        return self.repository.get_by_email(email)

    def list_users(self, *, skip: int = 0, limit: int = 100) -> tuple[list[User], int]:
        return self.repository.list(skip=skip, limit=limit), self.repository.count()

    # ------------------------------------------------------------------
    # Writes
    # ------------------------------------------------------------------

    def create_user(self, user_create: UserCreate) -> User:
        user = User(
            **user_create.model_dump(exclude={"password"}),
            hashed_password=get_password_hash(user_create.password),
        )
        return self.repository.create(user)

    def update_user(self, db_user: User, user_in: UserUpdate | UserUpdateMe) -> User:
        update_data = user_in.model_dump(exclude_unset=True)
        if "password" in update_data:
            update_data["hashed_password"] = get_password_hash(
                update_data.pop("password")
            )
        for field, value in update_data.items():
            setattr(db_user, field, value)
        return self.repository.save(db_user)

    def update_password(self, user: User, new_password: str) -> User:
        user.hashed_password = get_password_hash(new_password)
        return self.repository.save(user)

    def delete_user(self, user: User) -> None:
        self.repository.delete(user)

    # ------------------------------------------------------------------
    # Auth helper (called by auth module only)
    # ------------------------------------------------------------------

    def authenticate(self, *, email: str, password: str) -> User | None:
        """
        Return the User if credentials are valid, None otherwise.
        Always runs a hash verification to prevent timing attacks.
        Upgrades bcrypt hashes to argon2 transparently on successful login.
        """
        user = self.repository.get_by_email(email)
        if not user:
            verify_password(password, _DUMMY_HASH)
            return None

        verified, updated_hash = verify_password(password, user.hashed_password)
        if not verified:
            return None

        if updated_hash:
            user.hashed_password = updated_hash
            self.repository.save(user)

        return user
