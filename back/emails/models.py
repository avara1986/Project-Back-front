from django.db import models
from django.utils.translation import ugettext_lazy as _
from users.models import User


class Contact(models.Model):
    created = models.DateTimeField(
        verbose_name=_("Created date"), auto_now_add=True)
    email = models.EmailField(
        verbose_name="Email", max_length=100)

    def __str__(self):
        return "%s" % self.email


class Email(models.Model):
    created = models.DateTimeField(
        verbose_name=_("Created date"), auto_now_add=True)
    user = models.ForeignKey(
        User, verbose_name=_('User'), related_name='emailssends')
    to = models.ManyToManyField(
        Contact, verbose_name=_('Contacts'), related_name='contacts')
    url = models.URLField(verbose_name=_('Url'), null=True, blank=True)
    subject = models.CharField(
        verbose_name=_("Subject"), max_length=250)
    content = models.TextField(_('Content'), null=True, blank=True)

    def __str__(self):
        return "%s" % self.subject
