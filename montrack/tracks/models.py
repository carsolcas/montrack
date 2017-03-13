from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _

from wagtail.wagtaildocs.models import AbstractDocument
# Create your models here.


class Track(AbstractDocument):
    distance = models.IntegerField(_('distancia'), default=0)
    elevation = models.IntegerField(_('desnivel'), default=0)
    moving_time = models.IntegerField(_('tiempo en movimiento'), default=0)
    elapsed_time = models.IntegerField(_('tiempo total'), default=0)
    max_elevation = models.IntegerField(_('altura máxima'), default=0)
    max_velocity = models.FloatField(_('velocidad máxima'), default=0)
    start_lat = models.FloatField(_('latitud'), default=0)
    start_lon = models.FloatField(_('longitud'), default=0)
    date = models.DateTimeField(verbose_name=_('fecha realización'),
                                auto_now_add=True)


# Delete the source track file when a track is deleted
@receiver(post_delete, sender=Track)
def image_delete(sender, instance, **kwargs):
    instance.file.delete(False)
