from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from django.shortcuts import get_object_or_404
from apps.tickets.models import Ticket

from .serializers import(
    TicketClassificationSerializer, 
    ReplyGenerationSerializer,
    DuplicateCheckSerializer
)

from .ticket_classifier import classify_ticket
from .reply_generator import generate_reply
from .duplicate_detector import check_duplicate

@swagger_auto_schema(method='post', request_body=TicketClassificationSerializer)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def classify_ticket_view(request):
    serializer = TicketClassificationSerializer(data = request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    data = serializer.validated_data
    
    ticket = get_object_or_404(Ticket, id=data['ticket_id'])
    
    risultato_ai = classify_ticket(title=ticket.title, description=ticket.description)
    return Response(risultato_ai, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', request_body=ReplyGenerationSerializer)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_reply_view(request):
    serializer = ReplyGenerationSerializer(data = request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    data = serializer.validated_data
    
    ticket = get_object_or_404(Ticket, id=data['ticket_id'])
    
    risultato_ai = generate_reply( title = ticket.title, description = ticket.description, operator_notes = data.get('operator_notes', '')
    )
    return Response({"generated_reply": risultato_ai}, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', request_body=DuplicateCheckSerializer)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_duplicate_view(request):
    serializer = DuplicateCheckSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    data = serializer.validated_data
    ticket = get_object_or_404(Ticket, id=data['ticket_id'])
    
    # Raccogliamo i ticket recenti, escludendo quello attuale
    recent = Ticket.objects.exclude(id=ticket.id).order_by('-created_at')[:10]
    recent_formatted = "\\n".join([f"ID: {t.id} - {t.title}" for t in recent])
    
    if not recent_formatted:
        recent_formatted = "Nessun ticket recente trovato."
    
    risultato_ai = check_duplicate(
        new_title=ticket.title, 
        new_description=ticket.description, 
        recent_tickets=recent_formatted
    )
    
    return Response(risultato_ai, status=status.HTTP_200_OK)