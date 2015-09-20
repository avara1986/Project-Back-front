from django.contrib.auth import get_user_model

from django.test import TestCase
from django.test.client import Client


# Create your tests here.
class BaseTest(TestCase):
    fixtures = ['initial_data.json']
    host = 'http://192.168.100.3:8000'

    def setUp(self):  # 3

        '''
        Inicializar client
        '''
        self.client = Client()
        self.csrf_client = Client(enforce_csrf_checks=True)


class UserNoLoginMixin(object):
    status_code = 403


class UserLoginMixin(object):
    status_code = 200

    def test_login_user(self):
        '''
        Verificar que existe usuario y las fixture se cargaron correctamente
        '''
        user = get_user_model().objects.get(pk=1)
        self.assertEqual(user.username, 'admin')

        self.assertIn('_auth_user_id', self.client.session)
        self.assertEqual(int(self.client.session['_auth_user_id']), user.pk)


class BaseUsers(object):
    '''
    Recuperar los datos de un usuario
    '''
    def test_check_user_exist(self):
        r = self.client.get(self.host + "/users/1/")
        self.assertEqual(r.status_code, self.status_code)

    def test_check_user_followers(self):
        r = self.client.get(self.host + "/users/1/followers/")
        self.assertEqual(r.status_code, self.status_code)

    def test_check_user_following(self):
        r = self.client.get(self.host + "/users/1/following/")
        self.assertEqual(r.status_code, self.status_code)


class UsersNoLoginTests(BaseTest, BaseUsers, UserNoLoginMixin):
    pass


class UsersLoginTests(BaseTest, BaseUsers, UserLoginMixin):
    def setUp(self):
        super(UsersLoginTests, self).setUp()
        '''
        Logueamos
        '''
        self.client.post("/api-auth/login/", {
            'username': "admin",
            'password': "admin", })

