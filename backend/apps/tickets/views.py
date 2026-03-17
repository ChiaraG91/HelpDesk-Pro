from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import Ticket
from .serializers import TicketSerializer
from .filters import TicketFilter  # opzionale se vuoi filtri per stato, priorità, ecc.


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]

    # Filtri e ricerca
    filterset_class = TicketFilter
    search_fields = ["title", "description"]
    filter_backends = [DjangoFilterBackend, SearchFilter]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


from django.shortcuts import render

# Create your views here.
