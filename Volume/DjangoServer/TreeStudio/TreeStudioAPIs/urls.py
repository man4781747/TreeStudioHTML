# from django.conf.urls import url
from django.urls import include, path
from . import views

urlpatterns = [
    path(r'mainHTML/', views.mainHTML),
    path(r'Announcement_Manager/<id>/', views.Announcement_Manager),
    path(r'Announcement_Manager/', views.Announcement_Manager),
    path(r'Get_Last_Ten_Announcement_List/', views.Get_Last_Ten_Announcement_List),
    path(r'Update_Announcement/', views.Update_Announcement),

    path(r'OrderSys_ShopInfo_Manager/<shop_id>/', views.OrderSys_ShopInfo_Manager),
    path(r'OrderSys_ShopInfo_Manager/delete_By_ID/<id>/', views.OrderSys_ShopInfo_Manager),
    path(r'OrderSys_ShopInfo_Manager/', views.OrderSys_ShopInfo_Manager),
    path(r'Get_OrderInfo_By_Time_Range/<time_range>/', views.Get_OrderInfo_By_Time_Range),
    path(r'Get_OrderInfo_By_Time_Range/', views.Get_OrderInfo_By_Time_Range),

    path(r'OrderSys_OrderInfo_Manager_GetAlive/', views.OrderSys_OrderInfo_Manager_GetAlive),
    path(r'OrderSys_OrderInfo_Manager_GetTodayOrder/', views.OrderSys_OrderInfo_Manager_GetTodayOrder),
    path(r'OrderSys_OrderInfo_Manager/<order_id>/', views.OrderSys_OrderInfo_Manager),
    path(r'OrderSys_OrderInfo_Manager/delete_By_ID/<id>/', views.OrderSys_OrderInfo_Manager),
    path(r'OrderSys_OrderInfo_Manager/', views.OrderSys_OrderInfo_Manager),
    path(r'OrderSys_OrderInfo_Manager_Switch_By_Order_Id/<order_id>/<int:switch>/', views.OrderSys_OrderInfo_Manager_Switch_By_Order_Id),


    path(r'OrderSys_ShopCart_Manager/<shop_cart_id>/', views.OrderSys_ShopCart_Manager),
    path(r'OrderSys_ShopCart_Manager/delete_By_ID/<id>/', views.OrderSys_ShopCart_Manager),
    path(r'OrderSys_ShopCart_Manager/', views.OrderSys_ShopCart_Manager),
    path(r'Get_All_ShopCart_By_OrderID/<order_id>/', views.Get_All_ShopCart_By_OrderID),
    path(r'Del_All_ShopCart_By_OrderID/<order_id>/', views.OrderSys_ShopCart_Manager),

    path(r'OrderSys_Message_Manager/', views.OrderSys_Message_Manager),
    path(r'OrderSys_Message_Manager/shop/<shop_id>/<int:last_num>/', views.OrderSys_Message_Manager),
    path(r'OrderSys_Message_Manager/shop/<shop_id>/', views.OrderSys_Message_Manager),
    path(r'OrderSys_Message_Manager/message/<message_id>/', views.OrderSys_Message_Manager),
    path(r'OrderSys_Message_Manager/id/<id>/', views.OrderSys_Message_Manager),
    
]

