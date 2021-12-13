Vue.component('shop-info-table', {
    template: `
<div>
<div style='margin-bottom: .5rem;'>
<div class='input-group-main-title'>店家基礎資訊
    <div class='input-group-main-sub-title'></div>
</div>
<div class='form-inputlabel-list'>
    <div class='form-ctrl-inputlabel'>
        <div class='input-titles'>
            <div class='input-main-title'>店家編號</div>
            <div class='input-sub-title'></div>
        </div>
        <input class='form-ctrl-input' type="text" v-model.trim="shop_info_chosed.shop_id" disabled>
    </div>
    <div class='form-ctrl-inputlabel'>
        <div class='input-titles'>
            <div class='input-main-title'>店家種類*</div>
            <div class='input-sub-title'></div>
        </div>
        <select style='height: calc(1.5rem + 6px);' v-model="shop_info_chosed.shop_type" disabled>
            <option v-for="type of ['餐廳','飲料','其他']">{{type}}</option>
        </select>
    </div>
    <div class='form-ctrl-inputlabel'>
        <div class='input-titles'>
            <div class='input-main-title'>店家名稱*</div>
            <div class='input-sub-title'></div>
        </div>
        <input class='form-ctrl-input' type="text" v-model.trim="shop_info_chosed.shop_name" disabled>
    </div>
    <div class='form-ctrl-inputlabel'>
        <div class='input-titles'>
            <div class='input-main-title'>店家評價</div>
            <div class='input-sub-title'>(事後可編輯)</div>
        </div>
        <input class='form-ctrl-input' type="text" v-model.trim="shop_info_chosed.shop_score" disabled>
    </div>
    <div class='form-ctrl-inputlabel'>
        <div class='input-titles'>
            <div class='input-main-title'>店家電話</div>
            <div class='input-sub-title'></div>
        </div>
        <input class='form-ctrl-input' type="text" v-model.trim="shop_info_chosed.shop_phoneNum" disabled>
    </div>
    <div class='form-ctrl-inputlabel'>
        <div class='input-titles'>
            <div class='input-main-title'>店家地址</div>
            <div class='input-sub-title'></div>
        </div>
        <input class='form-ctrl-input' type="text" v-model.trim="shop_info_chosed.shop_address" disabled>
    </div>
</div>
</div>
<div style='margin-bottom: .5rem;'>
<div class='input-group-main-title'
>菜單
    <div class='input-group-main-sub-title'></div>
</div>
<div class='form-ctrl-inputlabel-big'>
    <shop-menu-mamager
    v-bind:shop_menu="shop_info_chosed.shop_menu"
    ></shop-menu-mamager>


</div>
</div>

</div>
    `,
    data: function () {
      return {
        count: 0
      }
    },
    props: ['shop_info_chosed'],
})

Vue.component('order-info-table', {
    template: `
<div>
<div style='margin-bottom: .5rem;'>
    <div class='input-group-main-title'>開團者資訊
        <div class='input-group-main-sub-title'></div>
    </div>
    <div class='form-inputlabel-list'>
        <div class='form-ctrl-inputlabel'>
            <div class='input-titles'>
                <div class='input-main-title'>訂單編號</div>
                <div class='input-sub-title'></div>
            </div>
            <input class='form-ctrl-input' type="text" v-model.trim="order_info.order_id" disabled>
        </div>
        <div class='form-ctrl-inputlabel'>
            <div class='input-titles'>
                <div class='input-main-title'>開團者*</div>
                <div class='input-sub-title'></div>
            </div>
            <input class='form-ctrl-input' type="text" v-model.trim="order_info.owner_name" disabled>
        </div>
        <div class='form-ctrl-inputlabel'>
            <div class='input-titles'>
                <div class='input-main-title'>訂單截止時間</div>
                <div class='input-sub-title'></div>
            </div>
            <input class='form-ctrl-input' type="text" v-model.trim="order_info.close_time" disabled>
        </div>
        <div class='form-ctrl-inputlabel'>
            <div class='input-titles'>
                <div class='input-main-title'>開團者匯款帳號</div>
                <div class='input-sub-title'></div>
            </div>
            <input class='form-ctrl-input' type="text" v-model.trim="order_info.bank_info" disabled>
        </div>
    </div>
</div>

</div>
    `,
    data: function () {
      return {
        count: 0
      }
    },
    props: ['order_info'],
})

