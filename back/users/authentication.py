from urllib.request import urlopen, HTTPError
import json

from django.contrib.auth import get_user_model, authenticate, login

from rest_framework import authentication
from rest_framework import exceptions


class UserGoogleAuthentication(authentication.BaseAuthentication):

    def authenticate(self, request):
        token = None
        #import ipdb
        # ipdb.set_trace()
        if 'g_token' in request.GET:
            token = request.GET['g_token']
        elif 'g_token' in request.data:
            token = request.data['g_token']
        if token is None:
            return None
        try:
            response = urlopen(
                'https://www.googleapis.com/oauth2/v1/tokeninfo?id_token=' + token).read()
            r = response.decode('utf-8')
            user = json.loads(r)
        except HTTPError as e:
            response = e.read()
            r = response.decode('utf-8')
            result = json.loads(r)
            raise exceptions.AuthenticationFailed(result['error'])

        if 'error' in user:
            raise exceptions.AuthenticationFailed(user['error'])
        try:
            user = get_user_model().objects.get(username=user['email'])
        except get_user_model().DoesNotExist:
            raise exceptions.AuthenticationFailed('No such user')

        return (user, None)
