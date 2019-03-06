from django.shortcuts import render
from .models import Pedido

# Create your views here.

def home(request):
    pedidos = Pedido.objects.all()
    return render(request, 'home.html', {'pedidos': pedidos})