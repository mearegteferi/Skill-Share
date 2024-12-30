from django.urls import path
from .views import get_menu

urlpatterns = [
    path("", get_menu, name="get menu"),
]