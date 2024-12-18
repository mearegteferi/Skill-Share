from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    description =models.TextField()

    def __str__(self):
        return self.name

class Menu(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    ingredients = models.TextField()
    preparation_time = models.IntegerField(help_text="Time in minutes")
    image = models.ImageField(upload_to="menu_images/")
    date_added = models.DateField(auto_now_add=True)
    is_available = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    is_deliverable = models.BooleanField(default=True)

    def __str__(self):
        return self.name