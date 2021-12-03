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

var Vue_JupyterCtrlWindow =  new Vue({
    el: '#hap-jupyter-ctrl-window',
    data: {
        checkCreateNewCustomerJupyterWindowOpen: false,
        statusCreateStatus: '',

        window_chose: 'create_window',

        jupyterURL: jupyterURL,

        statusChangeWindowOpen: false,
        statusChangeWindowInfo: {},
        statusChangeStatus: '',

        deleteJupyterWindowOpen: false,
        deleteJupyterWindowInfo: {},
        statusDeleteStatus: '',

        customerJupyterInfos: [],

        portNum: 8900,
        tokenStr: '',
        projectName: '',
        user_id: '',
        user_name: '',
        user_depart: '9h000',
        driver_cores: 2,
        executor_cores: 2,
        driver_memory: 2,
        executor_memory:2,
        context: '',
        spark_name: '',
        max_executors: 2,
        spark_ui: false,

        delDobuleCheck: false,

        popwindowOpen: false,
        popwindowBtnKey: '',
        popwindowPositionX: 0,
        popwindowPositionY: 0,
        popwindowClass: '',
        popwindowInfoItem: {},

        customerJupyterUpdateing: false,

        serverPortList: {
            '9h000': '8990',
            '9h001': '8991',
            '9h002': '8992',
        },
    },

    computed: {
        checkCreateNewCustomerJupyterSetting(){
            let wraningList = []
            if (this.projectName == ''){
                wraningList.push('專案名稱不得為空')
            }
            if (this.user_id == ''){
                wraningList.push('申請人不得為空')
            }
            if (this.user_depart == ''){
                wraningList.push('部門不得為空')
            }
            if ((this.user_id.length != 8) | (Number(this.user_id) > -1 == false)){
                wraningList.push('申請人ID應為8位數之原編')
            }
            if (this.D_existsUserName[this.user_name] != undefined){
                wraningList.push('申請人名稱(User Name)已被使用，請更換')
            }
            if (this.D_existsSparkName[this.spark_name] != undefined){
                wraningList.push('Spark Name已被使用，請更換')
            }
            if (this.L_unUsedPortList.indexOf(parseInt(this.portNum))==-1){
                wraningList.push('請選擇Port號')
            }

            return wraningList
        },

        L_unUsedPortList(){
            L_portList = []


            // 個項目最後一個port是開給AIRJOB專用的
            D_portStart = {
                '9h000': [8961, 8966, 8971, 8976, 8981],
                '9h001': [8901, 8906, 8911, 8916, 8921, 8926, 8983],
                '9h002': [8931, 8936, 8941, 8946, 8951, 8956, 8985],
            }


            // for (i of [...Array(10).keys()]){
            //     L_portList.push(i*3+D_portStart[this.user_depart])
            // }
            L_portList = D_portStart[this.user_depart]

            Set_portList = new Set(L_portList)
            for (L_projectInfo of this.customerJupyterInfos){
                for (D_jupyterInfo of L_projectInfo){
                    Set_portList.delete(
                        parseInt(D_jupyterInfo.port)
                    )
                }
            }
            return Array.from(Set_portList);
        },

        D_existsSparkName(){
            D_return = {}
            for (L_projectInfo of this.customerJupyterInfos){
                for (D_jupyterInfo of L_projectInfo){
                    D_return[D_jupyterInfo.spark_name] = true
                }
            }
            return D_return
        },

        D_existsUserName(){
            D_return = {}
            for (L_projectInfo of this.customerJupyterInfos){
                for (D_jupyterInfo of L_projectInfo){
                    D_return[D_jupyterInfo.user_name] = true
                }
            }
            return D_return
        },


        S_sparkName(){
            return this.portNum + '_' + this.user_name
        },
    },

    methods:{
        updateCustomerJupyterInfos(I_index=0){
            var I_index = I_index
            this.customerJupyterUpdateing = true
            Vue_JupyterCtrlWindow.customerJupyterInfos = []
            L_projectList = Object.keys(this.serverPortList)
            if (I_index >= L_projectList.length){
                return null
            }
            fetch(jupyterURL+":"+this.serverPortList[L_projectList[I_index]]+"/get_docker_jupyter_service")
            .then(function(response) {
                return response.json()
            })
            .then(function(myJson) {
                Vue_JupyterCtrlWindow.customerJupyterUpdateing = false
                Vue_JupyterCtrlWindow.customerJupyterInfos.push(myJson)
            })
            .catch(function(){
                //console.log('FetchFail')
                Vue_JupyterCtrlWindow.updateCustomerJupyterInfos(I_index + 1)
            })


            // for (let i in [1,12,2,3]){
            //     this.customerJupyterUpdateing = false
            //     Vue_JupyterCtrlWindow.customerJupyterInfos.push(
            //         [
            //             {
            //                 "context":"this is a test",
            //                 "create_time":"2021/08/26 16:36:18",
            //                 "driver_cores":"2",
            //                 "driver_memory":"4",
            //                 "executor_cores":"2",
            //                 "executor_memory":"4",
            //                 "max_executors":"6",
            //                 "port":"8900",
            //                 "project_name":"common project",
            //                 "spark_name":"master",
            //                 "status":"disable",
            //                 "user_depart":"i9h000",
            //                 "user_id":"00865936",
            //                 "user_name":"i9h000",
            //                 "user_token":"i9h000"
            //             }
            //         ]
            //     )
            // }
        },

        initValues(){
            this.portNum = 8900
            this.tokenStr = ''
            this.projectName = ''
            this.user_id = ''
            this.user_name = ''
            this.user_depart = '9h000'
            this.driver_cores = 2
            this.executor_cores = 2
            this.driver_memory = 2
            this.executor_memory = 2
            this.context = ''
            this.spark_name = ''
            this.max_executors = 2
            this.spark_ui = false
        },

        clickSwitchCustomerJupyterButton(customerJupyterInfo){
            this.statusChangeWindowOpen = true
            //console.log(customerJupyterInfo)
            this.statusChangeWindowInfo = customerJupyterInfo
        },

        switchCustomerJupyterStatus(D_customerJupyterInfo){
            var url, D_postData

            S_serverType = D_customerJupyterInfo['user_depart']
            this.serverPortList[S_serverType]
            if (D_customerJupyterInfo.status == 'enable'){
                // 現在是開的，要關掉
                url = jupyterURL+':'+this.serverPortList[S_serverType]+"/stop_docker_jupyter_service"
                D_postData = {
                    port: D_customerJupyterInfo.port, 
                    user_id: D_customerJupyterInfo.user_id, 
                    status: 'disable',
                }
            } else if (D_customerJupyterInfo.status == 'disable') {
                // 現在是觀的，要打開
                url = jupyterURL+':'+this.serverPortList[S_serverType]+"/start_docker_jupyter_service"
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
                //console.log(response)
                test = response
                Vue_JupyterCtrlWindow.updateCustomerJupyterInfos()
                Vue_JupyterCtrlWindow.statusChangeWindowOpen = false
                Vue_JupyterCtrlWindow.statusChangeStatus = ''
                return null;
            })
        },
        
        clickCreateNewCustomerJupyterBtn(){

        },

        createNewCustomerJupyter(){
            url = jupyterURL+":"+this.serverPortList[this.user_depart]+"/running_docker_jupyter_service"
            D_postData = {
                "port": this.portNum.toString(),
                "user_id": this.user_id,
                "user_depart": this.user_depart,
                "user_name": this.user_name,
                "user_token": this.tokenStr,
                "project_name": this.projectName,
                "context": this.context,
                "status": "enable",
                "spark_name": this.S_sparkName,
                "driver_memory": this.driver_memory.toString(),
                "executor_memory": this.executor_memory.toString(),
                "driver_cores": this.driver_cores.toString(),
                "executor_cores": this.executor_cores.toString(),
                "max_executors": this.max_executors.toString(),
                "ui_port": (parseInt(this.portNum)+1).toString(),
                "spark_ui": ""+this.spark_ui,
            }
            //console.log(D_postData)
            this.statusCreateStatus = '建立中，請稍後...'

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(D_postData),
                headers: {
                    'content-type': 'application/json'
                },
            })
            .then(function(response) {
                //console.log(response)
                Vue_JupyterCtrlWindow.checkCreateNewCustomerJupyterWindowOpen = false
                Vue_JupyterCtrlWindow.statusCreateStatus = ''
                Vue_JupyterCtrlWindow.updateCustomerJupyterInfos()
                Vue_JupyterCtrlWindow.initValues()
            })
        },

		RemoveOtherWord(S_strTypeName){
			this[S_strTypeName] = this[S_strTypeName].replaceAll(/\W/gm,'_')
		},

		LowerWord(S_strTypeName){
			this[S_strTypeName] = this[S_strTypeName].replaceAll(/\W/gm,'_').toLowerCase()
		},

        clickDeleteJupyterBtn(customerJupyterInfo){
            //console.log(customerJupyterInfo)
            this.deleteJupyterWindowOpen= true
            this.delDobuleCheck= false
            Vue.set(
                this,
                'deleteJupyterWindowInfo',
                customerJupyterInfo
            )
        },

        deleteJupyter(){
            url = jupyterURL+":"+this.serverPortList[this.deleteJupyterWindowInfo.user_depart]+"/close_docker_jupyter_service"
            this.statusDeleteStatus = '刪除中...'
            D_postData = {
                "port": this.deleteJupyterWindowInfo.port,
                "user_id": this.deleteJupyterWindowInfo.user_id,
            }
           
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(D_postData),
                headers: {
                    'content-type': 'application/json'
                },
            })
            .then(function(response) {
                //console.log(response)
                test = response
                Vue_JupyterCtrlWindow.updateCustomerJupyterInfos()
                Vue_JupyterCtrlWindow.deleteJupyterWindowOpen = false
                Vue_JupyterCtrlWindow.statusDeleteStatus = ''
                return null;
            })
        },

        deleteJupyter_fileDel(){
            url = jupyterURL+":"+this.serverPortList[this.deleteJupyterWindowInfo.user_depart]+"/remove_docker_jupyter_service"
            this.statusDeleteStatus = '刪除中...'
            D_postData = {
                "port": this.deleteJupyterWindowInfo.port,
                "user_id": this.deleteJupyterWindowInfo.user_id,
                "user_depart": this.deleteJupyterWindowInfo.user_depart,
                "user_name": this.deleteJupyterWindowInfo.user_name,
            }
           
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(D_postData),
                headers: {
                    'content-type': 'application/json'
                },
            })
            .then(function(response) {
                test = response
                Vue_JupyterCtrlWindow.updateCustomerJupyterInfos()
                Vue_JupyterCtrlWindow.deleteJupyterWindowOpen = false
                Vue_JupyterCtrlWindow.statusDeleteStatus = ''
                return null;
            })
        },

        openPopWindow(event, popwindowInfoItem, S_btn_key){
            this.popwindowBtnKey = S_btn_key
            this.popwindowInfoItem = popwindowInfoItem
            D_positionInfo = getPosition(document.getElementById(this.popwindowBtnKey))
            this.popwindowPositionX = D_positionInfo.x + 'px'
            this.popwindowPositionY =  (D_positionInfo.y - document.documentElement.scrollTop)  + 'px'
            this.popwindowClass = 'pop-window-info-box-close'

            this.popwindowOpen = true
            setTimeout(function(){
                Vue_JupyterCtrlWindow.popwindowPositionX = '0px'
                Vue_JupyterCtrlWindow.popwindowPositionY = '0px'
                Vue_JupyterCtrlWindow.popwindowClass = 'pop-window-info-box-open'
            },10);
            test = event
        },

        closePopWindow(){
            D_positionInfo = getPosition(document.getElementById(this.popwindowBtnKey))
            this.popwindowPositionX = D_positionInfo.x + 'px'
            this.popwindowPositionY =  (D_positionInfo.y - document.documentElement.scrollTop) + 'px'
            this.popwindowClass = 'pop-window-info-box-close'

            //console.log(this.popwindowPositionX, this.popwindowPositionY)

            setTimeout(function(){
                Vue_JupyterCtrlWindow.popwindowOpen = false
            },300);
        },

    },

    created: function() {
        // this.updateCustomerJupyterInfos()

    },
})

var test