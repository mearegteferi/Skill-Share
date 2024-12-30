from rest_framework import serializers
from .models import Menu, Category

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['name', 'price', 'ingredients', 'preparation_time', 'image', 'is_deliverable']

class CategorySerializer(serializers.ModelSerializer):
    menu_items = MenuSerializer(many=True, source='menu_set')

    class Meta:
        model = Category
        fields = ['name', 'description', 'menu_items']
