from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
from .models import AnnouncementList

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