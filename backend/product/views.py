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
def product_by_category(request,slug):
    product=Product.objects.filter(category=slug,sold=False)
    serializer=ProductSerializer(product,many=True)

    return Response(serializer.data)


@api_view(['GET', ])
def product_all(request):
    product=Product.objects.filter(sold=False)
    serializer=ProductSerializer(product,many=True)

    return Response(serializer.data)



@api_view(['GET','PUT','DELETE' ])
def product_actions(request,slug):
    product=Product.objects.get(id=slug)
    if (request.user==product.user):
        if(request.method=='GET'):
            serializer=ProductSerializer(product)

            return Response(serializer.data)

        elif(request.method=='PUT'):
            serializer=ProductSerializer(product,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

        elif(request.method=='DELETE'):
            product.delete()
            return Response({'message': 'Product was deleted successfully!'},status=status.HTTP_204_NO_CONTENT)    

    return Response({'message': 'You are not authorized for this operation!'}, status=status.HTTP_400_BAD_REQUEST)  


@api_view(['POST'])
def add_product(request):
    user=request.user

    if(user.is_seller):
        serializer=ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(seller=user,sold=False)
            return Response(serializer.data,status=status.HTTP_201_CREATED)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    return Response({'message': 'You are not authorized for this operation!'}, status=status.HTTP_400_BAD_REQUEST) 




@api_view(['GET',],)
def purchase(request,slug):
    product=get_object_or_404(Product,id=slug)
    user=request.user
    purchas=purchase(buyer=user ,product=product)
    purchas.save()
    product.sold=True
    product.save()
    return Response(status=status.HTTP_201_CREATED)