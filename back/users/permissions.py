from django.contrib.auth import get_user_model
from rest_framework import permissions


class IsItselforIsStafPermission(permissions.BasePermission):
    message = 'Only the owner can view this page.'
    """
    Global permission check for blacklisted IPs.
    """

    def has_permission(self, request, view):
        # import ipdb;
        # ipdb.set_trace()
        if not request.user.is_staff and request.user.id is not int(view.kwargs["pk"]):
            return False
        try:
            is_istself = get_user_model().objects.get(id=view.kwargs["pk"])
        except get_user_model().DoesNotExist:
            # Reject any request for an invalid user
            return False
        return is_istself
