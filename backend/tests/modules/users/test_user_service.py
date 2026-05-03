"""Unit tests for UserService — no HTTP layer involved."""
from fastapi.encoders import jsonable_encoder
from pwdlib.hashers.bcrypt import BcryptHasher
from sqlalchemy.orm import Session

from app.core.security import verify_password
from app.modules.users.models import User
from app.modules.users.schemas import UserCreate, UserUpdate
from tests.utils.user import user_service
from tests.utils.utils import random_email, random_lower_string


def test_create_user(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    user = user_service(db).create_user(user_in)
    assert user.email == email
    assert hasattr(user, "hashed_password")


def test_authenticate_user(db: Session) -> None:
    email = random_email()
    password = random_lower_string()
    user_in = UserCreate(email=email, password=password)
    service = user_service(db)
    user = service.create_user(user_in)
    authenticated_user = service.authenticate(email=email, password=password)
    assert authenticated_user
    assert user.email == authenticated_user.email


def test_not_authenticate_user(db: Session) -> None:
    user = user_service(db).authenticate(email=random_email(), password=random_lower_string())
    assert user is None


def test_check_if_user_is_active(db: Session) -> None:
    user_in = UserCreate(email=random_email(), password=random_lower_string())
    user = user_service(db).create_user(user_in)
    assert user.is_active is True


def test_check_if_user_is_active_inactive(db: Session) -> None:
    user_in = UserCreate(email=random_email(), password=random_lower_string(), is_active=False)
    user = user_service(db).create_user(user_in)
    assert user.is_active is False


def test_check_if_user_is_superuser(db: Session) -> None:
    user_in = UserCreate(email=random_email(), password=random_lower_string(), is_superuser=True)
    user = user_service(db).create_user(user_in)
    assert user.is_superuser is True


def test_check_if_user_is_superuser_normal_user(db: Session) -> None:
    user_in = UserCreate(email=random_email(), password=random_lower_string())
    user = user_service(db).create_user(user_in)
    assert user.is_superuser is False


def test_get_user(db: Session) -> None:
    user_in = UserCreate(email=random_email(), password=random_lower_string(), is_superuser=True)
    user = user_service(db).create_user(user_in)
    user_2 = db.get(User, user.id)
    assert user_2
    assert user.email == user_2.email
    assert jsonable_encoder(user) == jsonable_encoder(user_2)


def test_update_user(db: Session) -> None:
    user_in = UserCreate(email=random_email(), password=random_lower_string(), is_superuser=True)
    service = user_service(db)
    user = service.create_user(user_in)
    new_password = random_lower_string()
    user_in_update = UserUpdate(password=new_password, is_superuser=True)
    if user.id is not None:
        service.update_user(user, user_in_update)
    user_2 = db.get(User, user.id)
    assert user_2
    assert user.email == user_2.email
    verified, _ = verify_password(new_password, user_2.hashed_password)
    assert verified


def test_authenticate_user_with_bcrypt_upgrades_to_argon2(db: Session) -> None:
    """A user with a bcrypt hash should have it upgraded to argon2 on login."""
    email = random_email()
    password = random_lower_string()

    bcrypt_hasher = BcryptHasher()
    bcrypt_hash = bcrypt_hasher.hash(password)
    assert bcrypt_hash.startswith("$2")

    user = User(email=email, hashed_password=bcrypt_hash)
    db.add(user)
    db.commit()
    db.refresh(user)

    assert user.hashed_password.startswith("$2")

    authenticated_user = user_service(db).authenticate(email=email, password=password)
    assert authenticated_user
    assert authenticated_user.email == email

    db.refresh(authenticated_user)
    assert authenticated_user.hashed_password.startswith("$argon2")

    verified, updated_hash = verify_password(password, authenticated_user.hashed_password)
    assert verified
    assert updated_hash is None
