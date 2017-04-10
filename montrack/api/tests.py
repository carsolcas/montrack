from unittest.mock import patch

from django.test import TestCase
from django.core.urlresolvers import reverse

from rest_framework.test import APIClient
from rest_framework import status

from tracks.models import Track


class TrackTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.track_title = "Track"
        self.track = Track.objects.create(title=self.track_title)

    def test_track_title(self):
        self.assertEqual(self.track.title, self.track_title)

    @patch('tracks.models.Track.get_points')
    def test_get_track(self, get_points_mock):
        points = [[1, 2, 3, 3], [-4, 5, 6, 6]]
        get_points_mock.return_value = points

        url = reverse('track_item', kwargs={'pk': self.track.pk})
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(data['id'], self.track.pk)
        self.assertEqual(data['points'], points)
