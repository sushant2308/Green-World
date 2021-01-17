from django.urls import path
from django.conf import settings
from . import views
from django.conf.urls.static import static

app_name = 'product'

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),#checked
    path('token/', views.CreateTokenView.as_view(), name='token'),#checked
    path('me/', views.ManageUserView.as_view(), name='me'),#checked
    path('allproducts/', views.Product_all, name='all_products'),#checked
    path('loginproduct/', views.Product_user, name='all_products'),#checked
    path('category_wise/<slug:slug>/', views.Product_by_category, name='categorywise'),#checked
    path('product_detail/<slug:slug>/', views.Product_id, name='productdetail'),#checked
    path('product_add/', views.add_product, name='productadd'),#checked
    path('product_delete/<slug:slug>', views.delete_product, name='productdelete'),#checked
    path('add_preference/', views.add_prefernce, name='add_preference'),#checked
    path('userpreference/', views.User_preference, name='userprefer'),#checked
    path('deletepreference/<slug:slug>', views.delete_preference, name='deleteprefer'),#checked
    path('purchase/<slug:slug>/', views.Purchase, name='purchase'),#checked
]
