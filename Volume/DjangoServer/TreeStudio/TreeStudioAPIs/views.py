from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
from .models import AnnouncementList, OrderSys_ShopsInfo, OrderSys_OrderInfo, OrderSys_ShopCartInfo, OrderSys_Message

import uuid
import json
import os
import csv
import datetime

# 非API區塊

def deleteShopInfoByShopID(shop_id):
    # 刪除商店資訊，必須連對應的團訂單一起"標記為"刪除
    ShopsInfo = OrderSys_ShopsInfo.objects.get(shop_id=shop_id)
    L_All_OrderInfo_By_ShopID = OrderSys_OrderInfo.objects.filter(shop_id=shop_id)
    print(L_All_OrderInfo_By_ShopID)
    for OrderInfo in L_All_OrderInfo_By_ShopID:
        deleteOrderInfoByOrderID(OrderInfo.to_dict()['order_id'])

    print('Del shop: {}'.format(shop_id))
    # ShopsInfo.delete()
    ShopsInfo.is_delete = True
    ShopsInfo.save()

def deleteOrderInfoByOrderID(order_id):
    # 刪除團單，必須連購物車單一起"標記為"刪除
    OrderInfo = OrderSys_OrderInfo.objects.get(order_id=order_id)
    deleteAllShopCartByOrderID(order_id)
    print('Del order: {}'.format(order_id))
    # OrderInfo.delete()
    OrderInfo.is_delete = True
    OrderInfo.save()

def deleteAllShopCartByOrderID(order_id):
    L_All_ShopCart_By_OrderID = OrderSys_ShopCartInfo.objects.filter(order_id=order_id)
    for ShopCart in L_All_ShopCart_By_OrderID:
        print('Del shop cart: {}'.format(ShopCart.to_dict()['shop_cart_id']))
        # ShopCart.delete()
        ShopCart.is_delete = True
        ShopCart.save()


# API區塊

@csrf_protect
def mainHTML(request):
    return render(request, 'TreeStudio_mainHTML.html')


# 公告系統區塊
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


