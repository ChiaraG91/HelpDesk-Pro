from django.urls import path, include
from rest_framework.routers import DefaultRouter
from backend.apps.comments.views import TicketCommentListCreateView
from backend.apps.tickets.views import TicketViewSet

router = DefaultRouter()
router.register("tickets", TicketViewSet)

urlpatterns = [
    path("", include(router.urls)),

    # 👇 endpoint commenti
    path(
        "tickets/<int:ticket_id>/comments/",
        TicketCommentListCreateView.as_view(),
    ),
]