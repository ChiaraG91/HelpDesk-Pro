import json
from .llm_provider import get_ai_response

def classify_ticket(title, description):
    prompt = f"""Sei un esperto di supporto tecnico. Analizza il ticket inserito e categorizzalo.
    Le categorie ammesse sono [bug, support, feature_request, other]
    Le priorità ammesse sono [bassa, media, elevata, critica]
    Titolo : {title}
    Descrizione : {description}

    Rispondi esclusivamente in formato JSON con questa struttura: {{
        "categoria" :"valore",
        "priorità" : "valore",
        "riassunto" : "breve spiegazione del problema"
    }}"""

    raw_response = get_ai_response(prompt)
    print(f"\n--- DEBUG AI RESPONSE ---\n{raw_response}\n------------------------\n")
    try:
        clean_json = raw_response.strip().replace('```json', '').replace('```', '')
        return json.loads(clean_json)
    except Exception as e:
        print(f"Errore nel parsing dell'AI: {e}")
        # Paracadute: se l'AI risponde male, non blocchiamo il sito
        return {
            "categoria":"NA", 
            "priorità": "NA", 
            "riassunto": "Errore analisi AI"
        }