# 點餐系統區塊
@csrf_protect
def OrderSys_ShopInfo_Manager(request, shop_id=None, id=None):
    try:
        if request.method == 'POST':
            if shop_id == None:
                OrderSys_ShopsInfo.objects.create(
                    shop_id = request.POST.dict()['shop_id'],
                    shop_type = request.POST.dict()['shop_type'],
                    shop_name = request.POST.dict()['shop_name'],
                    shop_score = float(request.POST.dict()['shop_score']),
                    shop_phoneNum = request.POST.dict()['shop_phoneNum'],
                    shop_address = request.POST.dict()['shop_address'],
                    shop_description = request.POST.dict()['shop_description'],
                    shop_menu = request.POST.dict()['shop_menu'],     
                    shop_picture = request.POST.dict()['shop_picture'],     
                )
                return JsonResponse({'result': 'success', 'data': {'message': '新增成功'}})
            else:
                dataGet = OrderSys_ShopsInfo.objects.get(shop_id=shop_id)
                dataGet.shop_type = request.POST.dict()['shop_type']
                dataGet.shop_name = request.POST.dict()['shop_name']
                dataGet.shop_score = float(request.POST.dict()['shop_score'])
                dataGet.shop_phoneNum = request.POST.dict()['shop_phoneNum']
                dataGet.shop_address = request.POST.dict()['shop_address']
                dataGet.shop_menu = request.POST.dict()['shop_menu'] 
                dataGet.shop_description = request.POST.dict()['shop_description'] 
                dataGet.shop_picture = request.POST.dict()['shop_picture'] 
                dataGet.last_modify_date = datetime.datetime.now()
                dataGet.save()
                return JsonResponse({'result': 'success', 'data': {'message': '更新成功'}})
    
        elif request.method == 'GET':
            if id != None:
                instance = OrderSys_ShopsInfo.objects.get(id=id)
                instance.delete()
                return JsonResponse({'result': 'success', 'data':{}})

            if shop_id != None:
                data=OrderSys_ShopsInfo.objects.get(shop_id=shop_id)
                return JsonResponse({'result': 'success', 'data':data.to_dict()})
            else:
                # 若不指定 shop_id 則指回傳最低需求的數據
                data=OrderSys_ShopsInfo.objects.order_by('-created').values(
                    'id',
                    # 'created',
                    'shop_id',
                    'shop_type',
                    'shop_name',
                    'shop_score',
                    # 'shop_phoneNum',
                    # 'shop_address',
                    # 'shop_menu',
                    'shop_description',
                    # 'shop_picture',
                    # 'last_modify_date'
                )
                if len(data) > 300:
                    data = data[:300]
                returnList = [data[i] for i in range(len(data))]
                return JsonResponse({'result': 'success', 'data':returnList})


        elif request.method == 'DELETE':
            if shop_id != None:
                deleteShopInfoByShopID(shop_id)
                return JsonResponse({'result': 'success', 'data':''})
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
            if order_id == None:
                OrderSys_OrderInfo.objects.create(
                    order_id = request.POST.dict()['order_id'],
                    owner_name = request.POST.dict()['owner_name'],
                    bank_info = request.POST.dict()['bank_info'],
                    shop_id = request.POST.dict()['shop_id'],
                    order_description =request.POST.dict()['order_description'],
                    bank_info_qr_code = request.POST.dict()['bank_info_qr_code'],
                )
                return JsonResponse({'result': 'success', 'data': {'message': '新增成功'}})
            else:
                dataGet = OrderSys_OrderInfo.objects.get(order_id=request.POST.dict()['order_id'])
                dataGet.owner_name = request.POST.dict()['owner_name']
                dataGet.close_time = request.POST.dict()['close_time']
                dataGet.bank_info = request.POST.dict()['bank_info']
                dataGet.shop_id = request.POST.dict()['shop_id']
                dataGet.alive = request.POST.dict()['alive'] 
                dataGet.last_modify_date = datetime.datetime.now()
                dataGet.save()
                return JsonResponse({'result': 'success', 'data': {'message': '更新成功'}})

        elif request.method == 'GET':
            if id != None:
                instance = OrderSys_OrderInfo.objects.filter(is_delete=False).get(id=id)
                # instance.delete()
                return JsonResponse({'result': 'success', 'data':{}})
            if order_id != None:
                data=OrderSys_OrderInfo.objects.get(order_id=order_id)
                return JsonResponse({'result': 'success', 'data':data.to_dict()})
            else:
                data=OrderSys_OrderInfo.objects.filter(is_delete=False).order_by('-created').values(
                    'id',
                    'created',
                    'order_id',
                    'owner_name',
                    'close_time',
                    'bank_info',
                    'shop_id',
                    'bank_info_qr_code',
                    'order_description',
                    'alive',
                    'last_modify_date'
                )
                if len(data) > 300:
                    data = data[:300]
                returnList = [data[i] for i in range(len(data))]
                return JsonResponse({'result': 'success', 'data':returnList})

        elif request.method == 'DELETE':
            if order_id != None:
                deleteOrderInfoByOrderID(order_id)
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
            orderListData = OrderSys_OrderInfo.objects.filter(
                created__range=[datetime.datetime.now().date(),datetime.datetime(3000,1,1)]
                ).filter(is_delete=False)
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
            if bool(switch) == False:
                dataGet.close_time = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S+08:00")
            else:
                dataGet.close_time = ""
            dataGet.save()
            return JsonResponse({'result': 'success', 'data': {
                order_id: order_id,
                switch: bool(switch)
            }})
        else:
            return JsonResponse({'result': 'fail', 'date': {'message': '不正確的HTTP請求method'}})

    except Exception as e:
        return JsonResponse({'result': 'fail', 'data': {'message': str(e)}})

def Get_OrderInfo_By_Time_Range(request, time_range=None):
    # 訂餐列表視窗所用
    try:
        if request.method == 'GET':
            if time_range  == None:
                start = datetime.datetime(1990,1,1)
                end = datetime.datetime(3000,1,1)
            else:
                L_timeRange = time_range.split('to')
                start = datetime.datetime.strptime(L_timeRange[0], "%Y-%m-%d")
                end = datetime.datetime.strptime(L_timeRange[1], "%Y-%m-%d") + datetime.timedelta(days=1)


            orderListData = OrderSys_OrderInfo.objects.filter(
                created__range=[
                    start,
                    end
                ]
            ).filter(is_delete=False).order_by('-created').values(
                    'id',
                    'created',
                    'alive',
                    'owner_name',
                    'shop_id',
                    'close_time',
                    'order_id',
            )

            orderList = {}
            for orderData in orderListData:
                D_orderInfo = {}
                try:
                    shopInfo = OrderSys_ShopsInfo.objects.get(shop_id=orderData['shop_id']).to_dict()
                    orderData['shop_name'] = shopInfo['shop_name']
                    orderData['shop_type'] = shopInfo['shop_type']
                    orderData['shop_score'] = shopInfo['shop_score']
                    orderList[orderData['order_id']] = orderData
                except:
                    orderData['shop_name'] = "遺失"
                    orderData['shop_type'] = "遺失"
                    orderData['shop_score'] = -1
                    orderList[orderData['order_id']] = orderData


            return JsonResponse({'result': 'success', 'data':orderList})
        else:
            return JsonResponse({'result': 'fail', 'date': {'message': '不正確的HTTP請求method'}})
    except Exception as e:
        return JsonResponse({'result': 'fail', 'data': {'message': str(e)}})

