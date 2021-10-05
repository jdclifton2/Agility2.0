from kanbanboard.models import User, Board, Column, Card
from rest_framework import viewsets, permissions
from .serializers import BoardSerializer, CardSerializer, ColumnSerializer, UserSerializer
from rest_framework.response import Response

class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()

    serializer_class = BoardSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]
    

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def list(self, request):
        user = request.user
        queryset = Card.objects.filter(owner=user)
        serializer = CardSerializer(queryset, many=True)
        return Response(serializer.data)


class ColumnViewSet(viewsets.ModelViewSet):
    queryset = Column.objects.all()
    
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = ColumnSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = UserSerializer