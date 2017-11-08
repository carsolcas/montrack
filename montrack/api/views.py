from rest_framework import generics
from .serializers import TrackSerializer, BlogPageSerializer
from tracks.models import Track
from blog.models import BlogPage


class RetrieveTrackView(generics.RetrieveAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer


class RetrieveTrackListView(generics.ListAPIView):
    queryset = BlogPage.objects.live()
    serializer_class = BlogPageSerializer
