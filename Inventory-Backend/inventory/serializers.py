from rest_framework import serializers
from .models import RawMaterial, Transaction

class RawMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = RawMaterial
        fields = ['id', 'name', 'quantity', 'price_per_unit']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'raw_material', 'quantity', 'transaction_type', 'price_per_unit', 'timestamp']
