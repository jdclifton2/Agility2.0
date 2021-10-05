from rest_framework import serializers
from kanbanboard.models import Board, Column, Card
from django.contrib.auth.models import User



class BoardSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Board
        fields = ['id', 'title', 'created_at', 'updated_at', 'is_public', 'owner']


class ColumnSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Column
        fields = ['id', 'title', 'dashboard', 'created_at', 'updated_at', 'owner']



class CardSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Card
        fields = ['id', 'title', 'description', 'label', 'comment', 'created_at', 'column','position', 'owner']


class UserSerializer(serializers.ModelSerializer):
    cards = serializers.PrimaryKeyRelatedField(many=True, queryset=Card.objects.all())
    boards = serializers.PrimaryKeyRelatedField(many=True, queryset=Board.objects.all())
    columns = serializers.PrimaryKeyRelatedField(many=True, queryset=Column.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'cards', 'columns', 'boards']