from rest_framework import serializers
from emails.models import Contact, Email


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('email',)


class EmailSerializer(serializers.ModelSerializer):
    to = ContactSerializer(many=True, required=True)

    def create(self, validated_data):
        tos = validated_data.pop('to')

        email = Email.objects.create(**validated_data)

        for to in tos:
            con, result = Contact.objects.get_or_create(email=to['email'])
            email.to.add(con)

        return email

    class Meta:
        model = Email
        fields = (
                  'url',
                  'to',
                  'user',
                  'subject',
                  'content',
                  )



