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