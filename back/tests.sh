#!/bin/sh
#coverage erase
#tox
#coverage combine
#coverage report -m --omit=.tox/*
#coverage html --omit=.tox/*
python manage.py test users