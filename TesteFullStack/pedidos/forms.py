from django import forms
from .models import Pedido, Cliente, ItemPedido, Produto

class PedidoForm(forms.ModelForm):
    class Meta:
        model = Pedido
        fields = ['cliente']

class ItemPedidoForm(forms.ModelForm):
    class Meta:
        model = ItemPedido
        fields = ['produto', 'quantidade', 'preco']