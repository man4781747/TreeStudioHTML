var Vue_mainToolBox =  new Vue({
    el: '#main-toolbox',
    data: {
        chosedPage: 'Home',
        smallToolBox: false,
        urlParas: {},
        D_labelList: {
            'Home': {
                'Name': 'Home',
                'Type': 'Home',
                'icon': 'fas fa-home',
            },
            'HAP_Hue': {
                'Name': 'HAP Hue',
                'Type': 'URL',
                'URL': '123',
                'icon': 'fas fa-poll',
                'title': 'HAP Hue',
                'content': 'HAP Hue介紹',
            },
            'HAP_Jupyter': {
                'Name': 'HAP Jupyter',
                'Type': 'Page',
                'icon': 'fab fa-python',
            },
            'HAP_AIRJOB': {
                'Name': 'HAP AIRJOB',
                'Type': 'List', 
                'opened': false,
                'icon': 'far fa-calendar-alt',
                // 'svg': 'http://34.135.113.78:9000/static/dist/img/AirflowIcon-white-30-rotate-new.svg',
                'List': [
                    {
                        'Name': '9h000',
                        'Type': 'URL',
                        'URL': 'http://34.80.102.147:8000/AirFlowUploadWeb/testHTML/9h000/',
                        'icon': 'far fa-circle',
                        'title': 'AIRJOB: 9h000',
                        'content': '自主排程系統',
                    },
                    {
                        'Name': '9h001',
                        'Type': 'URL',
                        'URL': 'http://34.80.102.147:8000/AirFlowUploadWeb/testHTML/9h001/',
                        'icon': 'far fa-circle',
                        'title': 'AIRJOB: 9h001',
                        'content': '自主排程系統',
                    },
                    {
                        'Name': '9h002',
                        'Type': 'URL',
                        'URL': 'http://34.80.102.147:8000/AirFlowUploadWeb/testHTML/9h002/',
                        'icon': 'far fa-circle',
                        'title': 'AIRJOB: 9h002',
                        'content': '自主排程系統',
                    },
                ]
            },
            'HAP_Table': {
                'Name': 'HAP 資料表查詢',
                'Type': 'Page',
                'icon': 'fas fa-table',
            },
            'HAP_Yarn': {
                'Name': 'HAP Yarn 系統',
                'Type': 'URL',
                'URL': '123',
                'icon': 'fas fa-tachometer-alt',
                'title': 'HAP Yarn 系統',
                'content': 'HAP Yarn 系統介紹',
            },
            
        },
    },

    methods:{
        changePage(labelItem,S_page){
            this.chosedPage = S_page
            if (S_page == 'Home'){
                let element = document.getElementById("home-grid");
                element.style.display = '';
            } else {
                let element = document.getElementById("home-grid");
                element.style.display = 'none';
            } 

            if (S_page == 'HAP_Table'){
                let element = document.getElementById("hive-searcher");
                element.style.display = '';
            } else {
                let element = document.getElementById("hive-searcher");
                element.style.display = 'none';
            } 

            if (S_page == 'HAP_Jupyter'){
                let element = document.getElementById("hap-jupyter-window");
                element.style.display = '';
                Vue_JupyterWindow.updateCustomerJupyterInfos()
            } else {
                let element = document.getElementById("hap-jupyter-window");
                element.style.display = 'none';
            } 

            if (S_page == 'Jupyter 控制'){
                let element = document.getElementById("hap-jupyter-ctrl-window");
                element.style.display = '';
                Vue_JupyterCtrlWindow.updateCustomerJupyterInfos()
            } else {
                let element = document.getElementById("hap-jupyter-ctrl-window");
                element.style.display = 'none';
            } 


            if (labelItem.Type == 'URL'){
                let element = document.getElementById("url-description-window");
                element.style.display = '';
                Vue_TopMenuWindow.title = labelItem.title
                Vue_TopMenuWindow.content = labelItem.content

            } else {
                let element = document.getElementById("url-description-window");
                element.style.display = 'none';
            } 

        },

		updateUrlParas(){

			S_urlParastring = new URLSearchParams(this.urlParas).toString();
			// S_fullUrlPath = location.host + location.pathname + '?' + S_urlParastring
			S_fullUrlPath = "?" + S_urlParastring
			history.pushState(null,null,S_fullUrlPath)

			// location.search = new URLSearchParams(this.urlParas)
		},

		loadUrlParas(){
			var D_paras = {}
			let params = new URL(location.href).searchParams
			for (let pair of params.entries()) {
				D_paras[pair[0]] = pair[1]
			}
			this.urlParas = D_paras
			console.log(this.urlParas)
			this.actionByUrlParas()
		},

		actionByUrlParas(){
			if (this.urlParas['au4au4'] == 'u04d93u.4gj84u.4dj4'){
                Vue.set(
                    this.D_labelList,
                    'System',
                    {
                        'Name': '系統相關',
                        'Type': 'List',
                        'icon': 'fas fa-sliders-h',
                        'opened': false,
                        'List': [
                            {
                                'Name': 'Jupyter 控制',
                                'Type': 'Page',
                                'icon': 'far fa-circle',
                            },
                            {
                                'Name': 'Exp Airflow',
                                'Type': 'URL',
                                'URL': '123',
                                'icon': 'far fa-circle',
                                'title': 'Exp Airflow',
                                'content': 'Exp Airflow介紹',
                            },
                            {
                                'Name': 'Exp PGAdmin',
                                'Type': 'URL',
                                'URL': '123',
                                'icon': 'far fa-circle',
                                'title': 'Exp PGAdmin',
                                'content': 'Exp PGAdmin介紹',
                            },
                            {
                                'Name': 'Edge GitLab',
                                'Type': 'URL',
                                'URL': '123',
                                'icon': 'far fa-circle',
                                'title': 'Edge GitLab',
                                'content': 'Edge GitLab介紹',
                            },
                            {
                                'Name': 'Edge Airflow',
                                'Type': 'URL',
                                'URL': '123',
                                'icon': 'far fa-circle',
                                'title': 'Edge Airflow',
                                'content': 'Edge Airflow介紹',
                            },
                        ],
                    }
                )

			}
		},



    },

    created: function () {
        this.changePage({},'Home')
        this.loadUrlParas()
    }
})