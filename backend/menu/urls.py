from django.urls import path
from .views import get_menu

urlpatterns = [
    path("menu/", get_menu, name="get menu"),
]