def Get_Today_OrderInfo(request):
    # 今日訂餐列表 (包含今日訂單(不管有無結單) + 過去還沒結單項目)
    try:
        if request.method == 'GET':
            orderListData_Today = OrderSys_OrderInfo.objects.filter(
                created__range=[
                    datetime.date.today(),
                    datetime.date.today() + datetime.timedelta(days=1)
                ]
            ).filter(is_delete=False).order_by('-created').values(
                    'order_id',
                    'id',
                    'alive',
                    'owner_name',
                    'created',
                    'close_time',
                    'shop_id',
            )

            L_orderList = []
            for orderData in orderListData_Today:
                try:
                    shopInfo = OrderSys_ShopsInfo.objects.get(shop_id=orderData['shop_id']).to_dict()
                    orderData['shop_name'] = shopInfo['shop_name']
                    orderData['shop_type'] = shopInfo['shop_type']
                    orderData['shop_score'] = shopInfo['shop_score']
                except:
                    orderData['shop_name'] = "遺失"
                    orderData['shop_type'] = "遺失"
                    orderData['shop_score'] = -1
                L_orderList.append(orderData)

            orderListData_notAlive = OrderSys_OrderInfo.objects.filter(
                created__range=[
                    datetime.date(1990,1,1),
                    datetime.date.today()
                ]
            ).filter(is_delete=False).filter(alive=True).order_by('-created').values(
                    'order_id',
                    'id',
                    'alive',
                    'owner_name',
                    'created',
                    'close_time',
                    'shop_id',
            )
            for orderData in orderListData_notAlive:
                try:
                    shopInfo = OrderSys_ShopsInfo.objects.get(shop_id=orderData['shop_id']).to_dict()
                    orderData['shop_name'] = shopInfo['shop_name']
                    orderData['shop_type'] = shopInfo['shop_type']
                    orderData['shop_score'] = shopInfo['shop_score']
                except:
                    orderData['shop_name'] = "遺失"
                    orderData['shop_type'] = "遺失"
                    orderData['shop_score'] = -1
                L_orderList.append(orderData)


            return JsonResponse({'result': 'success', 'data':L_orderList})
        else:
            return JsonResponse({'result': 'fail', 'date': {'message': '不正確的HTTP請求method'}})
    except Exception as e:
        return JsonResponse({'result': 'fail', 'data': {'message': str(e)}})

# def Close_Order_By_Order_Id(request, order_id,):


