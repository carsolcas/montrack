from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import RetrieveTrackView, RetrieveTrackListView

urlpatterns = {
    url(r'^track/(?P<pk>\d+)/$', RetrieveTrackView.as_view(),
        name="track_item"),
    url(r'^track-list/$', RetrieveTrackListView.as_view(),
        name="track_list"),
}

urlpatterns = format_suffix_patterns(urlpatterns)
