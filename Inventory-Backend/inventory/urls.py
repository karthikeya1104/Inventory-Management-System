from django.urls import path
from . import views

urlpatterns = [
    path('raw_materials/', views.RawMaterialListCreate.as_view(), name='raw-material-list-create'),
    path('raw_materials/<int:pk>/', views.RawMaterialDetail.as_view(), name='raw-material-detail'),
    path('transactions/', views.TransactionListCreate.as_view(), name='transaction-list-create'),
    path('transactions/<int:pk>/', views.TransactionDetail.as_view(), name='transaction-detail'),
]
