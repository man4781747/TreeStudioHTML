// ===== api 說明 =====

//  "port": "8900" (Port號, 8900-8949 用選的，需要先Get做判斷)
//  "user_id": "00865936" ( 一律為原編, 鎖定8碼 )
//  "user_depart": "9h000" (部門代號，只能是9h000, 9h001, 9h002，不能錯，用選的)
//  "user_name": "kp" (專案名稱、部門代號、個人員編，都可以，但有的不能重複，需要先Get做判斷)
//  "user_token": "i9h000" (jupyter密碼，隨意，只能英文數字小寫)
//  "project_name": "common project" (專案說明，隨意)
//  "context": "this is a test" (備註，隨意)
//  "status": "enable" (狀態，只能是 enable, disable，用選的)
//  "spark_name": "master" (名稱，隨意，但不能重複，需要先Get做判斷)
//  "driver_memory": "4" (driver memory 數量，2-32 用選的)
//  "executor_memory": "4" (executor memory, 2-32 用選的)
//  "driver_cores": "2" (driver core 數量, 2-8 用選的)
//  "executor_cores": "2" (executor core 數量, 2-8 用選的)
//  "max_executors": "6" (max executors數量, 2-12 用選的)


// [GET] Jupyter information

// http://88.248.13.77:8950/get_docker_jupyter_service
// http://88.248.13.77:8951/get_docker_jupyter_service
// http://88.248.13.77:8952/get_docker_jupyter_service

// {
//  "context":"this is a test",
//  "create_time":"2021/08/26 16:36:18",
//  "driver_cores":"2",
//  "driver_memory":"4",
//  "executor_cores":"2",
//  "executor_memory":"4",
//  "max_executors":"6",
//  "port":"8900",
//  "project_name":"common project",
//  "spark_name":"master",
//  "status":"enable",
//  "user_depart":"i9h000",
//  "user_id":"00865936",
//  "user_name":"i9h000",
//  "user_token":"i9h000"
// }


// [POST] Running service

// http://88.248.13.77:8950/running_docker_jupyter_service
// http://88.248.13.77:8951/running_docker_jupyter_service
// http://88.248.13.77:8952/running_docker_jupyter_service

// {
//  "port": "8900",
//  "user_id": "00865936", 
//  "user_depart": "i9h000", 
//  "user_name": "i9h000", 
//  "user_token": "i9h000", 
//  "project_name": "common project", 
//  "context": "this is a test", 
//  "status": "enable", 
//  "spark_name": "master", 
//  "driver_memory": "4", 
//  "executor_memory": "4", 
//  "driver_cores": "2", 
//  "executor_cores": "2", 
//  "max_executors": "6"
// }

// [POST] Delete Service

// http://88.248.13.77:8950/close_docker_jupyter_service
// http://88.248.13.77:8951/close_docker_jupyter_service
// http://88.248.13.77:8952/close_docker_jupyter_service

// {
//  "port": "8900", 
//  "user_id": "00000000"
// }


// [POST] Start service

// http://88.248.13.77:8950/start_docker_jupyter_service
// http://88.248.13.77:8951/start_docker_jupyter_service
// http://88.248.13.77:8952/start_docker_jupyter_service

// {
// "port": "8900", 
// "user_id": "000000000",
// "status": "enable"
// }

// [POST] Stop service

// http://88.248.13.77:8950/stop_docker_jupyter_service
// http://88.248.13.77:8951/stop_docker_jupyter_service
// http://88.248.13.77:8952/stop_docker_jupyter_service

// {
// "port": "8900", 
// "user_id": "00000000",
// "status": "disable"
// }

function getPosition (element) {
    var x = 0;
    var y = 0;
    while ( element ) {
      x += element.offsetLeft - element.scrollLeft + element.clientLeft;
      y += element.offsetTop - element.scrollLeft + element.clientTop;
      element = element.offsetParent;
    }
    return { x: x, y: y };
}

