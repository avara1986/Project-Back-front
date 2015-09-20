from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.db import models


# Create your models here.
class User(AbstractUser):
    followings = models.ManyToManyField('User',
                                        verbose_name=_('Followings'),
                                        related_name='followers',
                                        null=True,
                                        blank=True)

    class Meta(AbstractUser.Meta):
        swappable = 'AUTH_USER_MODEL'