var Vue_HiveSearcher = new Vue({
	el: '#hive-searcher',
	data: {
		massage: '030',
        tableInfoList : [],
        pageChose : 0,
        pageListChose : 0,
        pageMaxNum : 10,
        filterStr: '',
        filterStr_: '',
        sortBy: '',
        sortValue: 1,
        title_filter: {
            table_name : {
                'filter_str': '',
                'open': false,
                'show_name': 'Table Name',
            },
            table_name_ch : {
                'filter_str': '',
                'open': false,
                'show_name': '中文名稱',
            },
            resource_database : {
                'filter_str': '',
                'open': false,
                'show_name': '資料庫',
            },
            latest_updatetime : {
                'filter_str': '',
                'open': false,
                'show_name': '最後更新時間',
            },
            table_status : {
                'filter_str': '',
                'open': false,
                'show_name': '更新狀況',
            },
            etl_freq : {
                'filter_str': '',
                'open': false,
                'show_name': '更新頻率',
            },
            init_updatetime : {
                'filter_str': '',
                'open': false,
                'show_name': '上架時間',
            },
        },
	},
  
	computed: {
        pageList(){
            var pageListList = [[]]
            for (let pageIndex in this.tableData){
                let I_listInex = Math.floor(pageIndex/5)
                if (pageListList[I_listInex] == undefined){
                    pageListList[I_listInex] = []
                }
                pageListList[I_listInex].push(pageIndex)
            }

            if (this.pageListChose >=  pageListList.length){
                this.pageListChose = pageListList.length - 1
            }

            return pageListList
        },

		tableData(){
            if (this.sortBy != ""){
                afterSortList = []
                var sortByList = []
                for (let itemInfo of this.tableInfoList){
                    sortByList.push([itemInfo[this.sortBy],itemInfo])
                }

                sortByList.sort()
                if (this.sortValue == -1){
                    sortByList.reverse()
                }
                for (let itemInfo_after of sortByList){
                    afterSortList.push(itemInfo_after[1])
                }
            } else {
                afterSortList = this.tableInfoList
            }

            var afterTitleFilterList = afterSortList
            for (let S_titleChose of Object.keys(this.title_filter)){
                if (this.title_filter[S_titleChose].filter_str.trim()==""){
                    continue
                }
                else {
                    afterTitleFilterList_chose = []
                    for (let itemInfo of afterTitleFilterList){
                        if (itemInfo[S_titleChose].indexOf(this.title_filter[S_titleChose].filter_str.trim())!= -1){
                            afterTitleFilterList_chose.push(itemInfo)
                        }
                    }
                    afterTitleFilterList = afterTitleFilterList_chose
                }
            }




            var afterFilterList = []
            if (this.filterStr.trim()==""){
                afterFilterList = afterTitleFilterList
            } else {
                for (let itemInfo of afterTitleFilterList){
                    for (key of Object.keys(itemInfo)){
                        if (itemInfo[key].indexOf(this.filterStr.trim())!= -1){
                            afterFilterList.push(itemInfo)
                            break
                        }
                    }
                }
            }
            var tableData = [[]]
            for (let itemIndex in afterFilterList){
                let I_page = Math.floor(itemIndex/this.pageMaxNum)
                if (tableData[I_page] == undefined){
                    tableData[I_page] = []
                }
                tableData[I_page].push(afterFilterList[itemIndex])
            }
            if (this.pageChose >=  tableData.length){
                this.pageChose = tableData.length - 1
            }
            return tableData
        },

        tableRawNum(){
            let totalCount = 0
            for (L_pageList of this.tableData){
                totalCount = totalCount + L_pageList.length
            }
            return totalCount
        },

        tablePageNum(){
            let totalCount = 0
            for (L_pageList of this.pageList){
                totalCount = totalCount + L_pageList.length
            }
            return totalCount
        },
	},
  
	methods: {
        runFilter(filterStr_){
            this.filterStr = filterStr_
        },

        updateTableInfoList(){
			fetch(hive_table_status_URL)
			.then(function(response) {
				return response.json()
			})
			.then(function(myJson) {
                for (let item of myJson){
                    item.table_name = item.table_name.toLowerCase()
                    item.resource_database = item.resource_database.toLowerCase()
                    item.latest_updatetime = item.latest_updatetime.replaceAll('/','-')
                }
                Vue_HiveSearcher.tableInfoList = myJson
			});
        },

        sortByBtmChose(sortByStr){
            if (this.sortBy == sortByStr){
                this.sortValue = this.sortValue * -1
            } else {
                this.sortValue = 1
            }
            this.sortBy = sortByStr
        },
	},

	mounted: function(){
        this.updateTableInfoList()
	},
})