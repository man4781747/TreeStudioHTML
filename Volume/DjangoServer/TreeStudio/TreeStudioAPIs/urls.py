from django.conf.urls import url
from django.urls import include, path
from . import views

urlpatterns = [
    path(r'mainHTML/', views.mainHTML),
    path(r'Test_hive_table_status_URL/', views.Test_hive_table_status),
    path(r'Announcement_Manager/<id>/', views.Announcement_Manager),
    path(r'Announcement_Manager/', views.Announcement_Manager),
    path(r'Get_Last_Ten_Announcement_List/', views.Get_Last_Ten_Announcement_List),
    path(r'Update_Announcement/', views.Update_Announcement),
]
