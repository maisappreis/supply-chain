from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from SupplyChainApp.models import Registers, Inputs, Outputs
from SupplyChainApp.serializers import RegisterSerializer, InputSerializer, OutputSerializer

from django.core.files.storage import default_storage

@csrf_exempt
def registerApi(request, id = 0):
    if request.method == "GET":
        registers = Registers.objects.all()
        registers_serializer = RegisterSerializer(registers, many = True)
        return JsonResponse(registers_serializer.data, safe = False)
    elif request.method == "POST":
        register_data = JSONParser().parse(request)
        registers_serializer = RegisterSerializer(data = register_data)
        if registers_serializer.is_valid():
            registers_serializer.save()
            return JsonResponse("Adicionado com sucesso!", safe = False)
        return JsonResponse("Operação falhou!", safe = False)
    elif request.method == "PUT":
        register_data = JSONParser().parse(request)
        register = Registers.objects.get(ProductId = register_data["ProductId"])
        registers_serializer = RegisterSerializer(register, data = register_data)
        if registers_serializer.is_valid():
            registers_serializer.save()
            return JsonResponse("Atualizado com sucesso!", safe = False)
        return JsonResponse("Operação falhou!")
    elif request.method == "DELETE":
        register = Registers.objects.get(ProductId = id)
        register.delete()
        return JsonResponse("Excluído com sucesso!", safe = False)


@csrf_exempt
def inputApi(request, id = 0):
    if request.method == "GET":
        inputs = Inputs.objects.all()
        inputs_serializer = InputSerializer(inputs, many = True)
        return JsonResponse(inputs_serializer.data, safe = False)
    elif request.method == "POST":
        input_data = JSONParser().parse(request)
        inputs_serializer = InputSerializer(data = input_data)
        if inputs_serializer.is_valid():
            inputs_serializer.save()
            return JsonResponse("Adicionado com sucesso!", safe = False)
        return JsonResponse("Operação falhou!", safe = False)
    elif request.method == "PUT":
        input_data = JSONParser().parse(request)
        input = Inputs.objects.get(InputId = input_data["InputId"])
        inputs_serializer = InputSerializer(input, data = input_data)
        if inputs_serializer.is_valid():
            inputs_serializer.save()
            return JsonResponse("Atualizado com sucesso!", safe = False)
        return JsonResponse("Operação falhou!")
    elif request.method == "DELETE":
        input = Inputs.objects.get(InputId = id)
        input.delete()
        return JsonResponse("Excluído com sucesso!", safe = False)


@csrf_exempt
def outputApi(request, id = 0):
    if request.method == "GET":
        outputs = Outputs.objects.all()
        outputs_serializer = OutputSerializer(outputs, many = True)
        return JsonResponse(outputs_serializer.data, safe = False)
    elif request.method == "POST":
        output_data = JSONParser().parse(request)
        outputs_serializer = OutputSerializer(data = output_data)
        if outputs_serializer.is_valid():
            outputs_serializer.save()
            return JsonResponse("Adicionado com sucesso!", safe = False)
        return JsonResponse("Operação falhou!", safe = False)
    elif request.method == "PUT":
        output_data = JSONParser().parse(request)
        output = Outputs.objects.get(OutputId = output_data["OutputId"])
        outputs_serializer = OutputSerializer(output, data = output_data)
        if outputs_serializer.is_valid():
            outputs_serializer.save()
            return JsonResponse("Atualizado com sucesso!", safe = False)
        return JsonResponse("Operação falhou!")
    elif request.method == "DELETE":
        output = Outputs.objects.get(OutputId = id)
        output.delete()
        return JsonResponse("Excluído com sucesso!", safe = False)
