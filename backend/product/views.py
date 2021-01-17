from rest_framework import generics, authentication, permissions, serializers,status
from rest_framework import response
from rest_framework.authtoken.views import ObtainAuthToken
from django.shortcuts import redirect, render,get_object_or_404
from rest_framework.settings import api_settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer, AuthTokenSerializer,ProductSerializer,PreferencesSerializer
from .models import Product,Preferences,purchase



class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer


class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve and return authentication user"""
        return self.request.user

@api_view(['GET', ])
def Product_by_category(request,slug):
    product=Product.objects.filter(category=slug,sold=False)
    serializer=ProductSerializer(product,many=True)

    return Response(serializer.data)


@api_view(['GET', ])
def Product_all(request):
    product=Product.objects.filter(sold=False)
    serializer=ProductSerializer(product,many=True)

    return Response(serializer.data)


@api_view(['GET', ])
def Product_user(request):
    prefer=Preferences.objects.filter(user=request.user)
    a=[]
    
    for p in prefer:
        a.append(p.name)
    print(a)
    product=Product.objects.filter(category__in=a).filter(sold=False)
    serializer=ProductSerializer(product,many=True)

    return Response(serializer.data)


@api_view(['GET', ])
def Product_id(request,slug):
    product=Product.objects.get(id=slug)
    serializer=ProductSerializer(product)

    return Response(serializer.data)


@api_view(['GET', ])
def delete_product(request,slug):
    product=Product.objects.get(id=slug)
    product.delete()

    return Response({'message': 'Tutorial was deleted successfully!'},status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def add_product(request):
    serializer=ProductSerializer(data=request.data)
    print(request.user)
    user=request.user
    if serializer.is_valid():
        serializer.save(seller=user,sold=False)
        return Response(serializer.data,status=status.HTTP_201_CREATED)

    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST', ])
def add_prefernce(request):
    serializer=PreferencesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data,status=status.HTTP_201_CREATED)

    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', ])
def User_preference(request):
    product=Preferences.objects.filter(user=request.user)
    serializer=PreferencesSerializer(product,many=True)

    return Response(serializer.data)


@api_view(['GET', ])
def delete_preference(request,slug):
    prefrence=Preferences.objects.get(id=slug)
    prefrence.delete()
    return Response({'message': 'Tutorial was deleted successfully!'},status=status.HTTP_204_NO_CONTENT)


@api_view(['GET',],)
def Purchase(request,slug):
    product=get_object_or_404(Product,id=slug)
    user=request.user
    purchas=purchase(buyer=user , product=product)
    purchas.save()
    product.sold=True
    product.save()
    return Response(status=status.HTTP_201_CREATED)