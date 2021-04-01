from django.urls import path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from kanbanboard.api import BoardViewSet, CardViewSet, UserViewSet, ColumnViewSet

board_list = BoardViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

board_detail = BoardViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})


card_list = CardViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

card_detail = CardViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

column_list = ColumnViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

column_detail = ColumnViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})


user_list = UserViewSet.as_view({
    'get': 'list'
})

user_detail = UserViewSet.as_view({
    'get': 'retrieve'
})

router = routers.DefaultRouter()
router.register('api/boards', BoardViewSet, 'boards')
router.register('api/cards', CardViewSet, 'cards')
router.register('api/users', UserViewSet, 'users')
router.register('api/columns', ColumnViewSet, 'columns')


urlpatterns = router.urls