Vue.component('shop-cart-info-table', {
    template:`
<div>
<div style='display: flex;justify-content: space-between;align-items: baseline;'>
    <div style='display: flex;align-items: baseline;'>
        <div>點餐者: {{shop_cart_data_list[0].shopper_name}}</div>
        <template v-if="allow_pay==true">
            <div v-if="shop_cart_data_list[0].pay==false" class="ts-btn btn-open"
                @click="clickPayBtn(shop_cart_data_list, true)"
            >去付款</div>
            <div v-else class="ts-btn btn-notwork"
            >已付款</div>

        </template>
        <div v-else style="color:red;font-size:var(--sub-font-size);">購物車單號: {{shop_cart_id}}</div>
    </div>
    <div style='display: flex;'>
        <i class='fas fa-trash-alt'
            v-if="allow_del"
            @click="Vue_OrderSystem.clickDelShopCartByShopCartIDBtn(shop_cart_id,shop_cart_data_list)"
        ></i>
    </div>
</div>
<table class='ts-table'>
    <thead>
        <tr>
            <th>品項名稱</th>
            <th>數量</th>
            <th>總額</th>
            <th>備註</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(shop_cart_data, index) in shop_cart_data_list">
            <td>{{shop_cart_data.item_name}}</td>    
            <td>{{shop_cart_data.item_number}}</td>    
            <td>{{shop_cart_data.item_price*shop_cart_data.item_number}}</td>    
            <td>{{shop_cart_data.item_content}}</td>    
            
        </tr>
    </tbody>
</table>

</div>
`,
    props: ['shop_cart_data_list','shop_cart_id', 'allow_del', 'allow_pay'],

    methods: {
        clickPayBtn(shop_cart_data_list, setValue){
            this.$emit('click_pay_btn', {
                "shop_cart_data_list": shop_cart_data_list,
                'setValue': setValue,
            })
        },

    },

})

Vue.component('shop-cart-info-table-shorter', {
    template:`
<div>

<table class='ts-table'>
<thead>
    <tr>
        <th>品項名稱</th>
        <th>數量</th>
        <th>總額</th>
        <th>備註</th>
        <th>點菜人</th>
    </tr>
</thead>
<tbody>
    <tr v-for="(shop_cart_data, S_uniName, index) in shop_cart_data_list_shorter">
        <td>{{shop_cart_data.item_name}}</td>    
        <td>{{shop_cart_data.item_number}}</td>    
        <td>{{shop_cart_data.item_price*shop_cart_data.item_number}}</td>    
        <td>{{shop_cart_data.item_content}}</td>    
        <td>
            <div v-for="(I_number, S_who, index) in shop_cart_data.whoOrder">
                {{S_who}}:{{I_number}}
            </div>
        </td>
    </tr>
</tbody>
</table>

</div>
`,
    props: ['shop_cart_data_list_shorter'],
})

