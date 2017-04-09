from rest_framework import serializers
from tracks.models import Track


class TrackSerializer(serializers.ModelSerializer):
    points = serializers.SerializerMethodField()

    class Meta:
        model = Track
        fields = ('id', 'title', 'points')

    def get_points(self, obj):
        return obj.get_points()
