# Generated by Django 3.0.4 on 2021-04-20 13:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('kanbanboard', '0005_auto_20210419_1743'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='column',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='cards', to='kanbanboard.Column'),
        ),
    ]
