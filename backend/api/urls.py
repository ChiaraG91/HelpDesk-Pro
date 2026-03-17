from django.urls import path, include
from rest_framework.routers import DefaultRouter

# import views
from backend.apps.tickets.views import TicketViewSet
from backend.apps.comments.views import TicketCommentListCreateView
from backend.apps.categories.views import CategoryListView
from backend.apps.users.views import RegisterView, me, UserViewSet

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# router principale
router = DefaultRouter()
router.register("tickets", TicketViewSet, basename="ticket")
router.register("users", UserViewSet, basename="user")

urlpatterns = [

    # 🔐 AUTH
    path("auth/login/", TokenObtainPairView.as_view()),
    path("auth/refresh/", TokenRefreshView.as_view()),
    path("auth/register/", RegisterView.as_view()),

    # 👤 utente corrente
    path("users/me/", me),

    # 🎫 commenti ticket
    path(
        "tickets/<int:ticket_id>/comments/",
        TicketCommentListCreateView.as_view(),
    ),

    # 🗂 categorie
    path(
        "categories/",
        CategoryListView.as_view(),
    ),

    # 🚀 router automatico (tickets + users)
    path("", include(router.urls)),
]