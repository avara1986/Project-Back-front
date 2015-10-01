import urllib2, json

from django.conf import settings
from django.core.mail.message import EmailMultiAlternatives

from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response

from users.permissions import IsItselforIsStafPermission
from emails.serializers import EmailSerializer, ContactSerializer
from emails.models import Contact, Email


def send_mail(subject, message, from_email, recipient_list, recipient_bcc_list):
    mail = EmailMultiAlternatives(
        subject, message, from_email, to=recipient_list, bcc=recipient_bcc_list)
    mail.attach_alternative(message, 'text/html')
    mail.send()


class EmailViewSet(viewsets.ModelViewSet):

    queryset = Email.objects.all()
    serializer_class = EmailSerializer

    @list_route(methods=['post'])
    def sendurl(self, request):
        '''
        Example data:
        {
            "url": "http://design.gobalo.es/newsletters/google/partners_producto/agosto/index.html",
            "to": [{"email": "a.vara.1986@gmail.com"},{"email": "a.vara.1987@gmail.com"}],
            "user": 1,
            "subject": "Test",
            "content": "",
            "g_token": "",
        }
        '''
        data = request.data
        if request.method == 'GET':
            data = request.query_params
        data.update({'user':request.user.id})
        serializer = EmailSerializer(data=data)
        if serializer.is_valid():
            email = serializer.save()
            # SEND EMAIL:
            if email.url is not None:
                req = urllib2.Request(email.url)
                content = urllib2.urlopen(req).read()
                recipient_list = [c.email for c in email.to.all()]
                recipient_bcc_list = ["a.vara.1986@gmail.com", ]

                send_mail(
                    email.subject, content, settings.EMAIL_HOST_USER, recipient_list, recipient_bcc_list)
                return Response({'status': 'email sent'})
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
