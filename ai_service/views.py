import ai_service.serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import(
    TicketClassificationSerializer, 
    ReplyGenerationSerializer,
    TicketSummarizerSerializer
)

from .ticket_classifier import classify_ticket
from .reply_generator import generate_reply

@api_view(['POST'])
def classify_ticket_view(request):
    serializer = TicketClassificationSerializer(data = request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUESY)
    data = serializer.validated_data
    risultato_ai = classify_ticket(title=data['title'], description=data['description'])
    return Response(risultato_ai, status=status.HTTP_200_OK)

@api_view(['POST'])
def generate_reply_view(request):
    serializer = ReplyGenerationSerializer(data = request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    data = serializer.validated_data
    risultato_ai = generate_reply( title = data['title'], description = data['description'], operator_notes = data.get('operator_notes', '')
    )