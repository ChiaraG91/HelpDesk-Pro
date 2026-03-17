from rest_framework import serializers

class TicketClassificationSerializer(serializers.Serializer):
    title = serializers.CharField(
        max_length=255, 
        required=True,
        error_messages={
            'required': 'Attenzione, bisogna inserire un titolo.',
            'blank': 'Il titolo non può essere lasciato vuoto.'
        }
    )
    description = serializers.CharField(
        required=True,
        error_messages={
            'required': 'Attenzione, bisogna inserire una descrizione del problema.',
            'blank': 'La descrizione non può essere lasciata vuota.'
        }
    )


class ReplyGenerationSerializer(serializers.Serializer):
    title = serializers.CharField(
        max_length=255, 
        required=True,
        error_messages={'required': 'Manca il titolo del ticket.', 'blank': 'Inserisci un titolo valido.'}
    )
    description = serializers.CharField(
        required=True,
        error_messages={'required': 'Manca la descrizione.', 'blank': 'Inserisci la descrizione.'}
    )
    operator_notes = serializers.CharField(required=False, allow_blank=True, default="")


class TicketSummarizerSerializer(serializers.Serializer):
    title = serializers.CharField(
        max_length=255, 
        required=True,
        error_messages={'required': 'Titolo obbligatorio per il riassunto.', 'blank': 'Titolo non valido.'}
    )
    description = serializers.CharField(
        required=True,
        error_messages={'required': 'Descrizione obbligatoria per il riassunto.', 'blank': 'Descrizione non valida.'}
    )
    history = serializers.CharField(required=False, allow_blank=True, default="")