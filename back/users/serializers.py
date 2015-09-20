from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=100)

    class Meta:
            model = get_user_model()
