from __future__ import absolute_import, unicode_literals

from wagtail.wagtailcore.models import Page


class LinksMixin(object):
    def get_context(self, request):
        from blog.models import BlogIndexPage

        context = super(LinksMixin, self).get_context(request)
        context['blog_index'] = BlogIndexPage.objects.first()
        return context


class HomePage(LinksMixin, Page):
    num_entries = 4

    def get_entries(self):
        from blog.models import BlogPage
        entries = BlogPage.objects.live().order_by('-date')
        return entries[:self.num_entries]

    def get_context(self, request):
        context = super(HomePage, self).get_context(request)
        context['entries'] = self.get_entries()
        return context
