# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-26 09:56
from __future__ import unicode_literals

from django.db import migrations
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpage',
            name='intro',
            field=wagtail.wagtailcore.fields.RichTextField(blank=True),
        ),
    ]
