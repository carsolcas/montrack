from __future__ import absolute_import, unicode_literals

from wagtail.wagtailcore.models import Page


class LinksMixin(object):
    def get_context(self, request):
        from blog.models import BlogIndexPage

        context = super(LinksMixin, self).get_context(request)
        context['blog_index'] = BlogIndexPage.objects.first()
        return context


class HomePage(LinksMixin, Page):
    pass
