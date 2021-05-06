from kanbanboard.serializers import BoardSerializer, CardSerializer, UserSerializer, ColumnSerializer
from .models import Member, Board, Column, Card
from rest_framework import generics


class BoardList(generics.ListCreateAPIView):
   """
   This class will provide a response to the http request made. Essentially, this class will represent all
   of our board model's data in JSON format.
   """
   queryset = Board.objects.all()
   serializer_class = BoardSerializer


class BoardDetail(generics.RetrieveUpdateDestroyAPIView):
   """
   This class will provide a response to the http request made. Essentially, this class will represent a single
   board model's data in JSON format.
   """
   queryset = Board.objects.all()
   serializer_class = BoardSerializer


class CardList(generics.ListCreateAPIView):
   """
   This class will provide a response to the http request made. Essentially, this class will
   represent all the cards model's data in JSON format.
   """
   queryset = Card.objects.all()
   serializer_class = CardSerializer


class CardDetail(generics.RetrieveUpdateDestroyAPIView):
   """
   This class will provide a response to the http request made. Essentially, this class will represent a single
   board model's data in JSON format.
   """
   queryset = Card.objects.all()
   serializer_class = CardSerializer


class ColumnList(generics.ListAPIView):
   """
   This class will provide a response to the http request made. Essentially, this class will
   represent all the Columns model's data in JSON format.
   """
   queryset = Column.objects.all()
   serializer_class = ColumnSerializer


class ColumnDetail(generics.RetrieveUpdateDestroyAPIView):
   """
   This class will provide a response to the http request made. Essentially, this class will represent a single
   column model's data in JSON format.
   """
   queryset = Column.objects.all()
   serializer_class = ColumnSerializer


class MemberList(generics.ListAPIView):
   """
   This class will provide a response to the http request made. Essentially, this class will
   represent all the Members model's data in JSON format.
   """
   queryset = Member.objects.all()
   serializer_class = UserSerializer   


class MemberDetail(generics.RetrieveUpdateDestroyAPIView):
   """
   This class will provide a response to the http request made. Essentially, this class will represent a single
   Member model's data in JSON format.
   """
   queryset = Member.objects.all()
   serializer_class = UserSerializer

