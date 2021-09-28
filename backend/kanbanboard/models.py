from authentication.models import CustomUser
from django.db import models
from django.contrib.auth.models import User
from django_ordered_field import OrderedField


class Member(models.Model):
    """This class models a member of the application.


    Attributes
    ----------
    user:
        Djangos built in user authentication class. 
    data : str
        Any data that needs to be stored for the member.
    created_at : DateTime
        When the member was created.
    updated_at : DateTime
        When the member was updated.
    avatar : ImageField
        the members avatar.

    Methods
    -------
    __str__(self)
        ToString method.
    """
    
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    data = models.CharField(max_length=2048, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    avatar = models.ImageField(upload_to="photos/", blank=True)

    #team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='teams')


    def __str__(self):
        template = ' {0.user}'
        return template.format(self)


class Board(models.Model):
    """This class models a board in the application.


    Attributes
    ----------
    title: str
        The title of the board.
    owner : Member
        The member that owns the board.
    created_at : DateTime
        When the member was created.
    updated_at : DateTime
        When the member was updated.
    is_public : Boolean
        If the board is public.

    Methods
    -------
    __str__(self)
        ToString method.
    """
    title = models.CharField(max_length=128)
    owner = models.ForeignKey(Member, related_name='members',
                              on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True, verbose_name='LAST UPDATE')

    is_public = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.title}'


class Column(models.Model):
    """This class models a column/list of tasks contained within a board.

    Attributes
    ----------
    title: str
        The title of the board.
    dashboard: board
        The board the list is contained within.
    created_at : DateTime
        When the member was created.
    updated_at : DateTime
        When the member was updated.

    Methods
    -------
    __str__(self)
        ToString method.
    """

    dashboard = models.ForeignKey(Board, on_delete=models.CASCADE, null=True)

    title = models.CharField(max_length=128)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    position = OrderedField()

        
    class Meta:
        verbose_name = 'List'
        verbose_name_plural = 'Lists'
        ordering = ('position',)

    def __str__(self):
        return f'{self.title}'


class Card(models.Model):
    """This class models a card of tasks contained within a column/list.

    Attributes
    ----------
    column: column
        The column the cards are contained within.
    title: str
        The title of the board.
    description: str
        A description of the card. 
    start_date: DateTime
        When the task is started.  
    due_date: DateTime
        When the task is due. 
    created_at : DateTime
        When the member was created.
    updated_at : DateTime
        When the member was updated.
    time_estimate_hours : int
        How long the task is estimate to take in hours.
    sub_task_id : card
        A subtask for this card.
    is_done : boolean
        If the task is done.
    position : int
        cards position in column.

    Methods
    -------
    __str__(self)
        ToString method.
    """

    column = models.ForeignKey(Column, on_delete=models.CASCADE, null=True, related_name= 'cards')
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
    
    position = OrderedField(update_auto_now=True)

    class Meta:
        verbose_name = 'Card'
        verbose_name_plural = 'Cards'
        ordering = ('position',)

    def __str__(self):
        return f'{self.id}'


class Project(models.Model):
    """This class models a project which contains boards.

    Attributes
    ----------
    title: str
        The title of the project.
    description: str
        The description of the project.
    label: str
        Labels for the project.

    Methods
    -------
    __str__(self)
        ToString method.
    """
    
    title = models.CharField(max_length=128)
    description = models.TextField(blank=True)
    label = models.CharField(max_length=128, blank=True)

    def __str__(self):
        return f'{self.id}'