Vue.component('shop-menu-mamager', {
    template:` 
<div style='margin-bottom: .5rem;'>
    <div :class="allow_edit==true?'todo-list-area':''">
        <div class='user-order-window-item-list-group-area'
            v-for="(group, group_index) of shop_menu"
        >
            <div style="display: flex;align-items: center;">
                <i 
                    v-if="allow_edit==true"
                    @click="delMenuGroup(group_index)" 
                    class='fas fa-trash-alt ts-btn btn-close'
                ></i>
                <div class='user-order-window-item-list-group-title' :class="if_allow_edit">
                    <input class="edit-entry-input" v-model="group.name" placeholder="請輸入種類名稱">
                    <div class="edit-entry-label">{{group.name==""?"請輸入種類名稱":group.name}}</div>
                </div>
            </div>
            <div class='user-order-window-item-list-group-items'>
                <div class='user-order-window-item-list-group-item'
                    v-for="(item, item_index) of group.items"
                    @click="allow_click==true?click_order_item(item, shop_info.shop_id, shop_info.shop_name, order_info.order_id):''"
                >
                    <div class='menu-item-mains'>
                        <div class='menu-item-title' :class="if_allow_edit">
                            <input class="edit-entry-input" v-model="item.name" placeholder="請輸入餐點名稱">
                            <span class='edit-entry-label'>{{item.name==""?"請輸入餐點名稱":item.name}}</span>
                        </div>

                        <div class='menu-item-price' :class="if_allow_edit">
                            <input class="edit-entry-input" type="number" v-model="item.price">
                            <span class='edit-entry-label'>{{item.price}}</span>
                        </div>

                        <div class='menu-item-desc' :class="if_allow_edit">
                            <input class="edit-entry-input" v-model="item.desc" placeholder="請輸入餐點介紹(非必要)">
                            <span class='edit-entry-label'>{{item.desc==""?"請輸入餐點介紹(非必要)":item.desc}}</span>
                        </div>
                    </div>
                    <div class='menu-item-btns' v-if="allow_edit==true">
                        <i 
                            @click="delMenuItem(group, item_index)" 
                            class='fas fa-trash-alt ts-btn btn-close'
                            style='margin: 0;'
                        ></i>
                    </div>
                </div>
                <div v-if="allow_edit==true" class='add-item-btn' @click="addNewMenuItem(group)"> + 新增餐點項目</div>
            </div>
        </div>
        <div v-if="allow_edit==true" class='add-item-btn' @click="addNewMenuGroup(shop_menu)"> + 新增餐點大類</div>
    </div>
</div> 
`,
    props: ['shop_menu', 'allow_edit', 'shop_info', 'order_info', 'allow_click'],
    computed: {
        if_allow_edit(){
            if (this.allow_edit==true){
                return "edit-entry"
            }
            return "cant-edit"
        },
    },

    methods:{
        addNewMenuGroup(){
            this.shop_menu.push(
                {
                    name: '',
                    items: [
                    ],
                }
            )
        },
        delMenuGroup(index){
            this.shop_menu.splice(index,1)
        },

        addNewMenuItem(group_data){
            group_data.items.push(
                {
                    name: '',
                    price: 0,
                    desc: '',
                },
            )
        },
        delMenuItem(group_data, item_index){
            group_data.items.splice(item_index,1)
        },

        click_order_item(item_data, shop_id, shop_name, order_id){
            D_emitData = {
                item_data : item_data,
                shop_name : shop_name,
                shop_id : shop_id,
                order_id : order_id,
            }
            this.$emit('click_order_item', D_emitData); 
        },
    },
})

