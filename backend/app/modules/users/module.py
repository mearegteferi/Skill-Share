from collections.abc import Sequence

from fastapi import APIRouter

from app.modules.users import auth_router, router


def get_routers() -> Sequence[APIRouter]:
    return (auth_router.router, router.router)
