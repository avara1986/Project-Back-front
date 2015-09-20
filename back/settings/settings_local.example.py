# encoding: utf-8
from settings import *
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

ES_SERVER = "s192.168.100.4:9200"