from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
import apps.comments.models
import apps.tickets.models
from .serializers import CommentSerializer


class TicketCommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        ticket_id = self.kwargs["ticket_id"]
        return Comment.objects.filter(ticket_id=ticket_id).order_by("-created_at")

    def perform_create(self, serializer):
        ticket_id = self.kwargs["ticket_id"]
        ticket = Ticket.objects.get(id=ticket_id)

        serializer.save(
            author=self.request.user,
            ticket=ticket
        )

