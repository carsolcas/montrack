from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import RetrieveTrackView

urlpatterns = {
    url(r'^track/(?P<pk>\d+)/$', RetrieveTrackView.as_view(),
        name="track_item"),
}

urlpatterns = format_suffix_patterns(urlpatterns)
