from django.urls import path
from .views import payment_processing

urlpatterns = [
    path('', payment_processing, name='payment processing')
    
]