@csrf_protect
def OrderSys_ShopCart_Manager(request, shop_cart_id=None, id=None, order_id=None, item_index=None):
    try:
        if request.method == 'POST':
            if shop_cart_id != None:
                if item_index != None:
                    shopCartItem=OrderSys_ShopCartInfo.objects.filter(
                        shop_cart_id=shop_cart_id).get(item_index=item_index)
                    if request.POST.dict().get('pay', None) != None:
                        if request.POST.dict()['pay'] == 'true':
                            shopCartItem.pay = True
                        else:
                            shopCartItem.pay = False
                        shopCartItem.save()
                        return JsonResponse({'result': 'success', 'data': {'message': '更新成功'}})
                    return JsonResponse({'result': 'fail', 'data': {'message': '缺少參數 pay'}})
            else:
                # 檢查訂單是否已結單
                L_shopCartList = json.loads(request.POST.dict()['shop_cart_data'])
                order_id = L_shopCartList[0]['order_id']
                orderInfo = OrderSys_OrderInfo.objects.get(order_id=order_id).to_dict()
                if orderInfo['alive'] == False:
                    return JsonResponse({'result': 'fail', 'data': {'message': '訂單已結單，不可再新增訂單'}})
                elif orderInfo['is_delete'] == True:
                    return JsonResponse({'result': 'fail', 'data': {'message': '訂單已被刪除，不可再新增訂單'}})

                S_shop_cart_id = request.POST.dict()['shop_cart_id']
                S_shopper_name = request.POST.dict()['shopper_name']
                for item_index,shopCartItem in enumerate(L_shopCartList):
                    OrderSys_ShopCartInfo.objects.create(
                        shop_cart_id = S_shop_cart_id,
                        shopper_name = S_shopper_name,
                        order_id = shopCartItem['order_id'],
                        item_name = shopCartItem['name'],
                        item_number = int(shopCartItem['number']),
                        item_price = int(shopCartItem['price']),
                        item_content = shopCartItem['content'],
                        item_index = item_index,
                    )
                return JsonResponse({'result': 'success', 'data': {'message': '新增成功'}})

            
        elif request.method == 'GET':
            if id != None:
                instance = OrderSys_ShopCartInfo.objects.get(id=id)
                print(instance.to_dict())
                instance.delete()
                return JsonResponse({'result': 'success', 'data':{}})
            elif shop_cart_id != None:
                if item_index != None:
                    data=OrderSys_ShopCartInfo.objects.filter(
                        shop_cart_id=shop_cart_id).get(item_index=item_index)
                    
                    return JsonResponse({'result': 'success', 'data':data.to_dict()})
                else:
                    L_data=OrderSys_ShopCartInfo.objects.filter(shop_cart_id=shop_cart_id).filter(is_delete=False)
                    returnData = [data.to_dict() for data in L_data]
                    return JsonResponse({'result': 'success', 'data':returnData})
            elif order_id != None:
                print(order_id)
                L_All_ShopCart_By_OrderID = OrderSys_ShopCartInfo.objects.filter(order_id=order_id).filter(is_delete=False)
                print(L_All_ShopCart_By_OrderID)
                returnList = [L_All_ShopCart_By_OrderID[i].to_dict() for i in range(len(L_All_ShopCart_By_OrderID))]
                return JsonResponse({'result': 'success', 'data': returnList})
            else:
                data=OrderSys_ShopCartInfo.objects.filter(is_delete=False).order_by('-created').values(
                    'id',
                    'created',
                    'shop_cart_id',
                    'order_id',
                    'shopper_name',
                    'item_name',
                    'item_number',
                    'item_price',
                    'item_content',
                    'item_index',
                    'pay',
                    'last_modify_date'
                )
                if len(data) > 300:
                    data = data[:300]
                returnList = [data[i] for i in range(len(data))]
                return JsonResponse({'result': 'success', 'data':returnList})

        elif request.method == 'DELETE':
            if shop_cart_id != None:
                if item_index != None:
                    data=OrderSys_ShopCartInfo.objects.filter(
                        shop_cart_id=shop_cart_id).get(item_index=item_index)
                    data.is_delete = True
                    data.save()
                    return JsonResponse({'result': 'success', 'data':''})
                else:
                    L_ShopCartInfo = OrderSys_ShopCartInfo.objects.filter(shop_cart_id=shop_cart_id)
                    for ShopCartInfo in L_ShopCartInfo:
                        ShopCartInfo.is_delete = True
                        ShopCartInfo.save()
                    return JsonResponse({'result': 'success', 'data':''})
            elif order_id != None:
                L_All_ShopCart_By_OrderID = OrderSys_ShopCartInfo.objects.filter(order_id=order_id)
                for data in L_All_ShopCart_By_OrderID:
                    data.is_delete = True
                    data.save()
                return JsonResponse({'result': 'success', 'data':''})
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

@csrf_protect
def OrderSys_Message_Manager(request, shop_id=None, id=None, message_id=None, last_num=300):
    try:
        if request.method == 'POST':
            try:
                dataGet = OrderSys_Message.objects.get(message_id=request.POST.dict()['message_id'])
                dataGet.who = request.POST.dict()['who']
                dataGet.title = request.POST.dict()['title']
                dataGet.content = request.POST.dict()['content']
                dataGet.score = int(request.POST.dict()['score'])
                dataGet.last_modify_date = datetime.datetime.now()
                dataGet.save()
                return JsonResponse({'result': 'success', 'data': {'message': '更新成功'}})
            except:
                OrderSys_Message.objects.create(
                    message_id = request.POST.dict()['message_id'],
                    shop_id = request.POST.dict()['shop_id'],
                    who = request.POST.dict()['who'],
                    title = request.POST.dict()['title'],
                    content = request.POST.dict()['content'],
                    score = int(request.POST.dict()['score']),
                )
                return JsonResponse({'result': 'success', 'data': {'message': '新增成功'}})

        elif request.method == 'GET':
            if id != None:
                instance = OrderSys_Message.objects.get(id=id)
                instance.delete()
                return JsonResponse({'result': 'success', 'data':{}})
            elif shop_id != None:
                print(shop_id, last_num)
                L_data=OrderSys_Message.objects.filter(shop_id=shop_id).order_by('-created').values(
                    'id',
                    'created',
                    'message_id',
                    'shop_id',
                    'who',
                    'title',
                    'score',
                    'last_modify_date'
                )[:last_num]
                returnData = [data for data in L_data]
                return JsonResponse({'result': 'success', 'data':returnData})
            elif message_id != None:
                Message_data=OrderSys_Message.objects.get(message_id=message_id)
                return JsonResponse({'result': 'success', 'data':Message_data.to_dict()})
            else:
                data=OrderSys_Message.objects.order_by('-created').values(
                    'id',
                    'created',
                    'message_id',
                    'shop_id',
                    'who',
                    'title',
                    'content',
                    'score',
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
