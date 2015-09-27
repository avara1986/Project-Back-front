from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from users.serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route, list_route
from users.permissions import IsItselforIsStafPermission


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer