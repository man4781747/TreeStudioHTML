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
                        'Name': '9h000',
                        'Type': 'URL',
                        'URL': airjobURL + 'AirFlowUploadWeb/testHTML/9h000/',
                        'icon': 'far fa-circle',
                        'title': 'AIRJOB: 9h000',
                        'content': 'AIRJOB為以Airflow為底層延伸設計的自主排程系統。',
                    },
                    {
                        'Name': '9h001',
                        'Type': 'URL',
                        'URL': airjobURL + 'AirFlowUploadWeb/testHTML/9h001/',
                        'icon': 'far fa-circle',
                        'title': 'AIRJOB: 9h001',
                        'content': 'AIRJOB為以Airflow為底層延伸設計的自主排程系統。',
                    },
                    {
                        'Name': '9h002',
                        'Type': 'URL',
                        'URL': airjobURL + 'AirFlowUploadWeb/testHTML/9h002/',
                        'icon': 'far fa-circle',
                        'title': 'AIRJOB: 9h002',
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
                        'height' : 0,
                        'id' : 'main-toolbox-list-System',
                        'List': [
                            {
                                'Name': 'Jupyter 控制',
                                'Type': 'Page',
                                'icon': 'far fa-circle',
                            },
                            // {
                            //     'Name': 'Exp Airflow',
                            //     'Type': 'URL',
                            //     'URL': '123',
                            //     'icon': 'far fa-circle',
                            //     'title': 'Exp Airflow',
                            //     'content': 'Exp Airflow介紹',
                            // },
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
                        console.log(this.D_labelList[S_pageName])
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
                            console.log(S_pageName,'->',S_listName)
                            this.D_labelList[S_pageName].opened = true
                            for (listItem of this.D_labelList[S_pageName].List){
                                if (listItem.Name == S_listName){
                                    this.changePage(listItem, S_pageName+'.'+S_listName)
                                }
                            }
                        }
                    }


                }
                if (this.D_labelList[S_pageName] == undefined) {
                    this.changePage({}, "Home")
                }
                // else if (this.D_labelList[S_pageName].Type == 'List'){
                //     let S_listName = this.urlParas['list']
                //     if (this.D_labelList[S_pageName][S_listName].Type != undefined ){
                //         this.changePage(this.D_labelList[S_pageName][S_listName], S_listName)
                //     }
                // }
                // else if (["Home", "URL", "Page"].indexOf(this.D_labelList[S_pageName].Type)!=-1){
                //     console.log(this.D_labelList[S_pageName])
                //     this.changePage(this.D_labelList[S_pageName], S_pageName)
                // }
                // else {
                //     this.changePage({}, "Home")
                // }
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
