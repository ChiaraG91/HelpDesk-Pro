from rest_framework import serializers
from backend.apps.comments.models import Comment


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ["author", "ticket", "created_at"]