from rest_framework import serializers
from kanbanboard.models import Board, Column, Member, Card


class BoardSerializer(serializers.ModelSerializer):
    """
    Serializers are used to convert the complex data of our models to primitive data types. Serializers are needed
    because we need to represent our data in a way that the frontend can work with (i.e. JSON format). This
    class is used to serialize the data of our Board model.
    """
    class Meta:
        model = Board
        fields = ['id', 'title', 'created_at', 'updated_at', 'is_public']


class ColumnSerializer(serializers.ModelSerializer):
    """
    This class is used to serialize the data of our Column model.
    """
    class Meta:
        model = Column
        fields = ['id', 'title', 'dashboard', 'created_at', 'updated_at']


class UserSerializer(serializers.ModelSerializer):
    """
    This class is used to serialize the data of our User model.
    """
    class Meta:
        model = Member
        fields = ['id', 'title', 'created_at', 'updated_at', 'is_public', 'avatar']


class CardSerializer(serializers.ModelSerializer):
    """
    This class is used to serialize the data of our Card model.
    """
    class Meta:
        model = Card
        fields = ['id', 'title', 'description', 'label', 'comment', 'created_at', 'column','position']
