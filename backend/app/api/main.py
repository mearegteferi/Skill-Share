from fastapi import APIRouter

from app.api.routes import private, utils
from app.core.config import settings
from app.modules import get_feature_routers

api_router = APIRouter()
for feature_router in get_feature_routers():
    api_router.include_router(feature_router)
api_router.include_router(utils.router)


if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router)
