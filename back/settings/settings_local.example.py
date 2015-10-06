# encoding: utf-8
from settings.settings import *

DEBUG = TEMPLATE_DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'pogona',
        'USER': 'pogona',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

EMAIL_HOST_PASSWORD = 'Cerbero892'

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
#EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
