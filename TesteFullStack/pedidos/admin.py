from django.contrib import admin
from .models import Cliente, Produto, Pedido, ItemPedido

# Register your models here.

admin.site.register(Cliente)
admin.site.register(Produto)
admin.site.register(Pedido)
admin.site.register(ItemPedido)