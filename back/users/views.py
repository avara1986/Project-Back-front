from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from users.serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
# from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import detail_route, list_route
from users.permissions import IsItselforIsStafPermission


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)

    @list_route(methods=['get'])
    def retrieve(self, request, pk=None):
        """
        A simple ViewSet for listing or retrieving users.
        """
        queryset = get_user_model().objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    @detail_route(methods=['get'], permission_classes=[IsItselforIsStafPermission])
    def following(self, request, pk=None):
        """
        A simple ViewSet for listing or retrieving users.
        """
        followings = get_user_model().objects.filter(followings=pk)
        page = self.paginate_queryset(followings)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(followings, many=True)
        return Response(serializer.data)

    @detail_route(methods=['get'])
    def followers(self, request, pk=None):
        """
        A simple ViewSet for listing or retrieving users.
        """
        followers = get_user_model().objects.filter(followers=pk)
        page = self.paginate_queryset(followers)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(followers, many=True)
        return Response(serializer.data)
