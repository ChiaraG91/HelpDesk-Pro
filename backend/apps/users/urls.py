from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import RegisterView
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import me, UserViewSet

urlpatterns = [
    path("auth/login/", TokenObtainPairView.as_view(), name="login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("auth/register/", RegisterView.as_view(), name="register"),
]

router = DefaultRouter()
router.register("users", UserViewSet)

urlpatterns = [
    path("users/me/", me),
    path("", include(router.urls)),
]