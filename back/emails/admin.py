from django.contrib import admin
from emails.models import Contact, Email


# Register your models here.
admin.site.register(Contact)
admin.site.register(Email)