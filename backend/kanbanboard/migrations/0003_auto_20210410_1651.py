# Generated by Django 3.0.4 on 2021-04-10 16:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('kanbanboard', '0002_project'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='card',
            options={'verbose_name': 'Card', 'verbose_name_plural': 'Cards'},
        ),
    ]
