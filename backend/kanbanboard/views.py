from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from kanbanboard.serializers import BoardSerializer, CardSerializer, UserSerializer, ColumnSerializer
from .models import Member, Board, Column, Card
from rest_framework import generics
from rest_framework import renderers


class BoardList(generics.ListCreateAPIView):
   queryset = Board.objects.all()
   serializer_class = BoardSerializer


class BoardDetail(generics.RetrieveUpdateDestroyAPIView):
   queryset = Board.objects.all()
   serializer_class = BoardSerializer


class CardList(generics.ListCreateAPIView):
   queryset = Card.objects.all()
   serializer_class = CardSerializer


class CardDetail(generics.RetrieveUpdateDestroyAPIView):
   queryset = Card.objects.all()
   serializer_class = CardSerializer


class ColumnList(generics.ListAPIView):
   queryset = Column.objects.all()
   serializer_class = ColumnSerializer


class ColumnDetail(generics.RetrieveUpdateDestroyAPIView):
   queryset = Column.objects.all()
   serializer_class = ColumnSerializer


class MemberList(generics.ListAPIView):
   queryset = Member.objects.all()
   serializer_class = UserSerializer   


class MemberDetail(generics.RetrieveUpdateDestroyAPIView):
   queryset = Member.objects.all()
   serializer_class = UserSerializer

