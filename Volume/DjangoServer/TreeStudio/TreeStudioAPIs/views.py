from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
from .models import AnnouncementList, OrderSys_ShopsInfo, OrderSys_OrderInfo, OrderSys_ShopCartInfo

import uuid
import json
import os
import csv
import datetime


@csrf_protect
def mainHTML(request):
    return render(request, 'TreeStudio_mainHTML.html')

@csrf_protect
def Announcement_Manager(request, id=None):
    try:
        if request.method == 'POST':
            # D_result = AnnouncementFile.addNewCol(request.POST.dict())
            AnnouncementList.objects.create(
                who=request.POST.dict()['who'],
                title=request.POST.dict()['title'],
                content=request.POST.dict()['content'],
            )
            return JsonResponse({'result': 'success', 'data': {}})
        elif request.method == 'GET':
            if id != None:
                data=AnnouncementList.objects.get(id=id)
                return JsonResponse({'result': 'success', 'data':data.to_dict()})
            else:
                data=AnnouncementList.objects.order_by('-created').values('id','created','who','title','last_modify_date')
                if len(data) > 300:
                    data = data[:300]
                returnList = [data[i] for i in range(len(data))]
                return JsonResponse({'result': 'success', 'data':returnList})


        elif request.method == 'DELETE':
            if id != None:
                instance = AnnouncementList.objects.get(id=id)
                instance.delete()
            return JsonResponse({'result': 'success', 'data':{}})
        else:
            return JsonResponse({'result': 'fail', 'date': {'message': '不正確的HTTP請求method'}})

    except Exception as e:
        return JsonResponse({'result': 'fail', 'data': {'message': str(e)}})

@csrf_protect
def Get_Last_Ten_Announcement_List(request):
    try:
        if request.method == 'GET':
            data=AnnouncementList.objects.order_by('-created').values('id','created','title')
            if len(data) > 10:
                data = data[:10]

            returnList = [data[i]for i in range(len(data))]
            return JsonResponse({'result': 'success', 'data':returnList})
        else:
            return JsonResponse({'result': 'fail', 'date': {'message': '不正確的HTTP請求method'}})
    except Exception as e:
        return JsonResponse({'result': 'fail', 'date': {'message': str(e)}})

@csrf_protect
def Update_Announcement(request):
    if request.method == 'POST':
        try:
            D_updateData = request.POST.dict()
            _t = AnnouncementList.objects.get(id=D_updateData['id'])
            _t.who = D_updateData['who']
            _t.title = D_updateData['title']
            _t.content = D_updateData['content']
            _t.last_modify_date = datetime.datetime.now()
            _t.save()
            return JsonResponse({'result': 'success', 'data': {}})
        except Exception as e:
            return JsonResponse({'result': 'fail', 'data': {'message': str(e)}})
    else:
        return JsonResponse({'result': 'fail', 'date': {'message': '不正確的HTTP請求method'}})


@csrf_protect
def OrderSys_ShopInfo_Manager(request, shop_id=None, id=None):
    try:
        if request.method == 'POST':
            try:
                dataGet = OrderSys_ShopsInfo.objects.get(shop_id=request.POST.dict()['shop_id'])
                dataGet.shop_type = request.POST.dict()['shop_type']
                dataGet.shop_name = request.POST.dict()['shop_name']
                dataGet.shop_score = float(request.POST.dict()['shop_score'])
                dataGet.shop_phoneNum = request.POST.dict()['shop_phoneNum']
                dataGet.shop_address = request.POST.dict()['shop_address']
                dataGet.shop_menu = request.POST.dict()['shop_menu'] 
                dataGet.last_modify_date = datetime.datetime.now()
                dataGet.save()
                return JsonResponse({'result': 'success', 'data': {'message': '更新成功'}})
            except:
                OrderSys_ShopsInfo.objects.create(
                    shop_id = request.POST.dict()['shop_id'],
                    shop_type = request.POST.dict()['shop_type'],
                    shop_name = request.POST.dict()['shop_name'],
                    shop_score = float(request.POST.dict()['shop_score']),
                    shop_phoneNum = request.POST.dict()['shop_phoneNum'],
                    shop_address = request.POST.dict()['shop_address'],
                    shop_menu = request.POST.dict()['shop_menu'],     
                )
                return JsonResponse({'result': 'success', 'data': {'message': '新增成功'}})
            
        elif request.method == 'GET':
            if id != None:
                instance = OrderSys_ShopsInfo.objects.get(id=id)
                instance.delete()
                return JsonResponse({'result': 'success', 'data':{}})

            if shop_id != None:
                data=OrderSys_ShopsInfo.objects.get(shop_id=shop_id)
                return JsonResponse({'result': 'success', 'data':data.to_dict()})
            else:
                data=OrderSys_ShopsInfo.objects.order_by('-created').values(
                    'id',
                    'created',
                    'shop_id',
                    'shop_type',
                    'shop_name',
                    'shop_score',
                    'shop_phoneNum',
                    'shop_address',
                    'shop_menu',
                    'last_modify_date'
                )
                if len(data) > 300:
                    data = data[:300]
                returnList = [data[i] for i in range(len(data))]
                return JsonResponse({'result': 'success', 'data':returnList})


        elif request.method == 'DELETE':
            if shop_id != None:
                instance = OrderSys_ShopsInfo.objects.get(shop_id=shop_id)
                instance.delete()
                return JsonResponse({'result': 'success', 'data':{}})
            else:
                return JsonResponse({'result': 'fail', 'data':{'message': '缺少參數: shop_id'}})
        else:
            return JsonResponse({'result': 'fail', 'date': {'message': '不正確的HTTP請求method'}})

    except Exception as e:
        return JsonResponse({'result': 'fail', 'data': {'message': str(e)}})

