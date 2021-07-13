from django.urls import path
from django.conf import settings
from . import views
from django.conf.urls.static import static

app_name = 'product'

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),#checked
    path('token/', views.CreateTokenView.as_view(), name='token'),#checked
    path('me/', views.ManageUserView.as_view(), name='me'),#checked
    path('allproducts/', views.product_all, name='all_products'),#checked
    path('category_wise/<slug:slug>/', views.product_by_category, name='categorywise'),#checked
    path('product_action/<slug:slug>/', views.product_actions, name='productdetail'),#checked
    path('purchase/<slug:slug>/', views.purchase, name='purchase'),#checked
]
