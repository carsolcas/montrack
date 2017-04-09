from django.test import TestCase
from tracks.models import Track

from rest_framework.test import APIClient
from rest_framework import status
from django.core.urlresolvers import reverse


class TrackTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.track_title = "Track"
        self.track = Track.objects.create(title=self.track_title)

    def test_track_title(self):
        self.assertEqual(self.track.title, self.track_title)

    def test_get_track(self):
        url = reverse('track_item', kwargs={'pk': self.track.pk})
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(data['id'], self.track.pk)
        self.assertEqual(data['points'], [])