@csrf_protect
def OrderSys_OrderInfo_Manager(request, order_id=None, id=None):
    try:
        if request.method == 'POST':
            try:
                dataGet = OrderSys_OrderInfo.objects.get(order_id=request.POST.dict()['order_id'])
                dataGet.owner_name = request.POST.dict()['owner_name']
                dataGet.close_time = request.POST.dict()['close_time']
                dataGet.bank_info = request.POST.dict()['bank_info']
                dataGet.shop_id = request.POST.dict()['shop_id']
                dataGet.alive = request.POST.dict()['alive'] 
                dataGet.last_modify_date = datetime.datetime.now()
                dataGet.save()
                return JsonResponse({'result': 'success', 'data': {'message': '更新成功'}})
            except:
                OrderSys_OrderInfo.objects.create(
                    order_id = request.POST.dict()['order_id'],
                    owner_name = request.POST.dict()['owner_name'],
                    close_time = request.POST.dict()['close_time'],
                    bank_info = request.POST.dict()['bank_info'],
                    shop_id = request.POST.dict()['shop_id'],
                )
                return JsonResponse({'result': 'success', 'data': {'message': '新增成功'}})
            
        elif request.method == 'GET':
            if id != None:
                instance = OrderSys_OrderInfo.objects.get(id=id)
                instance.delete()
                return JsonResponse({'result': 'success', 'data':{}})
            if order_id != None:
                data=OrderSys_OrderInfo.objects.get(order_id=order_id)
                return JsonResponse({'result': 'success', 'data':data.to_dict()})
            else:
                data=OrderSys_OrderInfo.objects.order_by('-created').values(
                    'id',
                    'created',
                    'order_id',
                    'owner_name',
                    'close_time',
                    'bank_info',
                    'shop_id',
                    'alive',
                    'last_modify_date'
                )
                if len(data) > 300:
                    data = data[:300]
                returnList = [data[i] for i in range(len(data))]
                return JsonResponse({'result': 'success', 'data':returnList})

        elif request.method == 'DELETE':
            if order_id != None:
                instance = OrderSys_OrderInfo.objects.get(order_id=order_id)
                instance.delete()
                return JsonResponse({'result': 'success', 'data':{}})
            else:
                return JsonResponse({'result': 'fail', 'data':{'message': '缺少參數: order_id'}})
        
        else:
            return JsonResponse({'result': 'fail', 'date': {'message': '不正確的HTTP請求method'}})

    except Exception as e:
        return JsonResponse({'result': 'fail', 'data': {'message': str(e)}})

def OrderSys_OrderInfo_Manager_GetAlive(request):
    try:
        if request.method == 'GET':
            data = OrderSys_OrderInfo.objects.filter(alive=True)
            returnList = [data[i].to_dict() for i in range(len(data))]
            return JsonResponse({'result': 'success', 'data':returnList})
        else:
            return JsonResponse({'result': 'fail', 'date': {'message': '不正確的HTTP請求method'}})

    except Exception as e:
        return JsonResponse({'result': 'fail', 'data': {'message': str(e)}})

def OrderSys_OrderInfo_Manager_GetTodayOrder(request):
    try:
        if request.method == 'GET':
            orderListData = OrderSys_OrderInfo.objects.filter(created__range=[datetime.datetime.now().date(),datetime.datetime(3000,1,1)])
            orderList = {}
            for orderData in orderListData:
                D_orderInfo = {}
                orderData = orderData.to_dict()
                D_orderInfo['owner_name'] = orderData['owner_name']
                D_orderInfo['created'] = orderData['created']
                D_orderInfo['close_time'] = orderData['close_time']
                D_orderInfo['alive'] = orderData['alive']
                D_orderInfo['shop_id'] = orderData['shop_id']
                D_orderInfo['order_id'] = orderData['order_id']
                
                shopInfo = OrderSys_ShopsInfo.objects.get(shop_id=orderData['shop_id']).to_dict()
                D_orderInfo['shop_name'] = shopInfo['shop_name']
                D_orderInfo['shop_type'] = shopInfo['shop_type']
                D_orderInfo['shop_score'] = shopInfo['shop_score']
                
                
                orderList[orderData['order_id']] = D_orderInfo




            return JsonResponse({'result': 'success', 'data':orderList})
        else:
            return JsonResponse({'result': 'fail', 'date': {'message': '不正確的HTTP請求method'}})

    except Exception as e:
        return JsonResponse({'result': 'fail', 'data': {'message': str(e)}})

