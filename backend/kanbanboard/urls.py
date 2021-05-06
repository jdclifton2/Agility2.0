from kanbanboard.api import BoardViewSet, CardViewSet, UserViewSet, ColumnViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api/boards', BoardViewSet, 'boards')
router.register('api/cards', CardViewSet, 'cards')
router.register('api/users', UserViewSet, 'users')
router.register('api/columns', ColumnViewSet, 'columns')


urlpatterns = router.urls