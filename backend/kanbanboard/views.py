from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from kanbanboard.serializers import BoardSerializer, CardSerializer, DashboardColumnSerializer, UserSerializer
from .models import ToDoItem, DashboardColumn, Board, Member
from rest_framework import generics
from rest_framework import renderers


class BoardList(generics.ListCreateAPIView):
   queryset = Board.objects.all()
   serializer_class = BoardSerializer


class BoardDetail(generics.RetrieveUpdateDestroyAPIView):
   queryset = Board.objects.all()
   serializer_class = BoardSerializer


class CardList(generics.ListCreateAPIView):
   queryset = ToDoItem.objects.all()
   serializer_class = CardSerializer


class CardDetail(generics.RetrieveUpdateDestroyAPIView):
   queryset = ToDoItem.objects.all()
   serializer_class = CardSerializer


class ColumnList(generics.ListAPIView):
   queryset = DashboardColumn.objects.all()
   serializer_class = DashboardColumnSerializer


class ColumnDetail(generics.RetrieveUpdateDestroyAPIView):
   queryset = DashboardColumn.objects.all()
   serializer_class = DashboardColumnSerializer


class MemberList(generics.ListAPIView):
   queryset = Member.objects.all()
   serializer_class = UserSerializer   


class MemberDetail(generics.RetrieveUpdateDestroyAPIView):
   queryset = Member.objects.all()
   serializer_class = UserSerializer

# def index(request):
#    all_cards = ToDoItem.objects.all()
#    all_lists = DashboardColumn.objects.all()
#    all_boards = Board.objects.all()
#    template = loader.get_template("landingPage.html")
#    context = {
#       'all_cards': all_cards,
#       'all_lists': all_lists,
#       'all_boards': all_boards,
#    }
#    return HttpResponse(template.render(context, request))

# @api_view(['GET', 'POST'])
# def board_list(request, format=None):
#     """
#     List all boards, or create a new board.
#     """
#     if request.method == 'GET':
#         boards = Board.objects.all()
#         serializer = BoardSerializer(boards, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = BoardSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET', 'PUT', 'DELETE', 'POST'])
# def board_detail(request, pk, format=None):
#     """
#    Retrieve, update or delete a board.
#    """
#     try:
#         board = Board.objects.get(pk=pk)
#     except Board.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = BoardSerializer(board)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = BoardSerializer(board, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         board.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


# @api_view(['GET', 'PUT', 'DELETE', 'POST'])
# def card_list(request, format=None):
#     """
#     List all cards, or create a new board.
#     """
#     if request.method == 'GET':
#         cards = ToDoItem.objects.all()
#         serializer = CardSerializer(cards, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = CardSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET', 'PUT', 'DELETE', 'POST'])
# def card_detail(request, pk, format=None):
#     """
#     Retrieve, update or delete a card
#     """
#     try:
#         card = ToDoItem.objects.get(pk=pk)
#     except ToDoItem.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = BoardSerializer(card)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = BoardSerializer(card, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         card.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

