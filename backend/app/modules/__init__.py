from collections.abc import Sequence

from fastapi import APIRouter

from app.modules.users import module as users_module


def get_feature_routers() -> Sequence[APIRouter]:
    routers: list[APIRouter] = []
    routers.extend(users_module.get_routers())
    return routers
