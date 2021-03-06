# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-14 20:28
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tracks', '0001_initial'),
        ('blog', '0002_auto_20170226_0956'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogpage',
            name='track',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='tracks.Track'),
        ),
        migrations.AlterField(
            model_name='blogpage',
            name='category',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.PROTECT, to='blog.BlogCategory'),
        ),
    ]
