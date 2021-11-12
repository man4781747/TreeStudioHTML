from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse

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