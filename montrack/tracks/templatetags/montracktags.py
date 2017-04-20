# -*- coding: UTF-8 -*-
from django.template import Library
import datetime

register = Library()


@register.filter(is_safe=False)
def humanize_time(seconds):
    return str(datetime.timedelta(seconds=seconds))


@register.filter(is_safe=False)
def humanize_km(meters):
    return meters / 1000.0
