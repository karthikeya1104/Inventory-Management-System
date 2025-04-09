from django.db import models
from django.conf import settings

class RawMaterial(models.Model):
    name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)

class Transaction(models.Model):
    TRANSACTION_TYPES = (
        ('add', 'Add Stock'),
        ('remove', 'Remove Stock'),
    )

    raw_material = models.CharField(max_length=100)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    quantity = models.IntegerField()
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    total_value = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)  # Optional: If you want to track which user performed the action.

    def save(self, *args, **kwargs):
        if self.transaction_type == 'add':
            self.total_value = self.quantity * self.price_per_unit
        elif self.transaction_type == 'remove':
            self.total_value = self.quantity * self.price_per_unit
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.transaction_type.capitalize()} {self.quantity} units of {self.raw_material.name}"
