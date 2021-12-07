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
            'AnnouncementList': {
                'Name': '公告列表',
                'Type': 'Page',
                'icon': 'fas fa-bullhorn',
            },
            'HAP_Hue': {
                'Name': 'HAP Hue',
                'Type': 'URL',
                'URL': HueURL,
                'icon': 'fas fa-poll',
                'title': 'HAP Hue',
                'content': 'Hue為Hadoop的HAP環境中，進行資料探索的工具，若想獲得詳細資訊，請至Wiki搜尋 "Hue"',
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
                'height' : 0,
                'id' : 'main-toolbox-list-HAP_AIRJOB',
                // 'svg': 'http://34.135.113.78:9000/static/dist/img/AirflowIcon-white-30-rotate-new.svg',
                'List': [
                    {
                        'Name': '數據經營部',
                        'Type': 'URL',
                        'URL': airjobURL + 'AIRJOB/9h000/',
                        'icon': 'far fa-circle',
                        'title': 'AIRJOB: 數據經營部',
                        'content': 'AIRJOB為以Airflow為底層延伸設計的自主排程系統。',
                    },
                    {
                        'Name': '客戶智能科',
                        'Type': 'URL',
                        'URL': airjobURL + 'AIRJOB/9h001/',
                        'icon': 'far fa-circle',
                        'title': 'AIRJOB: 客戶智能科',
                        'content': 'AIRJOB為以Airflow為底層延伸設計的自主排程系統。',
                    },
                    {
                        'Name': '商業智能科',
                        'Type': 'URL',
                        'URL': airjobURL + 'AIRJOB/9h002/',
                        'icon': 'far fa-circle',
                        'title': 'AIRJOB: 商業智能科',
                        'content': 'AIRJOB為以Airflow為底層延伸設計的自主排程系統。',
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
                'URL': YarnURL,
                'icon': 'fas fa-tachometer-alt',
                'title': 'HAP Yarn 系統',
                'content': 'HAP Yarn 系統',
            },
            
        },
    },

    methods:{
        changePage(labelItem,S_page){
            Vue.set(
                this.urlParas,
                'page',
                S_page
            )
            this.updateUrlParas()

            this.chosedPage = S_page
            if (S_page == 'Home'){
                let element = document.getElementById("home-grid");
                element.style.display = '';
                try {
                    Vue_homeAnnouncementWindow.updateTableInfoList()
                }
                catch {
                    v_console.debug('最新消息更新失敗')
                }
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

            if (S_page == 'System.Jupyter 控制'){
                let element = document.getElementById("hap-jupyter-ctrl-window");
                element.style.display = '';
                Vue_JupyterCtrlWindow.updateCustomerJupyterInfos()
            } else {
                let element = document.getElementById("hap-jupyter-ctrl-window");
                element.style.display = 'none';
            } 
            if (S_page == 'System.公告管理系統'){
                let element = document.getElementById("hap-announcement-manage-window");
                element.style.display = '';
            } else {
                let element = document.getElementById("hap-announcement-manage-window");
                element.style.display = 'none';
            } 
            if (S_page == 'AnnouncementList'){
                let element = document.getElementById("hap-announcement-list-window");
                element.style.display = '';
                Vue_announcementListManager.updateAnnouncementList()
            } else {
                let element = document.getElementById("hap-announcement-list-window");
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
			S_fullUrlPath = "?" + S_urlParastring
			history.pushState(null,null,S_fullUrlPath)
		},

		loadUrlParas(){
			var D_paras = {}
			let params = new URL(location.href).searchParams
			for (let pair of params.entries()) {
				D_paras[pair[0]] = pair[1]
			}
			this.urlParas = D_paras
			//console.log(this.urlParas)
			this.actionByUrlParas()
		},

		actionByUrlParas(){
			if (this.urlParas['user'] == 'admin'){
                Vue.set(
                    this.D_labelList,
                    'System',
                    {
                        'Name': '系統相關',
                        'Type': 'List',
                        'icon': 'fas fa-sliders-h',
                        'opened': false,
                        'height' : 0,
                        'id' : 'main-toolbox-list-System',
                        'List': [
                            {
                                'Name': 'Jupyter 控制',
                                'Type': 'Page',
                                'icon': 'far fa-circle',
                            },
                            {
                                'Name': '公告管理系統',
                                'Type': 'Page',
                                'icon': 'far fa-circle',
                            },
                            {
                                'Name': 'MySQL管理平台',
                                'Type': 'URL',
                                'URL': 'http://88.248.13.77:8897',
                                'icon': 'far fa-circle',
                                'title': 'MySQL管理平台',
                                'content': 'phpMyAdmin 是一個以PHP為基礎，以Web-Base方式架構在網站主機上的MySQL的資料庫管理工具，讓管理者可用Web介面管理MySQL資料庫。 人壽HAP排程系統Airflow，以MySQL資料庫做為搭建基底，在營運環境除了提供Airflow使用，亦提供為HIVE資料表即時記錄，供Tree studio前端畫面使用。',
                            },
                            {
                                'Name': 'PostgreSQL管理平台',
                                'Type': 'URL',
                                'URL': 'http://88.248.13.77:8892',
                                'icon': 'far fa-circle',
                                'title': 'PostgreSQL管理平台',
                                'content': 'pgAdmin 是一個管理 PostgreSQL 的開源圖形化工具，支援多種平台。目前主要存取Jupyter Service環境資訊，以及提供Tree studio使用。',
                            },
                        ],
                    }
                )

			}
			if (this.urlParas['page'] != undefined){
                let L_pageName = this.urlParas['page'].split('.')
                if (L_pageName.length == 1){
                    let S_pageName = L_pageName[0]
                    if (this.D_labelList[S_pageName] == undefined) {
                        this.changePage({}, "Home")
                    }
                    else {
                        ////console.log(this.D_labelList[S_pageName])
                        this.changePage(this.D_labelList[S_pageName], S_pageName)
                    }

                }
                else if (L_pageName.length == 2){
                    let S_pageName = L_pageName[0]
                    let S_listName = L_pageName[1]
                    if (this.D_labelList[S_pageName] == undefined) {
                        this.changePage({}, "Home")
                    }
                    else {
                        if (this.D_labelList[S_pageName].List == undefined) {
                            this.changePage({}, "Home")
                        }
                        else {
                            ////console.log(S_pageName,'->',S_listName)
                            this.D_labelList[S_pageName].opened = true
                            for (listItem of this.D_labelList[S_pageName].List){
                                if (listItem.Name == S_listName){
                                    this.changePage(listItem, S_pageName+'.'+S_listName)
                                }
                            }
                        }
                    }


                }
                else {
                    this.changePage({}, "Home")
                }
			}
            else {
                this.changePage({}, "Home")
            }

		},

        calcListItemHeight(){
            for (itemKey of Object.keys(this.D_labelList)){
                if (this.D_labelList[itemKey].Type == "List"){
                    this.D_labelList[itemKey].height = document.getElementById(this.D_labelList[itemKey].id).offsetHeight
                }
            }
        },

    },

    created: function () {
        // this.changePage({},'Home')
        // this.loadUrlParas()
    },

    updated: function () {
        this.calcListItemHeight()
    },
})
