# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Created date')),
                ('email', models.EmailField(max_length=100, verbose_name=b'Email')),
            ],
        ),
        migrations.CreateModel(
            name='Email',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Created date')),
                ('url', models.URLField(null=True, verbose_name='Url', blank=True)),
                ('subject', models.CharField(max_length=250, verbose_name='Subject')),
                ('content', models.TextField(null=True, verbose_name='Content', blank=True)),
                ('to', models.ManyToManyField(related_name='contacts', verbose_name='Contacts', to='emails.Contact')),
                ('user', models.ForeignKey(related_name='emailssends', verbose_name='User', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
