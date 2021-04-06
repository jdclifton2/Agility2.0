from django.db import models
from django.contrib.auth.models import User

class Member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    data = models.CharField(max_length=2048, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    avatar = models.ImageField(upload_to="photos/", blank=True)

    #team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='teams')


    def __str__(self):
        template = ' {0.user}'
        return template.format(self)


class Board(models.Model):
    title = models.CharField(max_length=128)
    owner = models.ForeignKey(Member, related_name='members',
                              on_delete=models.CASCADE)
    #owner = models.ForeignKey(Member, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True, verbose_name='LAST UPDATE')

    is_public = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.title}'


class Column(models.Model):
    class Meta:
        verbose_name = 'List'
        verbose_name_plural = 'Lists'
    dashboard = models.ForeignKey(Board, on_delete=models.CASCADE, null=True)

    title = models.CharField(max_length=128)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.title}'


class Card(models.Model):
    class Meta:
        verbose_name = 'OldCard'
        verbose_name_plural = 'Cards'
    
    column = models.ForeignKey(Column, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=128)
    description = models.TextField(blank=True)
    label = models.CharField(max_length=128, blank=True)

    start_date = models.DateTimeField(null=True, blank=True)
    due_date = models.DateTimeField(null=True, blank=True)

    time_estimate_hours = models.PositiveIntegerField(null=True, blank=True)

    comment = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    subtask_id = models.ForeignKey("self", on_delete=models.CASCADE, null=True, blank=True)

    is_done = models.BooleanField(default=False)


    def __str__(self):
        return f'{self.id}'


