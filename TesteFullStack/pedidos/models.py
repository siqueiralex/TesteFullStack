from django.db import models

# Create your models here.

class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nome

class Produto(models.Model):
    nome = models.CharField(max_length=100)
    preco = models.FloatField()
    multiplo = models.SmallIntegerField(null=True, blank=True)

    def __str__(self):
        return self.nome

class Pedido(models.Model):
    cliente = models.ForeignKey(Cliente, related_name='cliente', on_delete=models.CASCADE)
    produtos = models.ManyToManyField(Produto, through='ItemPedido', blank=True, related_name='produtos')
     
    def __str__(self):
        return self.cliente.nome + "#"+str(self.id)

class ItemPedido(models.Model):
    pedido = models.ForeignKey(Pedido, related_name = "pertence", on_delete=models.CASCADE)
    produto = models.ForeignKey(Produto, related_name="pertence", on_delete=models.CASCADE)
    quantidade = models.SmallIntegerField()
    preco = models.FloatField()
    
    def __str__(self):
        return str(self.pedido)+"_"+str(self.produto)