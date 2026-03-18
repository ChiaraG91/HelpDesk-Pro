from datetime import timedelta

DEBUG = True
ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    # Le tue app
    "rest_framework",
    "django_filters",
    "apps.users.apps.UsersConfig",
    "apps.tickets.apps.TicketsConfig",
    "apps.comments.apps.CommentsConfig",
    "apps.categories.apps.CategoriesConfig",
    "apps.ai_service.apps.AiServiceConfig",
    'drf_yasg',

    # App Django di base
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]
AUTH_USER_MODEL = 'users.CustomUser'

REST_FRAMEWORK = {
     "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
    ],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "AUTH_HEADER_TYPES": ("Bearer",),
}