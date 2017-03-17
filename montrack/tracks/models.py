from django.conf import settings
from django.db import models
from django.core.files.storage import FileSystemStorage
from django.db.models.signals import post_delete
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _

from wagtail.wagtaildocs.models import AbstractDocument

import gpxpy

track_fs = FileSystemStorage(location=settings.TRACKS_ROOT,
                             base_url=settings.TRACKS_URL)


class Track(AbstractDocument):
    file = models.FileField(storage=track_fs, upload_to='',
                            verbose_name=_('Track'))
    distance = models.IntegerField(_('distancia'), default=0)
    uphill = models.IntegerField(_('desnivel'), default=0)
    downhill = models.IntegerField(_('desnivel'), default=0)
    moving_time = models.IntegerField(_('tiempo en movimiento'), default=0)
    elapsed_time = models.IntegerField(_('tiempo total'), default=0)
    max_elevation = models.IntegerField(_('altura máxima'), default=0)
    max_velocity = models.FloatField(_('velocidad máxima'), default=0)
    start_lat = models.FloatField(_('latitud'), default=0)
    start_lon = models.FloatField(_('longitud'), default=0)
    date = models.DateTimeField(verbose_name=_('fecha realización'),
                                auto_now_add=True)

    admin_form_fields = (
            'title',
            'file',
            'collection',
            'tags'
        )

    def save(self, *args, **kwargs):
        read_file = self.pk is None
        super(Track, self).save(*args, **kwargs)

        if read_file:
            gpx = gpxpy.parse(open(self.file.path))

            uphill, downhill = gpx.get_uphill_downhill()
            (moving_time, stopped_time, moving_distance,
             stopped_distance, max_speed) = gpx.get_moving_data()

            start_time, end_time = gpx.get_time_bounds()

            self.uphill = int(uphill)
            self.downhill = int(downhill)
            self.distance = int(gpx.length_3d())
            self.max_velocity = max_speed
            self.moving_time = int(moving_time)
            self.elapsed_time = int(moving_time + stopped_time)
            self.start_lat = gpx.tracks[0].segments[0].points[0].latitude
            self.start_lon = gpx.tracks[0].segments[0].points[0].longitude
            self.save()


# Delete the source track file when a track is deleted
@receiver(post_delete, sender=Track)
def document_delete(sender, instance, **kwargs):
    instance.file.delete(False)
