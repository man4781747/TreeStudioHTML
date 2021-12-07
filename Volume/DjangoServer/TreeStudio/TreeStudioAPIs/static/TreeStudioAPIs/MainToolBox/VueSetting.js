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
                                'Name': '公告管理系統',
                                'Type': 'Page',
                                'icon': 'far fa-circle',
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
