from rest_framework import generics, status
from .models import RawMaterial, Transaction
from .serializers import RawMaterialSerializer, TransactionSerializer
from rest_framework.response import Response

class RawMaterialListCreate(generics.ListCreateAPIView):
    queryset = RawMaterial.objects.all()
    serializer_class = RawMaterialSerializer

class RawMaterialDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = RawMaterial.objects.all()
    serializer_class = RawMaterialSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data

        quantity_to_add = data.get('quantity_to_add', 0)
        price_to_add = data.get('price_to_add', 0)
        quantity_to_remove = data.get('quantity_to_remove', 0)

        if quantity_to_add > 0 and price_to_add > 0:
            new_total_quantity = instance.quantity + quantity_to_add
            new_total_cost = (instance.quantity * instance.price_per_unit) + (quantity_to_add * price_to_add)
            instance.quantity = new_total_quantity
            instance.price_per_unit = new_total_cost / new_total_quantity
        elif quantity_to_remove > 0:
            if quantity_to_remove > instance.quantity:
                return Response(
                    {"error": "Insufficient stock to remove."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            instance.quantity -= quantity_to_remove
            if instance.quantity == 0:
                instance.price_per_unit = 0

        instance.save()

        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TransactionListCreate(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class TransactionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
