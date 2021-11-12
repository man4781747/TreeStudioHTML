from django.conf.urls import url
from django.urls import include, path
from . import views

urlpatterns = [
    path(r'mainHTML/', views.mainHTML),
    path(r'Test_hive_table_status_URL/', views.Test_hive_table_status),
]
