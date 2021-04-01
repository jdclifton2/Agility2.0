from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from kanbanboard.views import BoardList, BoardDetail, CardList, ColumnDetail, CardDetail, ColumnList

urlpatterns = [
    path('boards', BoardList.as_view()),
    path('api/cards', CardList.as_view()),
    path('columns/', ColumnList.as_view()),
    #path('/members/', MemberList.as_view()),
    path('boards/<int:pk>', BoardDetail.as_view()),
    path('cards/<int:pk>', CardDetail.as_view()),
    path('columns/<int:pk>', ColumnDetail.as_view()),
    #path('/members/<int:pk>', MemberDetail.as_view()),


    #path('/<int:pk>/highlight', board_highlight.as_view())

]