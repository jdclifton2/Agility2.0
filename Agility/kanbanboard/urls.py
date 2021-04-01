from django.urls import path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from kanbanboard.api import BoardViewSet, CardViewSet, UserViewSet, ColumnViewSet

router = routers.DefaultRouter()
router.register('api/boards', BoardViewSet, 'boards')
router.register('api/cards', CardViewSet, 'cards')
router.register('api/users/', UserViewSet, 'users')
router.register('api/columns', ColumnViewSet, 'columns')


urlpatterns = router.urls
