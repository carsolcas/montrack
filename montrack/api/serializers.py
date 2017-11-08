from rest_framework import serializers
from tracks.models import Track
from blog.models import BlogPage


class TrackSerializer(serializers.ModelSerializer):
    points = serializers.SerializerMethodField()

    class Meta:
        model = Track
        fields = ('id', 'title', 'max_elevation', 'distance', 'points')

    def get_points(self, obj):
        return obj.get_points()


class BlogPageSerializer(serializers.ModelSerializer):
    icon_url = serializers.SerializerMethodField()
    position = serializers.SerializerMethodField()

    class Meta:
        model = BlogPage
        fields = ('title', 'url', 'icon_url', 'position')

    def get_icon_url(self, obj):
        return obj.get_category_icon_url()

    def get_position(self, obj):
        track = obj.track
        return [track.start_lat, track.start_lon]