var Vue_OrderSystem =  new Vue({
    el: '#order-system-window',
    data: {
        true_value: true,

        window_chose: 'today_list_window',

        editShopWindowOpen: false,
        deleteShopWindowOpen: false,
        deleteShopCartWindowOpen: false,
        closeOrderCheckWindowOpen: false,
        payShopCartCheckWindowOpen: false,

        pageChose : 0,
        pageListChose : 0,
        pageMaxNum: 10,


        filterStr: '',
        sortBy : '',
        sortValue: -1,
        title_filter: {
            shop_name : {
                'filter_str': '',
                'open': false,
                'show_name': '店家名稱',
            },
            shop_type : {
                'filter_str': '',
                'open': false,
                'show_name': '店家種類',
            },
            shop_score : {
                'filter_str': '',
                'open': false,
                'show_name': '評價',
            },
            shop_info : {
                'filter_str': '',
                'open': false,
                'show_name': '店家資訊',
            },
            shop_des : {
                'filter_str': '',
                'open': false,
                'show_name': '備註',
            },
            last_modify_date : {
                'filter_str': '',
                'open': false,
                'show_name': '修改日期',
            },
        },

        shop_info_chosed: {},

        darg_type: '',
        darg_item: {
            'type': '',
            'item': null,
            'index': -1,
        },


        // 商店列表相關
        tableInfoList : [],
        shopListUpdateing: false,


        // 開團相關資訊
        orderInfo: {},

        // 今日訂餐相關資訊
        todayOrderListUpdateing: false,
        todayOrderList : [],
        todayOrderChosedNum: 0,

        chosedOrderData: {
            'order_info': {},
            'shop_info': {},
        },

        addOrderWindowOpen: false,
        addOrderWindowData: {
            data : {},
            content : "",
            number: 0,
            order_id: "",
        },

        shoppingCar : {},
        shopperName: '',

        // 結單相關資訊
        allShopCartOrderInfo: {},
        allShopCartData: [],

        short_checkbox: false,

        delCheckInfo: {
            'shop_cart_id': '',
            'shop_cart_list': [],
        },

        closeCheckOrderID: '',


        // 付款相關資訊
        only_not_pay_checkbox: false,
        payCheckInfo: {
            'shop_cart_id': '',
            'shop_cart_list': [],
            'setValue': false,
        },
    },

    computed: {
		tableData(){
            if (this.sortBy != ""){
                afterSortList = []
                var sortByList = []
                for (let itemInfo of this.tableInfoList){
                    sortByList.push([itemInfo[this.sortBy],itemInfo])
                }
                
                if (this.sortBy == 'id'){
                    sortByList.sort(function(a, b) {
                        return a - b;
                      });
                } else {
                    sortByList.sort()
                }

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
                    for (key of Object.keys(this.title_filter)){
                        if ((''+itemInfo[key]).indexOf(this.filterStr.trim())!= -1){
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

        isShopperCartEmpty(){
            if (Object.keys(this.shoppingCar).length==0){
                return true
            }
            return false
        },

        // 檢查Shop Editer視窗有沒有錯誤之處
        checkEditerPageInfo(){
            if (this.shop_info_chosed.shop_menu == undefined){
                return []
            }

            let wraningList = []
            if (this.shop_info_chosed.shop_name == ''){
                wraningList.push('商店名稱不得為空')
            }
            if (this.shop_info_chosed.shop_menu.length == 0){
                wraningList.push('菜單目前是空的')
            }

            for (D_group of this.shop_info_chosed.shop_menu){
                if (D_group.name == ''){
                    wraningList.push('菜單項目分類名稱不得為空')
                }
                if (D_group['items'].length == 0){
                    wraningList.push('菜單項目分類內品項目得為空')
                }
                for (D_item of D_group['items']){
                    if (D_item['name'] == ''){
                        wraningList.push('餐點名稱不得為空')
                    }
                }
            }

            return wraningList
        },

        checkNewOrderPageInfo(){
            if (this.orderInfo.order_id == undefined){
                return []
            }
            let wraningList = []

            if (this.orderInfo.owner_name == ''){
                wraningList.push('開團者欄位不得為空')
            }

            return wraningList

        },

        chosedAliveData(){
            try {
                return this.todayOrderList[this.todayOrderChosedNum]
            } catch {
                return undefined
            }
        },

        caledAllShopCart(){
            D_caledAllShopCartData = {}
            for (D_shopCartData of this.allShopCartData){
                if ((this.only_not_pay_checkbox==false) | (D_shopCartData.pay==false)){
                    if (D_caledAllShopCartData[D_shopCartData.shop_cart_id] == undefined){
                        D_caledAllShopCartData[D_shopCartData.shop_cart_id] = []
                    }
                    D_caledAllShopCartData[D_shopCartData.shop_cart_id].push(D_shopCartData)
                }
            }
            return D_caledAllShopCartData
        },

        caledAllShopCartMoney(){
            I_money = 0

            for (D_shopCartData of this.allShopCartData){
                I_money = I_money + (D_shopCartData.item_price*D_shopCartData.item_number)
            }
            return I_money
        },

        caledAllShopCart_Short(){
            D_allList = {}
            for (D_shopCartData of this.allShopCartData){
                S_uniStr = D_shopCartData.item_name + "_" + D_shopCartData.item_content
                if (D_allList[S_uniStr] == undefined){
                    D_allList[S_uniStr] = {
                        item_name : D_shopCartData.item_name,
                        item_content : D_shopCartData.item_content,
                        item_number : 0,
                        item_price : D_shopCartData.item_price,
                        whoOrder: {},
                    }
                }
                D_allList[S_uniStr].item_number += D_shopCartData.item_number

                if (D_allList[S_uniStr].whoOrder[D_shopCartData.shopper_name] == undefined){
                    D_allList[S_uniStr].whoOrder[D_shopCartData.shopper_name] = 0
                }
                D_allList[S_uniStr].whoOrder[D_shopCartData.shopper_name] += D_shopCartData.item_number
            }   

            return D_allList
        },
    },

    methods:{
        sortByBtmChose(sortByStr){
            if (this.sortBy == sortByStr){
                this.sortValue = this.sortValue * -1
            } else {
                this.sortValue = 1
            }
            this.sortBy = sortByStr
        },

        init_shop_info_chosed(){
            this.shop_info_chosed = {
                'shop_id': uuidv4(),
                'shop_type': '餐廳',
                'shop_name': '',
                'shop_score': 0,
                'shop_phoneNum': '',
                'shop_des': '',
                'shop_address': '',
                'shop_img': '',
                'shop_menu': [],
            }
        },

        clickEditBtn(S_shop_id){
			fetch('/TreeStudioAPIs/OrderSys_ShopInfo_Manager/'+S_shop_id+'/', {
                method: 'GET'
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
                myJson['data']['shop_menu'] = JSON.parse(myJson['data']['shop_menu'])
                Vue_OrderSystem.shop_info_chosed = myJson['data']
                Vue_OrderSystem.window_chose = 'edit_window'
			});
        },

        onDrop(evt){
            console.log(evt)
        },

        openShopListWindow(){
            this.window_chose='shop_list_window'
            this.updateShopList()
        },


        clickDeleteShopBtn(S_shop_id){
			fetch('/TreeStudioAPIs/OrderSys_ShopInfo_Manager/'+S_shop_id+'/', {
                method: 'GET'
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
                myJson['data']['shop_menu'] = JSON.parse(myJson['data']['shop_menu'])
                Vue_OrderSystem.shop_info_chosed = myJson['data']
                Vue_OrderSystem.deleteShopWindowOpen = true
			});
        },

        addNewOrderToShoppingCart(D_orderInfo){
            D_input = {
                'order_id': D_orderInfo.order_id,
                'shop_name': D_orderInfo.shop_name,
                'shop_id': D_orderInfo.shop_id,
                'name': D_orderInfo.data.name,
                'price': D_orderInfo.data.price,
                'number': D_orderInfo.number,
                'content': D_orderInfo.content,
            }
            if (this.shoppingCar[D_orderInfo.order_id] == undefined){
                Vue.set(this.shoppingCar,D_orderInfo.order_id,[])
            }
            this.shoppingCar[D_orderInfo.order_id].push(D_input)
            this.addOrderWindowOpen = false
        },

        removeOrderOnCart(order_id, index){
            this.shoppingCar[order_id].splice(index,1)
        },
        
        switchShopCartPayStatus(shop_cart_id, setValue){
            var form = new FormData();
            form.append("shop_cart_id",shop_cart_id)
            form.append("pay",setValue)

			fetch('/TreeStudioAPIs/OrderSys_ShopCart_Manager/', {
				method: 'POST',
				body: form,
                mode: 'same-origin',
                headers: {'X-CSRFToken': csrftoken}
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
				console.log(myJson);
                v_console.log('付款成功')
                Vue_OrderSystem.payShopCartCheckWindowOpen = false
                Vue_OrderSystem.uploadAllShopCartDataByOrderID(
                    Vue_OrderSystem.payCheckInfo.shop_cart_list[0].order_id
                )

			});
        },
        openPayShopCartCheckWindow(shop_cart_data, setValue){
            console.log(shop_cart_data.shop_cart_data_list[0].shop_cart_id)
            this.payShopCartCheckWindowOpen = true
            this.payCheckInfo= {
                'shop_cart_id': shop_cart_data.shop_cart_data_list[0].shop_cart_id,
                'shop_cart_list': shop_cart_data.shop_cart_data_list,
                'setValue': shop_cart_data.setValue,
            }
        },


        // 已結單後視窗專用
        openClosedOrderWindow(order_id){
            this.window_chose='closed_order_window'
            this.getOrderInfos(order_id)
            this.uploadAllShopCartDataByOrderID(order_id)
        },

        // 訂餐列表專用
        openOrderListWindow(){
            this.window_chose='today_list_window'
            this.uploadTodayOrderInfo()
        },

        // 結單視窗專用
        clickOpenAllShopCartBtn(D_orderInfo){
            this.window_chose='all_shopcart_window'
            this.allShopCartOrderInfo = D_orderInfo
            this.uploadAllShopCartDataByOrderID(D_orderInfo.order_id)
        },

        uploadAllShopCartDataByOrderID(S_orderID){
            fetch_uploadAllShopCartDataByOrderID = this.getAllShopCartByOrderID(S_orderID)
			.then(function(myJson) {
                Vue_OrderSystem.allShopCartData = myJson
			});

            return fetch_uploadAllShopCartDataByOrderID
        },

        clickDelShopCartByShopCartIDBtn(shop_cart_id,shop_cart_data_list){
            this.delCheckInfo = {
                'shop_cart_id': shop_cart_id,
                'shop_cart_list': shop_cart_data_list,
            }
            this.deleteShopCartWindowOpen=true
        },

        // 結單確認視窗專用
        clickOpenCloseOrderCheckWindowBtn(order_id){
            this.closeOrderCheckWindowOpen = true
            this.closeCheckOrderID = order_id
        },

        clickCloseOrderBtn(order_id){
            this.closeOrder(order_id)
            .then(function(return_json) {
                console.log(return_json)
				v_console.log('結單成功')
                Vue_OrderSystem.closeOrderCheckWindowOpen = false
                Vue_OrderSystem.openOrderListWindow()

			})
        },
        
        // 點餐視窗專用
        openOrderWindow(order_id){
            this.window_chose='order_window'
            this.getOrderInfos(order_id)
        },

        clickOrderItem(D_data){
            console.log(D_data)
            if (D_data == undefined){
                return null
            }
            this.addOrderWindowData.data = D_data.item_data
            this.addOrderWindowData.content = ""
            this.addOrderWindowData.number = 0
            this.addOrderWindowData.shop_name = D_data.shop_name
            this.addOrderWindowData.shop_id = D_data.shop_id
            this.addOrderWindowData.order_id = D_data.order_id
            this.addOrderWindowOpen = true
        },

        // open new order 專用
        clickOpenShopBtn(S_shop_id){
            this.window_chose='open_shop_window'
            this.setNewOrderData(S_shop_id)
        },

        setNewOrderData(S_shop_id){
            this.orderInfo = {
                'order_id': uuidv4(),
                'owner_name': '',
                'close_time': '',
                'bank_info' : '',
                'shop_id' : S_shop_id,
                'shop_info': {},
            }
			fetch('/TreeStudioAPIs/OrderSys_ShopInfo_Manager/'+S_shop_id+'/', {
                method: 'GET'
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
                myJson['data']['shop_menu'] = JSON.parse(myJson['data']['shop_menu'])
                Vue_OrderSystem.orderInfo.shop_info = myJson['data']
			});

        },

        // edit 專用
        clickAddNewShopBtn(){
            this.window_chose='edit_window'
            this.init_shop_info_chosed()
        },


        // db連線 - 通用
        getShopInfo(S_shopID){
			fetch_getShopInfo = fetch('/TreeStudioAPIs/OrderSys_ShopInfo_Manager/'+S_shopID+'/', {
                method: 'GET'
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
                myJson['data']["shop_menu"] = JSON.parse(myJson['data']["shop_menu"])
                return myJson['data']
			});
            return fetch_getShopInfo
        },

        getOrderInfo(S_orderID){
			fetch_getOrderInfo = fetch('/TreeStudioAPIs/OrderSys_OrderInfo_Manager/'+S_orderID+'/', {
                method: 'GET'
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
                return myJson['data']
			});
            return fetch_getOrderInfo
        },

        closeOrder(S_orderID){
			fetch_closeOrder = fetch('/TreeStudioAPIs/OrderSys_OrderInfo_Manager_Switch_By_Order_Id/'+S_orderID+'/0/', {
                method: 'GET'
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
                return myJson['data']
			});
            return fetch_closeOrder
        },

        getAllShopCartByOrderID(S_orderID){
			fetch_getAllShopCartByOrderID = fetch('/TreeStudioAPIs/Get_All_ShopCart_By_OrderID/'+S_orderID+'/', {
                method: 'GET'
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
                return myJson['data']
			});
            return fetch_getAllShopCartByOrderID
        },

        // db連線 - shop cart db
        uploadShopCartInfo(L_cartDatas){
            console.log(L_cartDatas)
            shop_cart_id = uuidv4()
            var form = new FormData();
            form.append("shop_cart_id",shop_cart_id)
            form.append("shopper_name",this.shopperName)
            form.append("shop_cart_data",JSON.stringify(L_cartDatas))

			fetch('/TreeStudioAPIs/OrderSys_ShopCart_Manager/', {
				method: 'POST',
				body: form,
                mode: 'same-origin',
                headers: {'X-CSRFToken': csrftoken}
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
				console.log(myJson);
                Vue.delete(Vue_OrderSystem.shoppingCar, L_cartDatas[0].order_id)
			});

        },

        delAllShopCartByShopCart(S_shopCart_id){
            console.log(S_shopCart_id)
			fetch('/TreeStudioAPIs/OrderSys_ShopCart_Manager/'+S_shopCart_id+'/', {
                method: 'DELETE',
                mode: 'same-origin',
                headers: {'X-CSRFToken': csrftoken},
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
                v_console.success("上傳的購物車刪除成功")
                Vue_OrderSystem.deleteShopCartWindowOpen=false
                if (Vue_OrderSystem.allShopCartOrderInfo.order_id != undefined){
                    Vue_OrderSystem.uploadAllShopCartDataByOrderID(
                        Vue_OrderSystem.allShopCartOrderInfo.order_id
                    )
                }
			});

        },

        delAllShopCartByOrderID(S_order_id){
			fetch_delAllShopCartByOrderID = fetch('/TreeStudioAPIs/Del_All_ShopCart_By_OrderID/'+S_order_id+'/', {
                method: 'DELETE',
                mode: 'same-origin',
                headers: {'X-CSRFToken': csrftoken},
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
                v_console.success("所有上傳的購物車刪除成功")
			});
            return fetch_delAllShopCartByOrderID
        },

        // db連線 - today order info
        uploadTodayOrderInfo(){
            this.todayOrderListUpdateing = true
			fetch('/TreeStudioAPIs/OrderSys_OrderInfo_Manager_GetTodayOrder/', {
                method: 'GET'
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
                v_console.success("未關閉訂單更新完成")
                Vue_OrderSystem.todayOrderList = myJson['data']
                Vue_OrderSystem.todayOrderListUpdateing = false
                // if (Vue_OrderSystem.todayOrderList.length==1){
                //     Vue_OrderSystem.getOrderInfos(myJson['data'][0].order_id)
                // } else {
                //     Vue_OrderSystem.chosedOrderData['shop_info'] = {}
                // }
			}); 
        },

        getOrderInfos(S_orderID){
            this.getOrderInfo(S_orderID)
            .then(function(orderData) {
                Vue_OrderSystem.chosedOrderData['order_info'] = orderData
                S_shopID = orderData.shop_id

				return S_shopID;
			})
            .then(function(S_shopID) {
                Vue_OrderSystem.getShopInfo(S_shopID)
                .then(function(D_shopData) {
                    Vue_OrderSystem.chosedOrderData['shop_info'] = D_shopData
                })
                
			}) 
        },

        // db連線 - shop info
        uploadNewShopInfo(){
			var form = new FormData();
			form.append("shop_id", this.shop_info_chosed['shop_id'])
            form.append("shop_type", this.shop_info_chosed['shop_type'])
            form.append("shop_name", this.shop_info_chosed['shop_name'])
            form.append("shop_score", this.shop_info_chosed['shop_score'])
            form.append("shop_phoneNum", this.shop_info_chosed['shop_phoneNum'])
            form.append("shop_des", this.shop_info_chosed['shop_des'])
            form.append("shop_address", this.shop_info_chosed['shop_address'])
            form.append("shop_img", this.shop_info_chosed['shop_img'])
            form.append("shop_menu", JSON.stringify(this.shop_info_chosed['shop_menu']))
            
			fetch('/TreeStudioAPIs/OrderSys_ShopInfo_Manager/', {
				method: 'POST',
				body: form,
                mode: 'same-origin',
                headers: {'X-CSRFToken': csrftoken}
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
				console.log(myJson);
                v_console.success("餐廳新增完成")
                Vue_OrderSystem.init_shop_info_chosed()
                Vue_OrderSystem.window_chose = 'shop_list_window'
                Vue_OrderSystem.updateShopList()
                Vue_OrderSystem.editShopWindowOpen = false
			});
        },
        updateShopList(){
            this.shopListUpdateing = true
			fetch('/TreeStudioAPIs/OrderSys_ShopInfo_Manager/', {
                method: 'GET'
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
                v_console.success("餐廳列表完成")
                Vue_OrderSystem.tableInfoList = myJson['data']
                Vue_OrderSystem.shopListUpdateing = false
			});
        },
        deleteShopInfo(S_shop_id){
			fetch('/TreeStudioAPIs/OrderSys_ShopInfo_Manager/'+S_shop_id+'/', {
                method: 'DELETE',
                mode: 'same-origin',
                headers: {'X-CSRFToken': csrftoken},
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
                v_console.success("餐廳刪除成功")
                Vue_OrderSystem.updateShopList()
                Vue_OrderSystem.deleteShopWindowOpen=false
			});
        },

        // db連線 - order info
        uploadNewOrderInfo(){
			var form = new FormData();
			form.append("order_id", this.orderInfo['order_id'])
            form.append("owner_name", this.orderInfo['owner_name'])
            form.append("close_time", this.orderInfo['close_time'])
            form.append("bank_info", this.orderInfo['bank_info'])
            form.append("shop_id", this.orderInfo['shop_id'])

			fetch('/TreeStudioAPIs/OrderSys_OrderInfo_Manager/', {
                // method: 'GET'
				method: 'POST',
				body: form,
                mode: 'same-origin',
                headers: {'X-CSRFToken': csrftoken}
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
				console.log(myJson);
                v_console.success("開新團完成")
                Vue_OrderSystem.window_chose = 'today_window'
			});
        },
        delOrderInfo(S_order_id){
            this.delAllShopCartByOrderID(S_order_id)
            .then(function(myJson) {
                fetch('/TreeStudioAPIs/OrderSys_OrderInfo_Manager/'+S_order_id+'/', {
                    method: 'DELETE',
                    mode: 'same-origin',
                    headers: {'X-CSRFToken': csrftoken},
                }).then(function(response) {
                    return response.json();
                })
                .then(function(myJson) {
                    console.log(myJson)
                    v_console.success("團訂定單刪除成功")
                    Vue_OrderSystem.uploadTodayOrderInfo()
                });
            })
        },

        // 拖拉區域
        menu_item_drag_start(evt, group_data, group_index, item_data, item_index){
            console.log("item start:",item_data, item_index)
            this.darg_item = {
                'type': 'item',
                'item': item_data,
                'index': item_index,
                'group': group_data,
                'group_index': group_index,
            }
        },

        menu_item_drag_end(evt, item_data, item_index){
            console.log("item end:",item_data, item_index)
            this.darg_item = {
                'type': '',
                'item': null,
                'index': -1,
            }
        },
        drop_on_item(evt, item_data, item_index){
            console.log("drop_on_item:",item_data, item_index)
        },
        menu_item_drag_over(evt, item_data, item_index){
            // console.log("item over:",item_data, item_index)
        },

        menu_group_drag_start(evt, group_data, group_index){
            console.log("group start:",group_data, group_index)
            this.darg_item = {
                'type': 'group',
                'item': group_data,
                'index': group_index,
            }
        },
        menu_group_drag_end(evt, group_data, group_index){
            console.log("group end:",group_data, group_index)
            this.darg_item = {
                'type': '',
                'item': null,
                'index': -1,
            }
        },
        drop_on_group(evt, group_data, group_index){
            console.log("drop_on_group:",group_data, group_index)
            if (this.darg_item.type == 'item'){
                group_data.items.push(this.darg_item.item)
                this.darg_item.group.items.splice(this.darg_item.index,1)
            }
        },
    },

    created: function () {
    },

    mounted(){
        this.init_shop_info_chosed()
    },

    updated: function () {
    },
})
