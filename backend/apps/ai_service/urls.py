from django.urls import path
from . import views

urlpatterns = [
    # Quando qualcuno va su /api/ai/classify/, Django chiama classify_ticket_view
    path('classify/', views.classify_ticket_view, name='ai_classify'),
    
    # Quando qualcuno va su /api/ai/reply/, chiama generate_reply_view
    path('reply/', views.generate_reply_view, name='ai_reply'),
    
]