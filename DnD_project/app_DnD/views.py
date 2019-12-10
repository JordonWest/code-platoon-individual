
from django.http import HttpResponseRedirect
from rest_framework.response import Response
from .models import Player, Table, Membership
from .serializers import PlayerSerializer, TableSerializer, MembershipSerializer
from rest_framework import viewsets

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class TableViewSet(viewsets.ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer

class MembershipViewSet(viewsets.ModelViewSet):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer
