from rest_framework import serializers
from kanbanboard.models import Board, Column, Member, Card


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['id', 'title', 'created_at', 'updated_at', 'is_public']


class ColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Column
        fields = ['id', 'title', 'dashboard', 'created_at', 'updated_at']


class UserSerializer(serializers.ModelSerializer):
    #owner = serializers.PrimaryKeyRelatedField(many=True, queryset=Board.objects.all())

    class Meta:
        model = Member
        fields = ['id', 'title', 'created_at', 'updated_at', 'is_public', 'avatar']


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'title', 'description', 'label', 'comment', 'created_at', 'column','position']


