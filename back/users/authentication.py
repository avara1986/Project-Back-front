import urllib, json

from django.contrib.auth import get_user_model, authenticate, login

from rest_framework import authentication
from rest_framework import exceptions


class UserGoogleAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        if 'g_token' not in request.GET:
            return None
        token = request.GET['g_token']
        user = json.loads(urllib.urlopen('https://www.googleapis.com/oauth2/v1/tokeninfo?id_token=' + token).read())
        if 'error' in user:
            raise exceptions.AuthenticationFailed(user['error'])
        try:
            user = get_user_model().objects.get(username=user['email'])
        except get_user_model().DoesNotExist:
            raise exceptions.AuthenticationFailed('No such user')

        return (user, None)
