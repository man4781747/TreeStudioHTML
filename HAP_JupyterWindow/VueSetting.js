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