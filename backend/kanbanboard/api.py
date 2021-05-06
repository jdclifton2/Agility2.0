from kanbanboard.models import Member, Board, Column, Card
from rest_framework import viewsets, permissions
from .serializers import BoardSerializer, CardSerializer, ColumnSerializer, UserSerializer


class BoardViewSet(viewsets.ModelViewSet):
    """
    This class is used to represent the API for the boards of which we will fetch data from.
    """
    queryset = Board.objects.all()
    
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = BoardSerializer


class CardViewSet(viewsets.ModelViewSet):
    """
    This class is used to represent the API for the cards. Data will be fetched from
    this API later on the frontend.
    """
    queryset = Card.objects.all()
    
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = CardSerializer


class ColumnViewSet(viewsets.ModelViewSet):
    """
    This class is used to represent the API for the columns. Data will be fetched from
    this API later on the frontend.
    """
    queryset = Column.objects.all()
    
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ColumnSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    This class is used to represent the API for the users. Data will be fetched from
    this API later on the frontend.
    """
    queryset = Member.objects.all()
    
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = UserSerializer
