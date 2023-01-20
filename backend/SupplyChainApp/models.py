from django.db import models
import datetime

# Create your models here.


class Registers(models.Model):
    ProductId = models.AutoField(primary_key=True)
    ProductName = models.CharField(max_length=500)
    ProductCode = models.CharField(max_length=500)
    Manufacturer = models.CharField(max_length=500)
    ProductType = models.CharField(max_length=500)
    ProductDescription = models.CharField(max_length=800)

class Inputs(models.Model):
    InputId = models.AutoField(primary_key=True)    
    InputDate = models.DateTimeField()
    ProductName = models.CharField(max_length=500)
    ProductAmount = models.IntegerField()
    Address = models.CharField(max_length=500)

class Outputs(models.Model):
    OutputId = models.AutoField(primary_key=True)    
    OutputDate = models.DateTimeField()
    ProductName = models.CharField(max_length=500)
    ProductAmount = models.IntegerField()
    Address = models.CharField(max_length=500)