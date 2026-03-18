from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core.exceptions import PermissionDenied
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import Ticket
from .serializers import TicketSerializer
from .filters import TicketFilter
from .services import TicketService


class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]

    # Filtri e ricerca
    filterset_class = TicketFilter
    search_fields = ["title", "description"]
    filter_backends = [DjangoFilterBackend, SearchFilter]

    # 🔒 FIX 1: niente queryset globale
    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Ticket.objects.all()

        return Ticket.objects.filter(created_by=user)

    # 🔒 FIX 2: protezione accesso diretto per ID
    def get_object(self):
        obj = super().get_object()

        if not self.request.user.is_staff and obj.created_by != self.request.user:
            raise PermissionDenied("Non puoi accedere a questo ticket")

        return obj

    # ✅ create ok
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    # 🔒 FIX 3: blocco DELETE per utenti normali
    def destroy(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return Response(
                {"error": "Non autorizzato a cancellare ticket"},
                status=status.HTTP_403_FORBIDDEN
            )

        return super().destroy(request, *args, **kwargs)

    # 🔥 FIX 4: collegamento business logic

    @action(detail=True, methods=["post"])
    def close(self, request, pk=None):
        ticket = self.get_object()

        try:
            TicketService.close_ticket(ticket, request.user)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

        return Response({"status": "closed"})

    @action(detail=True, methods=["post"])
    def assign(self, request, pk=None):
        ticket = self.get_object()
        user_id = request.data.get("user_id")

        try:
            TicketService.assign_ticket(ticket, request.user, user_id)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

        return Response({"status": "assigned"})
