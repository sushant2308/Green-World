import uuid
import os
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin
from django.conf import settings

class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        """Creates and saves a new user"""
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """Creates and saves a new super user"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that suppors using email instead of username"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    phone_no=models.CharField(max_length=255)
    address=models.CharField(max_length=1000)
    is_seller=models.BooleanField(null=True,blank=True)
    gstid=models.CharField(max_length=255,null=True,blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'


class Product(models.Model):
    seller=models.ForeignKey(User,on_delete=models.CASCADE,related_name="products")
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name=models.CharField(max_length=255)
    brand=models.CharField(max_length=255)
    category=models.CharField(max_length=255)
    description=models.CharField(max_length=1500)
    price=models.CharField(max_length=255)
    sold=models.BooleanField()
    image=models.FileField(blank=True,null=True)

class purchase(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    buyer=models.ForeignKey(User,on_delete=models.CASCADE,related_name="purchases")
    date=models.DateTimeField(auto_now_add=True)
