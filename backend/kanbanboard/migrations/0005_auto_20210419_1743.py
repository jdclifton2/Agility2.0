# Generated by Django 3.0.4 on 2021-04-19 17:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kanbanboard', '0004_card_position'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='position',
            field=models.PositiveIntegerField(null=True),
        ),
    ]
