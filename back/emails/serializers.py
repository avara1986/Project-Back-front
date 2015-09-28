from rest_framework import serializers
from emails.models import Contact, Email


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('email')


class EmailSerializer(serializers.ModelSerializer):
    to = ContactSerializer(many=True, required=True)

    class Meta:
        model = Email
        fields = (
                  'to',
                  'url',
                  'subject',
                  'content',
                  )



