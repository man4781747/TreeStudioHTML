var Vue_JupyterCtrlWindow =  new Vue({
    el: '#hap-jupyter-ctrl-window',
    data: {
        checkCreateNewCustomerJupyterWindowOpen: false,
        statusCreateStatus: '',

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
        user_depart: '',
        driver_cores: 1,
        executor_cores: 1,
        driver_memory: 1,
        executor_memory:1,
        context: '',
        spark_name: '',
        max_executors: 1,
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
            return wraningList
        },
    },

    methods:{
        // http://34.135.113.78:5005/get_docker_jupyter_sevice
        updateCustomerJupyterInfos(){
            fetch('http://34.135.113.78:5005/get_docker_jupyter_sevice')
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson);
                Vue_JupyterCtrlWindow.customerJupyterInfos = myJson
            });
        },

        clickSwitchCustomerJupyterButton(customerJupyterInfo){
            this.statusChangeWindowOpen = true
            console.log(customerJupyterInfo)
            this.statusChangeWindowInfo = customerJupyterInfo
        },

        switchCustomerJupyterStatus(D_customerJupyterInfo){
            var url, D_postData
            if (D_customerJupyterInfo.status == 'enable'){
                // 現在是開的，要關掉
                url = "http://34.135.113.78:5005/" + "stop_docker_jupyter_sevice"
                D_postData = {
                    port: D_customerJupyterInfo.port, 
                    user_name: D_customerJupyterInfo.user_name, 
                    status: 'disable',
                }
            } else if (D_customerJupyterInfo.status == 'disable') {
                // 現在是觀的，要打開
                url = "http://34.135.113.78:5005/" + "start_docker_jupyter_sevice"
                D_postData = {
                    port: D_customerJupyterInfo.port, 
                    user_name: D_customerJupyterInfo.user_name, 
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
                Vue_JupyterCtrlWindow.updateCustomerJupyterInfos()
                Vue_JupyterCtrlWindow.statusChangeWindowOpen = false
                Vue_JupyterCtrlWindow.statusChangeStatus = ''
                return null;
            })
          
          


        },

        clickCreateNewCustomerJupyterBtn(){

        },

        createNewCustomerJupyter(){



            url = "http://34.135.113.78:5005/" + "running_docker_jupyter_sevice"
            D_postData = {
                "port": this.portNum.toString(),
                "user_id": this.user_id,
                "user_depart": this.user_depart,
                "user_name": this.user_id,
                "user_token": this.tokenStr,
                "project_name": this.projectName,
                "context": this.context,
                "status": "enable",
                "spark_name": this.spark_name,
                "driver_memory": this.driver_memory.toString(),
                "executor_memory": this.executor_memory.toString(),
                "driver_cores": this.driver_cores.toString(),
                "executor_cores": this.executor_cores.toString(),
                "max_executors": this.max_executors.toString(),
            }
            console.log(D_postData)
            this.statusCreateStatus = '建立中，請稍後...'

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(D_postData),
                headers: {
                    'content-type': 'application/json'
                },
            })
            .then(function(response) {
                console.log(response)
                Vue_JupyterCtrlWindow.checkCreateNewCustomerJupyterWindowOpen = false
                Vue_JupyterCtrlWindow.statusCreateStatus = ''
                Vue_JupyterCtrlWindow.updateCustomerJupyterInfos()
            })
        },

		RemoveOtherWord(S_strTypeName){
			this[S_strTypeName] = this[S_strTypeName].replaceAll(/\W/gm,'_')
		},

        clickDeleteJupyterBtn(customerJupyterInfo){
            console.log(customerJupyterInfo)
            this.deleteJupyterWindowOpen= true
            Vue.set(
                this,
                'deleteJupyterWindowInfo',
                customerJupyterInfo
            
            )
        },

        deleteJupyter(){
            url = "http://34.135.113.78:5005/" + "close_docker_jupyter_sevice"
            this.statusDeleteStatus = '刪除中...'
            D_postData = {
                "port": this.deleteJupyterWindowInfo.port,
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
                console.log(response)
                test = response
                Vue_JupyterCtrlWindow.updateCustomerJupyterInfos()
                Vue_JupyterCtrlWindow.deleteJupyterWindowOpen = false
                Vue_JupyterCtrlWindow.statusDeleteStatus = ''
                return null;
            })
        },
    },

    created: function() {
        this.updateCustomerJupyterInfos()

    },
})

var test