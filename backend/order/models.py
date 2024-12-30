from django.db import models
from menu.models import Menu

class CustomerDetail(models.Model):
    full_name = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=15)
    address = models.CharField(max_length=200)

class Order(models.Model):
    customer = models.ForeignKey(CustomerDetail, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=5, decimal_places=2)
    total_quantity = models.IntegerField()
    delivery_price = models.IntegerField()
    date = models.DateField(auto_now=True)
    payment_approved = models.BooleanField(default=False)


class OrderDetail(models.Model):
    ordered_item = models.ForeignKey(Menu, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    order = models.ForeignKey(Order, on_delete=models.CASCADE)