var Vue_JupyterWindow =  new Vue({
    el: '#hap-jupyter-window',
    data: {
        message: 'test',
        statusChangeWindowOpen: false,
        statusChangeWindowInfo: {},
        statusChangeStatus: '',

        popwindowOpen: false,
        popwindowBtnKey: '',
        popwindowPositionX: 0,
        popwindowPositionY: 0,
        popwindowClass: '',
        popwindowInfoItem: {},

        serverPortList: {
            '9h000': '8950',
            '9h001': '8951',
            '9h002': '8952',
        },

        projectList:[
            {
                'Name': '客戶智能科',
                'url': jupyterURL+':8901/',
            },
            {
                'Name': '商業智能科',
                'url': jupyterURL+':8902/',
            },
            {
                'Name': '數據經營部',
                'url': jupyterURL+':8900/',
            },
        ],
        customerJupyterInfos: [],
        
        customerJupyterUpdateing: false,

    },

    methods:{
        // http://88.248.13.77:8950/get_docker_jupyter_service
        // http://88.248.13.77:8951/get_docker_jupyter_service
        // http://88.248.13.77:8952/get_docker_jupyter_service

        updateCustomerJupyterInfos(){
            this.customerJupyterUpdateing = true
            Vue_JupyterWindow.customerJupyterInfos = []

            for (let S_serverType of Object.keys(this.serverPortList)){
                fetch(jupyterURL+":"+this.serverPortList[S_serverType]+"/get_docker_jupyter_service")
                .then(function(response) {
                    return response.json();
                })
                .then(function(myJson) {
                    console.log(myJson);
                    for (D_infoItem of myJson){
                        D_infoItem['serverType'] = S_serverType
                    }
                    Vue_JupyterWindow.customerJupyterInfos.push(myJson)
                    Vue_JupyterWindow.customerJupyterUpdateing = false
                });
            }
        },

        clickSwitchCustomerJupyterButton(customerJupyterInfo){
            this.statusChangeWindowOpen = true
            console.log(customerJupyterInfo)
            this.statusChangeWindowInfo = customerJupyterInfo
        },

        switchCustomerJupyterStatus(D_customerJupyterInfo){
            var url, D_postData

            S_serverType = D_customerJupyterInfo['serverType']
            this.serverPortList[S_serverType]
            if (D_customerJupyterInfo.status == 'enable'){
                // 現在是開的，要關掉
                url = jupyterURL+this.serverPortList[S_serverType]+"/stop_docker_jupyter_sevice"
                D_postData = {
                    port: D_customerJupyterInfo.port, 
                    user_id: D_customerJupyterInfo.user_id, 
                    status: 'disable',
                }
            } else if (D_customerJupyterInfo.status == 'disable') {
                // 現在是觀的，要打開
                url = jupyterURL+this.serverPortList[S_serverType]+"/start_docker_jupyter_sevice"
                D_postData = {
                    port: D_customerJupyterInfo.port, 
                    user_id: D_customerJupyterInfo.user_id, 
                    status: 'enable',
                }
            }

            this.statusChangeStatus = '處理中，請稍後...'

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(D_postData),
                headers: {
                    'content-type': 'application/json'
                },
            })
            .then(function(response) {
                console.log(response)
                test = response
                Vue_JupyterWindow.updateCustomerJupyterInfos()
                Vue_JupyterWindow.statusChangeWindowOpen = false
                Vue_JupyterWindow.statusChangeStatus = ''
                return null;
            })
        },

        openPopWindow(event, popwindowInfoItem, S_btn_key){
            this.popwindowBtnKey = S_btn_key
            this.popwindowInfoItem = popwindowInfoItem
            D_positionInfo = getPosition(document.getElementById(this.popwindowBtnKey))
            this.popwindowPositionX = D_positionInfo.x + 'px'
            this.popwindowPositionY = (D_positionInfo.y - document.documentElement.scrollTop) + 'px'
            this.popwindowClass = 'pop-window-info-box-close'

            this.popwindowOpen = true
            setTimeout(function(){
                Vue_JupyterWindow.popwindowPositionX = '0px'
                Vue_JupyterWindow.popwindowPositionY = '0px'
                Vue_JupyterWindow.popwindowClass = 'pop-window-info-box-open'
            },10);
            test = event
        },

        closePopWindow(){
            D_positionInfo = getPosition(document.getElementById(this.popwindowBtnKey))
            this.popwindowPositionX = D_positionInfo.x + 'px'
            this.popwindowPositionY = (D_positionInfo.y - document.documentElement.scrollTop) + 'px'
            this.popwindowClass = 'pop-window-info-box-close'

            console.log(this.popwindowPositionX, this.popwindowPositionY)

            setTimeout(function(){
                Vue_JupyterWindow.popwindowOpen = false
            },300);
        },

    },

    created: function() {
        this.updateCustomerJupyterInfos()
    },
})

var test