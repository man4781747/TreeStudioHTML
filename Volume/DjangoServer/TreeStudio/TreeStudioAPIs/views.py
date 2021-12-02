from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
from .models import AnnouncementList

import uuid
import json
import os
import csv
import datetime

# class AnnouncementFileCtrl:
#     def __init__(self):
#         self.fieldnames = ['uuid', 'who', 'date', 'title', 'content', 'createTime', 'lastEditTime']
#         self.S_announcementsFolder = os.path.join(os.path.split(os.path.realpath(__file__))[0], 'Announcement')
#         print(os.path.exists(self.S_announcementsFolder))
#         if not os.path.exists(self.S_announcementsFolder):
#             os.makedirs(self.S_announcementsFolder)
#         self.S_announcementsFilePath = os.path.join(self.S_announcementsFolder, 'Announcement.csv')
#         if not os.path.exists(self.S_announcementsFilePath):
#             with open(self.S_announcementsFilePath, 'w', newline='', encoding='utf-8') as csvfile:
#                 writer = csv.writer(csvfile)
#                 writer.writerow(self.fieldnames)
#         self.reloadCSVContent()

#     def reloadCSVContent(self):
#         self.csvList = []
#         with open(self.S_announcementsFilePath, 'r', newline='', encoding='utf-8') as csvfile:
#             rows = csv.DictReader(csvfile)
#             for row in rows:
#                 self.csvList.append(row)
#         return rows

#     def addNewCol(self, D_colInfo):
#         DT_now = datetime.datetime.now()
#         DT_now_str = DT_now.strftime('%Y-%m-%d %H:%M:%S')
#         D_colInfo['uuid'] = uuid.uuid1()
#         D_colInfo['createTime'] = DT_now_str
#         D_colInfo['lastEditTime'] = DT_now_str
#         try:
#             with open(self.S_announcementsFilePath, 'a', newline='', encoding='utf-8') as csvfile:
#                 writer = csv.DictWriter(csvfile, fieldnames=self.fieldnames)
#                 writer.writerow(D_colInfo)
#                 self.csvList.append(D_colInfo)
#             return {'result': 'success', 'message':''}
#         except Exception as e:
#             return {'result': 'fail', 'message':str(e)}
    
# #123
# AnnouncementFile = AnnouncementFileCtrl()

# Create your views here.
@csrf_protect
def mainHTML(request):
    return render(request, 'TreeStudio_mainHTML.html')


def Test_hive_table_status(request):
    import random
    import datetime
    L_returnList = []
    for i in range(100):
        I_random = random.random()
        D_returnItem = {}
        DT_now = datetime.datetime.now()
        D_returnItem["end_time"] = (DT_now-datetime.timedelta(days=int(I_random*100))).strftime("%Y/%m/%d %H:%M:%S")
        D_returnItem["etl_freq"] = "兩週"
        D_returnItem["init_updatetime"] = (DT_now-datetime.timedelta(days=int(I_random*200))).strftime("%Y-%m-%d")
        D_returnItem["latest_updatetime"] = (DT_now-datetime.timedelta(days=int(I_random*90))).strftime("%Y/%m/%d %H:%M:%S")
        D_returnItem["resource_database"] = "Test-{}".format(i)
        D_returnItem["start_time"] = (DT_now-datetime.timedelta(days=int(I_random*150))).strftime("%Y/%m/%d")
        
        D_returnItem["table_name"] = "table_name-{}".format(i)

        if random.random() < 0.9:
            D_returnItem["table_name_ch"] = "中文名稱-{}".format(i)
        else:
            D_returnItem["table_name_ch"] = "NULL"

        if random.random() < 0.6:
            D_returnItem["table_status"] = "正常"
        else:
            D_returnItem["table_status"] = "異常"

        L_returnList.append(D_returnItem)

    return JsonResponse(L_returnList, safe=False)

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
            data=AnnouncementList.objects.order_by('-created')
            if len(data) > 10:
                data = data[:10]

            returnList = [data[i].to_dict() for i in range(len(data))]
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