from django.contrib.auth import get_user_model
from rest_framework import authentication
from rest_framework import exceptions


class UserAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        if 'X_USERNAME' not in request.GET:
            return None
        username = request.GET['X_USERNAME']

        if not username:
            return None
        try:
            user = get_user_model().objects.get(username=username)
        except get_user_model().DoesNotExist:
            raise exceptions.AuthenticationFailed('No such user')

        return (user, None)
