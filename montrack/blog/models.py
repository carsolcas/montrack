from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db import models

from modelcluster.fields import ParentalKey
from modelcluster.tags import ClusterTaggableManager
from taggit.models import TaggedItemBase

from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailcore.fields import RichTextField

from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtaildocs.edit_handlers import DocumentChooserPanel
from wagtail.wagtailsnippets.models import register_snippet

from wagtail.wagtailadmin.edit_handlers import (FieldPanel, InlinePanel,
                                                MultiFieldPanel)

from wagtail.wagtailsearch import index

from home.models import LinksMixin


class BlogIndexPage(LinksMixin, Page):
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full")
    ]

    subpage_types = ['blog.BlogPage']

    @property
    def entries(self):
        entries = BlogPage.objects.live().descendant_of(self)
        return entries.order_by('-date')

    def get_context(self, request):
        entries = self.entries
        last_entry = self.entries[0] if entries else None

        entries = entries[1:]

        # Filter by tag
        tag = request.GET.get('tag')
        if tag:
            entries = entries.filter(tags__name=tag)

        # Pagination
        page = request.GET.get('page')
        paginator = Paginator(entries, 6)  # Show 10 blogs per page
        try:
            entries = paginator.page(page)
        except PageNotAnInteger:
            entries = paginator.page(1)
        except EmptyPage:
            entries = paginator.page(paginator.num_pages)

        # Update template context
        context = super(BlogIndexPage, self).get_context(request)
        context['entries'] = entries
        context['last_entry'] = last_entry
        return context


class BlogPageTag(TaggedItemBase):
    content_object = ParentalKey('BlogPage', related_name='tagged_items')


class BlogPage(LinksMixin, Page):
    date = models.DateField("Post date")
    intro = RichTextField(blank=True)
    body = RichTextField(blank=True)
    tags = ClusterTaggableManager(through=BlogPageTag, blank=True)
    category = models.ForeignKey('blog.BlogCategory', blank=True,
                                 on_delete=models.PROTECT)
    track = models.ForeignKey('tracks.Track', on_delete=models.PROTECT,
                              null=True, related_name='+')

    content_panels = Page.content_panels + []

    def main_image(self):
        gallery_item = self.gallery_images.first()
        return gallery_item.image if gallery_item else None

    search_fields = Page.search_fields + [
        index.SearchField('intro'),
        index.SearchField('body'),
    ]

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel('date'),
            FieldPanel('tags'),
            FieldPanel('category'),
        ], heading="Blog information"),
        FieldPanel('intro'),
        FieldPanel('body', classname="full"),
        DocumentChooserPanel('track'),
        InlinePanel('gallery_images', label="Gallery images"),
    ]

    subpage_types = []


class BlogPageGalleryImage(Orderable):
    page = ParentalKey(BlogPage, related_name='gallery_images')
    image = models.ForeignKey(
        'wagtailimages.Image', on_delete=models.CASCADE, related_name='+'
    )
    caption = models.CharField(blank=True, max_length=250)

    panels = [
        ImageChooserPanel('image'),
        FieldPanel('caption'),
    ]


@register_snippet
class BlogCategory(models.Model):
    name = models.CharField(max_length=100)
    icon = models.ForeignKey(
        'wagtailimages.Image', null=True, blank=True,
        on_delete=models.SET_NULL, related_name='+'
    )

    panels = [
        FieldPanel('name'),
        ImageChooserPanel('icon'),
    ]

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'blog categories'
