# encoding: utf-8
from settings.settings import *
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'pogona',
        'USER': 'pogona',
        'PASSWORD': 'test1234',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

EMAIL_HOST_PASSWORD = ''

# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
