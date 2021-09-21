from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('kanbanboard.urls')),
    path('api/', include('authentication.urls'))
]

