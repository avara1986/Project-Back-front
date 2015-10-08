from django.contrib import admin
from emails.models import Contact, Email


class ContactAdmin(admin.ModelAdmin):
    model = Contact
    list_display = ('email',)


class EmailAdmin(admin.ModelAdmin):
    model = Email
    list_display = ('created', 'user', 'subject',)
    list_filter = ('user', 'to',)

# Register your models here.
admin.site.register(Contact, ContactAdmin)
admin.site.register(Email, EmailAdmin)
