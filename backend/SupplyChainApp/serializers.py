from rest_framework import serializers
from SupplyChainApp.models import Registers, Inputs, Outputs

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registers
        fields = ("ProductId", "ProductName", "ProductCode", "Manufacturer", "ProductType", "ProductDescription")

class InputSerializer(serializers.ModelSerializer):
    InputDate = serializers.DateTimeField(format="%d-%m-%Y %H:%m")
    class Meta:
        model = Inputs
        fields = ("InputId", "InputDate", "ProductName", "ProductAmount", "Address")

class OutputSerializer(serializers.ModelSerializer):
    OutputDate = serializers.DateTimeField(format="%d-%m-%Y %H:%m")
    class Meta:
        model = Outputs
        fields = ("OutputId", "OutputDate", "ProductName", "ProductAmount", "Address")