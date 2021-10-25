var Vue_JupyterWindow =  new Vue({
    el: '#hap-jupyter-window',
    data: {
        message: 'test',
        statusChangeWindowOpen: false,
        statusChangeWindowInfo: {},
        statusChangeStatus: '',
        projectList:[
            {
                'Name': '客戶智能科',
                'url': 'http://34.135.113.78:8901/',
            },
            {
                'Name': '商業智能科',
                'url': 'http://34.135.113.78:8902/',
            },
            {
                'Name': '數據經營部',
                'url': 'http://34.135.113.78:8900/',
            },
        ],
        customerJupyterInfos: [],
        
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
                Vue_JupyterWindow.customerJupyterInfos = myJson
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
                Vue_JupyterWindow.updateCustomerJupyterInfos()
                Vue_JupyterWindow.statusChangeWindowOpen = false
                Vue_JupyterWindow.statusChangeStatus = ''
                return null;
            })
          
          


        },
    },

    created: function() {
        this.updateCustomerJupyterInfos()

    },
})

var test