def OrderSys_OrderInfo_Manager_Switch_By_Order_Id(request, order_id, switch):
    try:
        if switch not in [1,0]:
            return JsonResponse({'result': 'fail', 'date': {'message': '不正確的switch 方式'}})
        if request.method == 'GET':
            dataGet = OrderSys_OrderInfo.objects.get(order_id=order_id)
            dataGet.alive = bool(switch)
            dataGet.save()
            return JsonResponse({'result': 'success', 'data': {
                order_id: order_id,
                switch: bool(switch)
            }})
        else:
            return JsonResponse({'result': 'fail', 'date': {'message': '不正確的HTTP請求method'}})

    except Exception as e:
        return JsonResponse({'result': 'fail', 'data': {'message': str(e)}})

@csrf_protect
def OrderSys_ShopCart_Manager(request, shop_cart_id=None, id=None, order_id=None):
    try:
        if request.method == 'POST':
            if request.POST.dict().get('pay', None) != None:
                S_shop_cart_id = request.POST.dict()['shop_cart_id']
                L_shopCartList = OrderSys_ShopCartInfo.objects.filter(shop_cart_id=S_shop_cart_id)
                for shopCartItem in L_shopCartList:
                    if request.POST.dict()['pay'] == 'true':
                        shopCartItem.pay = True
                    else:
                        shopCartItem.pay = False
                    shopCartItem.save()
                return JsonResponse({'result': 'success', 'data': {'message': '更新成功'}})
            else:
                L_shopCartList = json.loads(request.POST.dict()['shop_cart_data'])
                S_shop_cart_id = request.POST.dict()['shop_cart_id']
                S_shopper_name = request.POST.dict()['shopper_name']
                for shopCartItem in L_shopCartList:
                    OrderSys_ShopCartInfo.objects.create(
                        shop_cart_id = S_shop_cart_id,
                        shopper_name = S_shopper_name,
                        order_id = shopCartItem['order_id'],
                        item_name = shopCartItem['name'],
                        item_number = int(shopCartItem['number']),
                        item_price = int(shopCartItem['price']),
                        item_content = shopCartItem['content'],
                    )
                return JsonResponse({'result': 'success', 'data': {'message': '新增成功'}})
            
        elif request.method == 'GET':
            if id != None:
                instance = OrderSys_ShopCartInfo.objects.get(id=id)
                instance.delete()
                return JsonResponse({'result': 'success', 'data':{}})
            if shop_cart_id != None:
                L_data=OrderSys_ShopCartInfo.objects.filter(shop_cart_id=shop_cart_id)
                returnData = [data.to_dict() for data in L_data]
                return JsonResponse({'result': 'success', 'data':returnData})
            else:
                data=OrderSys_ShopCartInfo.objects.order_by('-created').values(
                    'id',
                    'created',
                    'shop_cart_id',
                    'order_id',
                    'shopper_name',
                    'item_name',
                    'item_number',
                    'item_price',
                    'item_content',
                    'pay',
                    'last_modify_date'
                )
                if len(data) > 300:
                    data = data[:300]
                returnList = [data[i] for i in range(len(data))]
                return JsonResponse({'result': 'success', 'data':returnList})

        elif request.method == 'DELETE':
            if shop_cart_id != None:
                instance = OrderSys_ShopCartInfo.objects.filter(shop_cart_id=shop_cart_id)
                returnData = [data.delete() for data in instance]
                return JsonResponse({'result': 'success', 'data':returnData})
            elif order_id != None:
                L_All_ShopCart_By_OrderID = OrderSys_ShopCartInfo.objects.filter(order_id=order_id)
                L_return = [data.delete() for data in L_All_ShopCart_By_OrderID]
                return JsonResponse({'result': 'success', 'data':L_return})
            else:
                return JsonResponse({'result': 'fail', 'data':{'message': '缺少參數: shop_cart_id'}})
        
        else:
            return JsonResponse({'result': 'fail', 'date': {'message': '不正確的HTTP請求method'}})

    except Exception as e:
        return JsonResponse({'result': 'fail', 'data': {'message': str(e)}})

def Get_All_ShopCart_By_OrderID(request, order_id):
    try:
        if request.method == 'GET':
            L_All_ShopCart_By_OrderID = OrderSys_ShopCartInfo.objects.filter(order_id=order_id)
            returnList = [L_All_ShopCart_By_OrderID[i].to_dict() for i in range(len(L_All_ShopCart_By_OrderID))]

            return JsonResponse({'result': 'success', 'data': returnList})
            
        else:
            return JsonResponse({'result': 'fail', 'date': {'message': '不正確的HTTP請求method'}})

    except Exception as e:
        return JsonResponse({'result': 'fail', 'data': {'message': str(e)}})