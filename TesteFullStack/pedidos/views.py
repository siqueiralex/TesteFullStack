from django.shortcuts import render, redirect, get_object_or_404
from .models import Pedido, Cliente, Produto, ItemPedido
from .forms import PedidoForm, ItemPedidoForm
from django.http import JsonResponse

# Create your views here.

def home(request):
    pedidos = Pedido.objects.all()
    return render(request, 'home.html', {'pedidos': pedidos})

def novo_pedido(request):
    if request.method == 'POST':
        form = PedidoForm(request.POST)
        if form.is_valid():
            pedido = form.save(commit=False)
            pedido.save()
            return redirect('/editarpedido/{}'.format(pedido.id)) 
    else:
        form = PedidoForm()
    return render(request, 'novo_pedido.html', {'form': form})

def editar_pedido(request, id):
    pedido = get_object_or_404(Pedido, pk=id)
    items_pedido = ItemPedido.objects.filter(pedido=pedido)
    if request.method == 'POST':
        form = ItemPedidoForm(request.POST)
        item = form.save(commit=False) 
        item.pedido = pedido
        item.save()
        return redirect('/editarpedido/'+str(pedido.id)) 
    else:
        form = ItemPedidoForm()
    return render(request, 'editar_pedido.html', {'form':form, 'pedido':pedido, 'items':items_pedido})

def apagar_pedido(request, id):
    pedido = get_object_or_404(Pedido, pk=id)
    pedido.delete()
    return redirect('/')

def apagar_item_pedido(request, id):
    item_pedido = get_object_or_404(ItemPedido, pk=id)
    pedido_id = item_pedido.pedido.id
    item_pedido.delete()
    return redirect('/editarpedido/{}'.format(pedido_id))

def produto(request):
    if request.is_ajax():
        produto = get_object_or_404(Produto, pk=request.POST['id'])
        return JsonResponse({'nome':produto.nome, 'preco': produto.preco, 'multiplo':produto.multiplo})