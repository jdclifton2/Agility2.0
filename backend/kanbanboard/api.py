from kanbanboard.models import Member, Board, Column, Card
from rest_framework import viewsets, permissions
from .serializers import BoardSerializer, CardSerializer, ColumnSerializer, UserSerializer

class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    
    # permission_classes = [
    #     permissions.AllowAny
    # ]

    serializer_class = BoardSerializer


class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    
    # permission_classes = [
    #     permissions.AllowAny
    # ]

    serializer_class = CardSerializer


class ColumnViewSet(viewsets.ModelViewSet):
    queryset = Column.objects.all()
    
    # permission_classes = [
    #     permissions.AllowAny
    # ]

    serializer_class = ColumnSerializer



class UserViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    
    # permission_classes = [
    #     permissions.AllowAny
    # ]

    serializer_class = UserSerializer