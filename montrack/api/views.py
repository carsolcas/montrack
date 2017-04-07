from rest_framework import generics
from .serializers import TrackSerializer
from tracks.models import Track


class RetrieveTrackView(generics.RetrieveAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
