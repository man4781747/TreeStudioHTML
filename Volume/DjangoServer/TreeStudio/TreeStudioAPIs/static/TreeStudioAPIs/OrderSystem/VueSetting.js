Vue.component('shop-info-table', {
    template: `
<div>
<div style=''>
<div class='input-group-main-title'>店家資訊
    <div class='input-group-main-sub-title'></div>
</div>
<div class='form-inputlabel-list'>
    <div class='form-ctrl-inputlabel-big'>
        <div class='input-titles'>
            <div class='input-main-title'>店家圖片</div>
        </div>
        <div style="position: absolute;right: 0;top: 0;">
            <label>縮圖顯示</label><input type='checkbox' v-model="edit_shopImgShort">
        </div>
        <div style='border: 1px #d0d0d0 solid;
        border-radius: 4px;position: relative;overflow: hidden;
        min-height: var(--shop-pic-height);'
        >
            <div style="position: absolute;
                height: 100%;
                width: 100%;z-index: 2;"
                :style="edit_shopImgShort?'background: rgba(0,0,0,.5);':''"
            ></div>
            <img v-if="shop_info_chosed.shop_picture" :src="shop_info_chosed.shop_picture" 
                style="height: unset;width: 100%;"
                :style="edit_shopImgShort?'position: absolute;transform: translateY(calc(-50% + 60px) );':''"
            />
            <img v-else 
                style="height: unset;width: 100%;"
                :style="edit_shopImgShort?'position: absolute;transform: translateY(calc(-50% + 60px) );':''"
                src="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC8yMzdjYzQ4Mi0xZmJiLTQ2NmQtYjZmOS02MWZhMzQ5OTMzODIuanBlZw==">
        </div>


    </div>
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
            <div class='input-main-title'>評價</div>
            <div class='input-sub-title'></div>
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
    <div class='form-ctrl-inputlabel-big'>
        <div class='input-titles'>
            <div class='input-main-title'>店家簡介</div>
            <div class='input-sub-title'></div>
        </div>
        <input class='form-ctrl-input' type="text" v-model.trim="shop_info_chosed.shop_description" disabled>
    </div>    
</div>
</div>
<div style=''>
<div class='input-group-main-title'
>店家菜單
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
        edit_shopImgShort: true,
      }
    },
    props: ['shop_info_chosed'],
})

Vue.component('order-info-table', {
    template: `
<div>
<div style='margin-bottom: .5rem;'>
    <div class='input-group-main-title'>團長資訊
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
                <div class='input-main-title'>團長*</div>
                <div class='input-sub-title'></div>
            </div>
            <input class='form-ctrl-input' type="text" v-model.trim="order_info.owner_name" disabled>
        </div>
        <!-- <div class='form-ctrl-inputlabel'>
            <div class='input-titles'>
                <div class='input-main-title'>訂單截止時間</div>
                <div class='input-sub-title'></div>
            </div>
            <input class='form-ctrl-input' type="text" v-model.trim="order_info.close_time" disabled>
        </div> -->
        <div class='form-ctrl-inputlabel'>
            <div class='input-titles'>
                <div class='input-main-title'>團長匯款帳號</div>
                <div class='input-sub-title'></div>
            </div>
            <input class='form-ctrl-input' type="text" v-model.trim="order_info.bank_info" disabled>
        </div>
        <div class='form-ctrl-inputlabel'>
            <div class='input-titles'>
                <div class='input-main-title'>團長匯款帳號QR Code</div>
                <div class='input-sub-title'></div>
            </div>
            <input v-if="order_info.bank_info_qr_code==''" class='form-ctrl-input' placeholder="" disabled>
            <img v-else :src="order_info.bank_info_qr_code" style="height: unset;"/>
        </div>
        <div class='form-ctrl-inputlabel'>
            <div class='input-titles'>
                <div class='input-main-title'>開團備註</div>
                <div class='input-sub-title'></div>
            </div>
            <input class='form-ctrl-input' type="text" v-model.trim="order_info.order_description" disabled>
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
            <div 
                style="margin-left: 0.5rem;"
                v-if="shop_cart_data_list[0].pay==false" class="ts-btn btn-open"
                @click="clickPayBtn(shop_cart_data_list, true)"
            >去付款</div>
            <div 
                style="margin-left: 0.5rem;"
                v-else class="ts-btn btn-notwork"
            >已付款</div>

        </template>
        <div v-else style="color:red;font-size:var(--sub-font-size);">購物車單號: {{shop_cart_id}}</div>
    </div>
    <div style='display: flex;'>
        <i class='fas fa-trash-alt'
            v-if="allow_del"
            @click="clickDelShopCartBtn(shop_cart_id, shop_cart_data_list)"
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

        clickDelShopCartBtn(shop_cart_id, shop_cart_data_list){
            this.$emit('del_shop_cart_id', shop_cart_id, shop_cart_data_list)
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
<div style=''>
    <div :class="allow_edit==true?'todo-list-area':'todo-list-area'">
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
                    <input class="edit-entry-input" v-model="group.name" placeholder="請輸入分類名稱">
                    <div class="edit-entry-label">{{group.name==""?"請輸入分類名稱":group.name}}</div>
                </div>
            </div>
            <hr style="margin: 0;margin-bottom: 0.25rem;">
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
                            <input class="edit-entry-input" type="number" v-model="item.price" @change="onlyPositiveInt(item,'price')">
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
                <div v-if="allow_edit==true" class='add-item-btn' @click="addNewMenuItem(group)"> + 新增品項</div>
            </div>
        </div>
        <div v-if="allow_edit==true" class='add-item-btn' @click="addNewMenuGroup(shop_menu)"> + 新增分類</div>
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
            this.$emit('menu_changed', true)
        },
        delMenuGroup(index){
            this.shop_menu.splice(index,1)
            this.$emit('menu_changed', true)
        },

        addNewMenuItem(group_data){
            group_data.items.push(
                {
                    name: '',
                    price: 0,
                    desc: '',
                },
            )
            this.$emit('menu_changed', true)
        },
        delMenuItem(group_data, item_index){
            group_data.items.splice(item_index,1)
            this.$emit('menu_changed', true)
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

        onlyPositiveInt(item,name){
            inputValue = parseInt(item[name])
            if (isNaN(inputValue)){
                inputValue = 0
            }
            if (inputValue < 0){
                inputValue = 0
            }
            Vue.set(item, name,inputValue )
        },
    },
})

Vue.component('five-star-score', {
    template:` 
<div style="text-align: center;display: inline-flex;">
    <div style="position: relative;display:inline-flex;width: min-content;">
        <i 
            v-for="i of [1,2,3,4,5]"
            class="far fa-star"
            @click="edit_able?setScore(i):''"
        ></i>
        <div
            style="position: absolute;
            top: 0;pointer-events: none;
            overflow: hidden;display: flex;
            white-space: nowrap;"
            :style="'width:'+(100*score/5)+'%;'"
        >
            <i v-for="i in [0,0,0,0,0]" class="fas fa-star"
                style="color: var(--yellow);"
            ></i>
        </div>
    </div>
</div>
`,
    props: ['score', 'edit_able'],
    methods:{
        setScore(score){
            this.score = score
            this.$emit('set_score', score)
        },
    },
})

Vue.component('message-board-textarea', {
    template:` 
<div style='margin-bottom: .5rem;'>
    <div class='input-group-main-title' style="justify-content: space-between;">
        我有話要說
    </div>
    <div class='form-inputlabel-list'>
        <div class='form-ctrl-inputlabel'>
            <div class='input-titles'>
                <div class='input-main-title'>我是誰</div>
                <div class='input-sub-title'></div>
            </div>
            <input class='form-ctrl-input' type="text" v-model="who" placeholder="你是誰">
        </div>
        <div class='form-ctrl-inputlabel'>
            <div class='input-titles'>
                <div class='input-main-title'>評分</div>
                <div class='input-sub-title'></div>
            </div>
            <five-star-score
                style="font-size: 1.5rem;"
                v-bind:score="score"
                v-bind:edit_able=true
                @set_score="setScore"
            ></five-star-score>
        </div>
        <div class='form-ctrl-inputlabel-big'' style='margin-bottom: 0.5rem;'>
            <div class='input-titles'>
                <div class='input-main-title'>標題</div>
                <div class='input-sub-title'></div>
            </div>
            <input class='form-ctrl-input' type="text" v-model="title" placeholder="請輸入標題">
        </div>
        <div class='form-ctrl-inputlabel-big'>
            <div class='input-titles'>
                <div class='input-main-title'>內容</div>
                <div class='input-sub-title'></div>
            </div>
            <form method="post">
                <textarea :id="'shop-message-board-'+shop_id" name="editordata"></textarea>
            </form>
        </div>
    </div>

    <div class='form-inputlabel-list'>
        <div class='form-ctrl-inputlabel-big'>
            <button 
            v-if="checkEditerInfo.length==0"
            class='ts-btn btn-active input-submit-btn'
            @click="uploadMessage()"
            >送出</button>

            <div v-else>
                <button
                style="position:relative;z-index: 2;"
                class='ts-btn btn-notwork input-submit-btn'
                >
                    無法送出
                </button>
                <div class='input-submit-btn-warning-window'>
                    <ul>
                        <li v-for="waringString of checkEditerInfo">
                            {{waringString}}
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</div>
`,
    props: ['shop_id'],

    data: function () {
        return {
            who: '',
            title: '',
            content: '',
            score: 3,
        }
    },

    computed:{
        checkEditerInfo(){
            returnList = []
            if (this.who == ""){
                returnList.push("請輸入你是誰")
            }
            if (this.title == ""){
                returnList.push("標題不可為空")
            }

            return returnList
        }, 
    },

    methods:{
        setRandomWho(){
            L_whoList = ["海鷗","鴿子","鶴","老鷹","麻雀","燕子","天鵝","鵝","啄木鳥","鸚鵡","烏鴉","金絲雀","紅鶴","貓頭鷹","孔雀","企鵝","雞","火雞","鴨子","黑面琵鷺","美洲豹","雲豹","石虎","印度豹","獅子","老虎","獾","豬","公豬","熊","浣熊","棕熊","蝙蝠","刺蝟","鴨嘴獸","土撥鼠","驢子","馬","駱駝","臭鼬","熊貓","馬來膜"]
            this.who = "匿名"+L_whoList[Math.floor(Math.random()*L_whoList.length)+0]
        },

        getTextareaContent(){
            return $('#shop-message-board-'+this.shop_id).summernote('code')
        },

        setScore(score){
            this.score = score
        },

        uploadMessage(){
            var ThisComp = this
            message_id = uuidv4()
            var form = new FormData();
            form.append("message_id",message_id)
            form.append("shop_id",this.shop_id)
            form.append("who",this.who)
            form.append("title",this.title)
            form.append("score",this.score)
            form.append("content",this.getTextareaContent())
            
			fetch('/TreeStudioAPIs/OrderSys_Message_Manager/', {
				method: 'POST',
				body: form,
                mode: 'same-origin',
                headers: {'X-CSRFToken': csrftoken}
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
				console.log(myJson);
                v_console.log("送出留言成功");
                $('#shop-message-board-'+ThisComp.shop_id).summernote('code', '')
                ThisComp.title = ""
                ThisComp.setRandomWho()
                ThisComp.$emit("send_done", ThisComp.shop_id)
			});


        },
    },

    mounted(){
        var This = this
        $(document).ready(function() {
            $('#shop-message-board-'+This.shop_id).summernote({
                placeholder: '請輸入內容',
                height: 200,
                lang: 'zh-TW',
                toolbar: [
                    ['style', ['style']],
                    ['font', ['bold', 'underline', 'clear']],
                    ['fontname', ['fontname']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link', 'picture', 'video']],
                    ['height', ['height']],
                    ['view', ['codeview', 'help']],
                ],
            });
        });
        this.setRandomWho()
    },

})

Vue.component('shop-info-title-window', {
    template: `
<div class="user-order-window-title-area" style="margin-bottom: 0.5rem;">
    <div class="user-order-window-title-image">
        <img v-if="shop_info.shop_picture" :src="shop_info.shop_picture" 
        style="width: 100%;"/>
        <img v-else src="https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC8yMzdjYzQ4Mi0xZmJiLTQ2NmQtYjZmOS02MWZhMzQ5OTMzODIuanBlZw=="
            style='width:100%;'
        >
    </div>
    <div class="user-order-window-title-infos">
        <div style="position: absolute;bottom:0;padding: 0.5rem;">
            <div class="user-order-window-title-shop-name">
                {{shop_info.shop_name}}
            </div>
            <div class="user-order-window-title-shop-score">
                <five-star-score
                    v-bind:score="shop_info.shop_score"
                ></five-star-score>
            </div>
            <div class="user-order-window-title-shop-description">
                {{shop_info.shop_description}}
            </div>
        </div>
    </div>
    <div 
        v-if="allow_shop_carts==true"
        @click="clickOpenAllShopCartBtn(order_info)" 
        style="position: absolute;z-index: 2;right: 0;bottom:.5rem;"
        class="ts-btn btn-close"
    >
        查看點單資訊<i class="fas fa-shipping-fast"></i>
    </div>
</div>
    `,
    props: ['shop_info', 'order_info', 'allow_shop_carts'],
    methods: {
        clickOpenAllShopCartBtn(order_info){
            this.$emit('click_open_all_shop_cart_btn', order_info)
        },
    },
})

Vue.component('new-message-table', {
    template: `
<div style='margin-bottom: .5rem;'>
        <div class='input-group-main-title'>
            最新評價
            <i class="far fa-list-alt ts-btn btn-open"
                v-if="allow_link_all_message_page == true"
                @click="$emit('open_all_massage', shop_id)"
            ></i>
            <div class='input-group-main-sub-title'></div>
        </div>
    <table class="ts-table" style='width: 100%;'>
        <colgroup>
            <col style="width: 1px;">
            <col style="">
        </colgroup>
        <tbody>
            <tr v-for="(D_info, index) in messageList">
                <td style="padding: 0.4rem 0.75rem;display:flex;align-items: center;border:0;">
                    <div style="display:flex;justify-content: space-between;">
                        <five-star-score
                            v-bind:score="D_info.score"
                        ></five-star-score>
                        <div style='white-space: nowrap;margin-left: .75rem;'><label style='font-weight: bolder;'>{{D_info.who}} 說: </label>{{D_info.title}}</div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
    `,
    props: ['shop_id', 'allow_link_all_message_page'],
    data: function () {
        return {
            messageList: null,
        }
    },
    methods:{
        uploadMessageList(shop_id){
            var This = this
            this.shop_id = shop_id
			fetch('/TreeStudioAPIs/OrderSys_Message_Manager/shop/'+shop_id+'/5/', {
                method: 'GET'
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
                This.messageList = myJson['data']
			});
        },
    },
    mounted(){
    },
})

Vue.component('all-message-table', {
    template: `
<div>
<div style='margin-bottom: .5rem;'>
    <div class='input-group-main-title'>留言討論區
        <i class="fas fa-clipboard-list ts-btn btn-open"
            @click="$emit('close_all_massage', shop_id)"
        ></i>
        <div class='input-group-main-sub-title'></div>
    </div>
</div>

<div style='display: flex;place-content: space-between;align-items: center;'>
    <div style='display: flex;align-items: center;'>
        <i class="fas fa-sync-alt ts-btn btn-update" @click="updateTableInfoList(shop_id)" style="line-height: 1;"></i>
        最大顯示筆數: 
        <select v-model="pageMaxNum" style='font-size: 1.1rem;'>
            <option value=10>10</option>
            <option value=20>20</option>
            <option value=50>50</option>
            <option value=100 selected>100</option>
            <option value=9999999>-</option>
        </select>
    </div>
    <div class='search-bar'>
        <input v-model="filterStr">
        <i class="fas fa-search " @click=""></i>
    </div>
</div>

<table class='ts-table'>
    <thead>
        <tr>
            <th v-for='(filter_info, filter_name, filter_index) in title_filter'
                :style="filter_name!='title'?'width: 1px;':''"
            >
                <div class='table-header-item mouse-pointer' @click="sortByBtmChose(filter_name)">
                    <div class='table-title-and-filter'>
                        <i 
                            v-if="filter_info.no_filter != true"
                            class="fas fa-filter" 
                            @click.stop="filter_info.open=!filter_info.open"
                            :style="filter_info.filter_str.trim()!=''?'color:var(--title-color);':''"
                        ></i>
                        <div v-if='!filter_info.open'>
                            {{filter_info.show_name}}
                        </div>
                        <input @click.stop v-else v-model.trim='filter_info.filter_str'>
                    </div>
                    <div style='position: relative;'>
                        <i class="fas fa-sort-down" style='position: absolute;right: 0;bottom: 0;' :style='"color:"+(
                            (sortBy==filter_name&sortValue==1)?"#000":"#999"
                            )+";"'></i>
                        <i class="fas fa-sort-up" :style='"color:"+(
                            (sortBy==filter_name&sortValue==-1)?"#000":"#999"
                            )+";"'></i>
                    </div>
                </div>
            </th>
        </tr>
    </thead>
    <tbody class="n2_1_gray">
        <tr v-for="(data, index) in tableData[pageChose]" 
        >
            <template v-for="(info, title, index) in title_filter">
                <td v-if='info.special == "five-star-score"' style="text-align: center;vertical-align: middle;">
                    <five-star-score v-bind:score="data[title]">
                    </five-star-score>
                </td>
                <td v-else-if='info.special=="datetime_format"'>
                    {{ (new Date(data[title])).format('Y-MM-dd') }}
                </td>
                <td v-else-if='title=="title"'>
                    <div class="home-a-link"
                        @click="clickOpenMessageDetailWindowBtn(data['message_id'])"
                    >{{data[title]}}</div>
                </td>
                <td v-else>{{data[title]}}</td> 
            </template>
        </tr>
    </tbody>
</table>

<div style='display: flex;justify-content: space-between;margin: 2px 0;align-items: center;'>
    <div style='transform: translateY(5px);'>總筆數:{{tableRawNum}} (第{{parseInt(pageChose)+1}}頁/共{{tablePageNum}}頁)</div>
    <div class='page-choser'>
        <div v-if="pageListChose==0" class='page-chose-btn page-chose-btn-noactive'>
            <i class="fas fa-angle-double-left"></i>
        </div>
        <div v-else class='page-chose-btn' @click="pageListChose = pageListChose -1">
            <i class="fas fa-angle-double-left"></i>
        </div>
        <div class='page-chose-btn' v-for="pageIndex of pageList[pageListChose]"
            :class="pageIndex == pageChose?'page-chose-btn-chosed':''"
            @click="pageChose = pageIndex"
        >
            {{parseInt(pageIndex) + 1}}
        </div>
        <div v-if="pageListChose==pageList.length-1" class='page-chose-btn page-chose-btn-noactive'>
            <i class="fas fa-angle-double-right"></i>
        </div>
        <div v-else class='page-chose-btn' @click="pageListChose = pageListChose +1">
            <i class="fas fa-angle-double-right"></i>
        </div>
    </div>
</div>
</div>`,
    props: ['shop_id'],
    data: function () {
        return {
            messageList: null,

            tableInfoList: [],

            pageChose : 0,
            pageListChose : 0,
            pageMaxNum: 10,

            filterStr: '',
            sortBy : '',
            sortValue: -1,
            title_filter: {
                who : {
                    'filter_str': '',
                    'open': false,
                    'show_name': '留言者',
                },
                score : {
                    'filter_str': '',
                    'open': false,
                    'show_name': '評分',
                    'special': 'five-star-score',
                    'no_filter': true,
                },
                title : {
                    'filter_str': '',
                    'open': false,
                    'show_name': '標題',
                },
                created : {
                    'filter_str': '',
                    'open': false,
                    'show_name': '時間',
                    'special': 'datetime_format',
                },
            },
        }
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

        updateTableInfoList(shop_id){
            var This = this
            this.shop_id = shop_id
			fetch('/TreeStudioAPIs/OrderSys_Message_Manager/shop/'+shop_id+'/', {
                method: 'GET'
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
                This.tableInfoList = myJson['data']
			});
        },

        clickOpenMessageDetailWindowBtn(message_id){
            this.$emit('open_message_id', message_id)
        },
    },
    mounted(){
    },

})

Vue.component('message-detail-textarea', {
    template:` 
<div style='margin-bottom: .5rem;'>
    <div class='input-group-main-title' style="justify-content: space-between;">
        留言內容
        <i class="fas fa-reply ts-btn btn-open"
            @click="$emit('back_to_all_message_window', messageDetail.shop_id)"
        ></i>
    </div>
    <div class='form-inputlabel-list'>
        <div class='form-ctrl-inputlabel'>
            <div class='input-titles'>
                <div class='input-main-title'>留言者</div>
                <div class='input-sub-title'></div>
            </div>
            <input class='form-ctrl-input' type="text" v-model="messageDetail.who" disable>
        </div>
        <div class='form-ctrl-inputlabel'>
            <div class='input-titles'>
                <div class='input-main-title'>評分</div>
                <div class='input-sub-title'></div>
            </div>
            <five-star-score
                style="font-size: 1.5rem;"
                v-bind:score="messageDetail.score"
                v-bind:edit_able=true
                @set_score="setScore"
            ></five-star-score>
        </div>
        <div class='form-ctrl-inputlabel-big'' style='margin-bottom: 0.5rem;'>
            <div class='input-titles'>
                <div class='input-main-title'>標題</div>
                <div class='input-sub-title'></div>
            </div>
            <input class='form-ctrl-input' type="text" v-model="messageDetail.title" placeholder="請輸入標題">
        </div>
        <div class='form-ctrl-inputlabel-big'>
            <div class='input-titles'>
                <div class='input-main-title'>內容</div>
                <div class='input-sub-title'></div>
            </div>
            <form method="post" v-if="message_id != ''">
                <textarea :id="'message-detail-'+message_id" name="editordata"></textarea>
            </form>
        </div>
    </div>

    <div class='form-inputlabel-list'>
        <div class='form-ctrl-inputlabel-big'>
            <button 
            v-if="checkEditerInfo.length==0"
            class='ts-btn btn-active input-submit-btn'
            @click="uploadMessage()"
            >送出</button>

            <div v-else>
                <button
                style="position:relative;z-index: 2;"
                class='ts-btn btn-notwork input-submit-btn'
                >
                    無法送出
                </button>
                <div class='input-submit-btn-warning-window'>
                    <ul>
                        <li v-for="waringString of checkEditerInfo">
                            {{waringString}}
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</div>
`,
    props: ['message_id'],

    data: function () {
        return {
            messageDetail:{},
            message_id: '',
        }
    },

    computed:{
        checkEditerInfo(){
            returnList = []
            if (this.messageDetail.who == ""){
                returnList.push("請輸入你是誰")
            }
            if (this.messageDetail.title == ""){
                returnList.push("標題不可為空")
            }

            return returnList
        }, 
    },

    methods:{
        getTextareaContent(){
            return $('#message-detail-'+this.messageDetail.message_id).summernote('code')
        },

        setTextareaContent(content){
            $('#message-detail-'+this.messageDetail.message_id).summernote('code',content)
        },

        setScore(score){
            this.messageDetail.score = score
        },

        uploadMessage(){
            var ThisComp = this
            var form = new FormData();
            form.append("message_id",this.messageDetail.message_id)
            form.append("shop_id",this.messageDetail.shop_id)
            form.append("who",this.messageDetail.who)
            form.append("title",this.messageDetail.title)
            form.append("score",this.messageDetail.score)
            form.append("content",this.getTextareaContent())
            console.log(this.messageDetail)
			fetch('/TreeStudioAPIs/OrderSys_Message_Manager/', {
				method: 'POST',
				body: form,
                mode: 'same-origin',
                headers: {'X-CSRFToken': csrftoken}
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
				console.log(myJson);
                v_console.log("更新留言成功");
                ThisComp.$emit('back_to_all_message_window', ThisComp.messageDetail.shop_id)
			});


        },

        loadMessageDetailData(message_id){
            var This = this
            this.message_id = message_id
            console.log(message_id)
            this.$nextTick(() => {
                $(document).ready(function() {
                    $('#message-detail-'+message_id).summernote({
                        placeholder: '請輸入內容',
                        height: 200,
                        lang: 'zh-TW',
                        toolbar: [
                            ['style', ['style']],
                            ['font', ['bold', 'underline', 'clear']],
                            ['fontname', ['fontname']],
                            ['color', ['color']],
                            ['para', ['ul', 'ol', 'paragraph']],
                            ['table', ['table']],
                            ['insert', ['link', 'picture', 'video']],
                            ['height', ['height']],
                            ['view', ['codeview', 'help']],
                        ],
                    });
                });
                fetch('/TreeStudioAPIs/OrderSys_Message_Manager/message/'+message_id+'/', {
                    method: 'GET'
                }).then(function(response) {
                    return response.json();
                })
                .then(function(myJson) {
                    This.messageDetail = myJson['data']
                    This.setTextareaContent(myJson['data'].content)
                    console.log(myJson)
                });
            })
        },
    },

    mounted(){
        // var This = this
        // $(document).ready(function() {
        //     $('#message-detail-'+this.message_id).summernote({
        //         placeholder: '請輸入內容',
        //         height: 200,
        //         lang: 'zh-TW',
        //         toolbar: [
        //             ['style', ['style']],
        //             ['font', ['bold', 'underline', 'clear']],
        //             ['fontname', ['fontname']],
        //             ['color', ['color']],
        //             ['para', ['ul', 'ol', 'paragraph']],
        //             ['table', ['table']],
        //             ['insert', ['link', 'picture', 'video']],
        //             ['height', ['height']],
        //             ['view', ['codeview', 'help']],
        //         ],
        //     });
        // });
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
        deleteOrderWindowOpen: false,

        pageChose : 0,
        pageListChose : 0,
        pageMaxNum: 30,


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
                'special': 'five-star-score',
                'v_html_content': '<five-star-score v-bind:score="data[title]"></five-star-score>',
            },
            shop_description : {
                'filter_str': '',
                'open': false,
                'show_name': '店家簡介',
            },
        },

        // 店家編輯相關
        edit_shopImgShort: true,
        shop_info_chosed: {},

        darg_type: '',
        darg_item: {
            'type': '',
            'item': null,
            'index': -1,
        },

        newShopCheck: false,

        // 商店列表相關
        tableInfoList : [],
        shopListUpdateing: false,


        // 開團相關資訊
        orderInfo: {},

        // 訂餐相關資訊
        todayOrderListUpdateing: false,
        todayOrderList : [],
        todayOrderChosedNum: 0,

        orderList_startDate: new Date().format("Y-MM-dd"),
        orderList_endDate: new Date().format("Y-MM-dd"),

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

        // 商店資訊視窗
        shopInfoWindow: {
            'shop_info': {},
            'message_board_info': {},
        },
        messageWindowSwitch: 'menu',
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

        shopperCartNum(){
            return Object.keys(this.shoppingCar).length
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
                wraningList.push('團長欄位不得為空')
            }
            if (
                new Date(Vue_OrderSystem.orderInfo.close_time) < new Date()
            ){
                wraningList.push('結單時間已過')
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
                'shop_picture' : '',
                'shop_menu': [],
                'shop_description': '',
            }
            this.newShopCheck = true
        },

        clickEditBtn(S_shop_id){
            this.newShopCheck = false
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

        clickDeltetOrderBtn(order_id){
            this.deleteOrderWindowOpen = true
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
            if (this.shoppingCar[order_id].length==0){
                Vue.delete(this.shoppingCar, order_id)
            }
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



        // 餐廳資訊視窗專用
        openShopInfoWindow(shop_id){
            this.window_chose="shop_info_window"
            this.uploadShopInfo(shop_id)
            this.updateNewMessageMenuWindow(shop_id)
        },

        uploadShopInfo(shop_id){
            // shopInfoWindow.shop_info
            this.getShopInfo(shop_id)
			.then(function(myJson) {
                Vue_OrderSystem.shopInfoWindow.shop_info = myJson
			});
        },

        openMessageDetailWindow(message_id){
            this.messageWindowSwitch = 'detail'
            this.$nextTick(() => {
                console.log(message_id)
                Vue_OrderSystem.$refs['message-detail-window'].loadMessageDetailData(message_id)
            }) 
            
        },

        updateNewMessageMenuWindow(shop_id){
            this.messageWindowSwitch = 'menu'
            this.$nextTick(() => {
                Vue_OrderSystem.$refs['new-message-table-in-shop-meun'].uploadMessageList(shop_id)
            })
        },

        openAllMessageWindow(shop_id){
            this.messageWindowSwitch = 'all'
            this.$nextTick(() => {
                Vue_OrderSystem.$refs['all-message-table-'+shop_id].updateTableInfoList(shop_id)
            })
        },


        // 已結單後視窗專用
        openClosedOrderWindow(order_id){
            this.window_chose='closed_order_window'
            this.getOrderInfos(order_id)
            Vue_OrderSystem.uploadAllShopCartDataByOrderID(order_id)
        },

        // 訂餐列表專用
        openOrderListWindow(){
            this.window_chose='today_list_window'
            this.uploadOrderListInfo()
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
            .then(function(shop_id) {
                console.log(shop_id)
                Vue_OrderSystem.updateNewMessageTableOnOrderPage(shop_id)
			})
        },

        updateNewMessageTableOnOrderPage(shop_id){
            this.$nextTick(() => {
                Vue_OrderSystem.$refs['new-message-table-on-order-page'].uploadMessageList(shop_id)
            })
        },

        clickOrderItem(D_data){
            console.log(D_data)
            if (D_data == undefined){
                return null
            }
            this.addOrderWindowData.data = D_data.item_data
            this.addOrderWindowData.content = ""
            this.addOrderWindowData.number = 1
            this.addOrderWindowData.shop_name = D_data.shop_name
            this.addOrderWindowData.shop_id = D_data.shop_id
            this.addOrderWindowData.order_id = D_data.order_id
            this.addOrderWindowOpen = true
        },

        // 餐廳列表視窗 專用
        openShopListWindow(){
            this.window_chose='shop_list_window'
            this.updateShopList()
        },

        // 準備開團視窗 專用
        clickOpenShopBtn(S_shop_id){
            this.window_chose='open_shop_window'
            this.setNewOrderData(S_shop_id)
        },

        setNewOrderData(S_shop_id){
            this.orderInfo = {
                'order_id': uuidv4(),
                'owner_name': '',
                // 'close_time': (new Date().addHours(1)).format("Y-MM-ddThh:mm"),
                'close_time': '',
                'bank_info' : '',
                'bank_qr_code': {},
                'shop_id' : S_shop_id,
                'order_desc': '',
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

        getPicAndReturnBase64String(e, vue_posi, vue_name){
            if (e.target.files[0].size/1024/1024 > 15){
                v_console.error("上傳的圖案大於15MB了!取消上傳!")
                return null
            }

            this.convertFile(e.target.files[0])
            .then(data => {
                //console.log(data) // 把編碼後的字串輸出到console
                console.log(data.length)
                if (data.length > 2000000){
                    v_console.error("上傳的圖案編碼後長度太長，請換過一張")
                    return null
                }

                Vue.set(vue_posi,vue_name, {
                    'file_name': e.target.files[0].name,
                    'data': data,
                })
            })
            .catch(err => console.log(err))
        },

        getPicAndReturnBase64String_Sim(e, vue_posi, vue_name){
            if (e.target.files[0].size/1024/1024 > 15){
                v_console.error("上傳的圖案大於15MB了!取消上傳!")
                return null
            }

            this.convertFile(e.target.files[0])
            .then(data => {
                //console.log(data) // 把編碼後的字串輸出到console
                console.log(data.length)
                if (data.length > 2000000){
                    v_console.error("上傳的圖案編碼後長度太長，請換過一張")
                    return null
                }

                Vue.set(vue_posi,vue_name, data)
            })
            .catch(err => console.log(err))
        },

        convertFile(file) {
            console.log(file)
            return new Promise((resolve,reject)=>{
                let reader = new FileReader()
                reader.onload = () => { resolve(reader.result) }
                reader.onerror = () => { reject(reader.error) }
                reader.readAsDataURL(file)
            })
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
			fetch_getAllShopCartByOrderID = fetch('/TreeStudioAPIs/OrderSys_ShopCart_Manager/order_id/'+S_orderID+'/', {
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
        uploadOrderListInfo(){
            this.todayOrderListUpdateing = true
			fetch('/TreeStudioAPIs/Get_OrderInfo_By_Time_Range/'+this.orderList_startDate+"to"+this.orderList_endDate+"/", {
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
            fetch_result = this.getOrderInfo(S_orderID)
            .then(function(orderData) {
                Vue_OrderSystem.chosedOrderData['order_info'] = orderData
                S_shopID = orderData.shop_id

				return S_shopID;
			})
            .then(function(S_shopID) {
                fetch_result_2 = Vue_OrderSystem.getShopInfo(S_shopID)
                .then(function(D_shopData) {
                    Vue_OrderSystem.chosedOrderData['shop_info'] = D_shopData
                })
                console.log(S_shopID)
                return S_shopID
			}) 
            return fetch_result
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
            form.append("shop_description", this.shop_info_chosed['shop_description'])
            form.append("shop_picture", this.shop_info_chosed['shop_picture'])
            
            
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
                // Vue_OrderSystem.updateShopList()
                Vue_OrderSystem.deleteShopWindowOpen=false
                Vue_OrderSystem.openShopListWindow()
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
            form.append("order_description", this.orderInfo['order_desc'])
            form.append("bank_info_qr_code", this.orderInfo['bank_qr_code']['data'])
            
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
                Vue_OrderSystem.openOrderListWindow()
			});
        },
        delOrderInfo(S_order_id){
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
                Vue_OrderSystem.deleteOrderWindowOpen=false
                Vue_OrderSystem.openOrderListWindow()
            });
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

        // 資料防呆
        thisNumCantMinus(position, name){
            if (parseInt(number)<0){
                number = 0
            }
            number = parseInt(number);
        },
        setScoreNum(position, name){
            I_number = position[name]
            if (isNaN(parseFloat(I_number))){
                I_number = 0
            } else if (parseFloat(I_number)<0){
                I_number = 0
            } else if (parseFloat(I_number)>5){
                I_number = 5
            } 
            I_number = parseFloat(I_number);
            Vue.set(position, name, I_number)
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

var Vue_OrderSystem_OrderList = new Vue({
    el: '#order-system-window-order-list',
    data: {

        // 購物車刪除確認視窗
        delCheckWindowOpen : false,
        delCheckInfo : {},


        // 點菜視窗
        // shop_order_window_unfold: true,
        
        shop_order_resize_window: false,
        shop_order_window_unfold: true,
        shop_order_window_open : false,
        shop_order_info: {
            shop_info: {},
            order_info: {},
        },


        // 今日訂單列表相關
        window_chose: 'today_list_window',
        todayOrderList : [],


        // 點菜跳出視窗相關
        addOrderWindowOpen: false,
        addOrderWindowData: {
            data : {},
            content : "",
            number: 0,
            order_id: "",
        },

        // 購物車資訊
        shoppingCar : {},
        shopperName: '',
        shop_cart_resize_window: false,
        shop_cart_window_unfold: false,

        // 訂單統計相關資訊
        all_shopcart_window_resize: true,
        all_shopcart_window_unfold: true,
        all_shopcart_window_size: 0,

        allShopCartOrderInfo: {},
        allShopCartData: [],
        allShopCart_OrderID: '',

        short_checkbox: false,

        closeCheckOrderID: '',
    },

    computed:{
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
        openHistoryListWindow(){
            v_console.log('test')
        },

        calcShopOrderWindowSize(){
            this.$nextTick(() => {
                Vue_OrderSystem_OrderList.shop_order_resize_window = true
            })
        },


        calcShopcartWindowSize(reopen){
            this.$nextTick(() => {
                Vue_OrderSystem_OrderList.all_shopcart_window_resize = true 
            })
        },

        openTodayListWindow(){
            this.window_chose = 'today_list_window'
            this.updateTodayOrderList()
        },

        updateTodayOrderList(){
            S_today = new Date().format("Y-MM-dd")
			fetch('/TreeStudioAPIs/Get_Today_OrderInfo/', {
                method: 'GET'
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
                Vue_OrderSystem_OrderList.todayOrderList = myJson['data']
			}); 
        },

        openOrderWindow(order_id){
            Vue_OrderSystem_OrderList.shop_order_window_open = true
            this.updateAllShopCartList(order_id)
            getOrderInfo(order_id)
            .then(function(order_info) {
                Vue_OrderSystem_OrderList.shop_order_info.order_info = order_info
                return order_info.shop_id
            })
            .then(function(shop_id) {
                getShopInfo(shop_id)
                .then(function(shop_info) {
                    Vue_OrderSystem_OrderList.shop_order_info.shop_info = shop_info
                    Vue_OrderSystem_OrderList.calcShopOrderWindowSize()
                    Vue_OrderSystem_OrderList.shop_order_window_unfold = true
                    jumpToDOM("#order-shop-menu-window")
                })
            })
        },

        clickOrderItem(D_data){
            console.log(D_data)
            if (D_data == undefined){
                return null
            }
            this.addOrderWindowData.data = D_data.item_data
            this.addOrderWindowData.content = ""
            this.addOrderWindowData.number = 1
            this.addOrderWindowData.shop_name = D_data.shop_name
            this.addOrderWindowData.shop_id = D_data.shop_id
            this.addOrderWindowData.order_id = D_data.order_id
            this.addOrderWindowOpen = true
        },

        // 購物車相關
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
            // this.calcShopOrderWindowSize()
            this.$nextTick(() => {
                Vue_OrderSystem_OrderList.shop_cart_resize_window = true
                this.shop_cart_window_unfold = true
            })
        },

        removeOrderOnCart(order_id, index){
            this.shoppingCar[order_id].splice(index,1)
            if (this.shoppingCar[order_id].length==0){
                Vue.delete(this.shoppingCar, order_id)
            }
            this.calcShopOrderWindowSize()
            this.$nextTick(() => {
                Vue_OrderSystem_OrderList.shop_cart_resize_window = true
            })
        },
 
        clikcUploadShopCartBtn(L_cartData, shopperName){
            var order_id = L_cartData[0].order_id
            uploadShopCartInfo(L_cartData, shopperName)
            .then(function(myJson) {
                Vue.delete(Vue_OrderSystem_OrderList.shoppingCar, order_id)
                Vue_OrderSystem_OrderList.updateAllShopCartList(order_id)
                Vue_OrderSystem_OrderList.$nextTick(() => {
                    Vue_OrderSystem_OrderList.shop_cart_resize_window = true
                })
            });
        },

        // 定單統計相關
        updateAllShopCartList(order_id){
            this.allShopCart_OrderID = order_id
            getAllShopCartByOrderID(order_id)
            .then(function(data) {
                Vue_OrderSystem_OrderList.allShopCartData = data
                Vue_OrderSystem_OrderList.calcShopcartWindowSize()
                return data;
            })
        },

        openDelShopCartWindow(shop_cart_id, shop_cart_data_list){
            this.deleteShopCartWindowOpen = true
            this.delCheckInfo = {
                shop_cart_id: shop_cart_id,
                shop_cart_list: shop_cart_data_list,
            }
        },

        // 刪除購物車確認視窗
        clickDelShopCartItemBtn(D_shopCartItemData){
            this.delCheckInfo = D_shopCartItemData
            this.delCheckWindowOpen = true
        },

        delShopCartByShopCartIDAndItemIndex(shop_cart_id, item_index){
            delShopCartByShopCartIDAndItemIndex(shop_cart_id, item_index)
            .then(function(json) {
                Vue_OrderSystem_OrderList.delCheckWindowOpen = false
                Vue_OrderSystem_OrderList.updateAllShopCartList(
                    Vue_OrderSystem_OrderList.allShopCart_OrderID
                )
            })
        },
    },
})


var Vue_OrderSystem_OrderSetting = new Vue({
    el: '#order-system-window-order-setting',
    data: {
        // 商店列表相關
        tableInfoList : [],
        shopListUpdateing: false,
        pageChose : 0,
        pageListChose : 0,
        pageMaxNum: 30,
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
                'special': 'five-star-score',
                'v_html_content': '<five-star-score v-bind:score="data[title]"></five-star-score>',
            },
            shop_description : {
                'filter_str': '',
                'open': false,
                'show_name': '店家簡介',
            },
        },

        // 我要開團相關
        open_order_window_resize: true,
        open_order_window_unfold: false,

        newOrderStep: 'choseShop',

        open_shop_chosed_info: {},

        orderInfo: {},

        // 新增餐廳相關
        add_shop_window_resize: true,
        add_shop_window_unfold: false,

        addShopStep: 'shopInfo',

        add_shop_info: {},

        // 編輯餐廳相關
        edit_shop_window_resize: true,
        edit_shop_window_unfold: false,

        edit_shop_window_style:"" ,

        editShopStep: 'shopInfo',

        edit_shop_info: {},

        

    },

    computed:{
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

        // 檢查新增店家資訊
        checkAddShopInfo(){
            if (this.add_shop_info.shop_menu == undefined){
                return []
            }

            let wraningList = []
            if (this.add_shop_info.shop_name == ''){
                wraningList.push('商店名稱不得為空')
            }
            if (this.add_shop_info.shop_menu.length == 0){
                wraningList.push('菜單目前是空的')
            }

            for (D_group of this.add_shop_info.shop_menu){
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

        // 檢查新增團訂單資訊
        checkAddOrderInfo(){
            if (this.orderInfo.order_id == undefined){
                return []
            }
            let wraningList = []
            if (this.orderInfo.owner_name == ''){
                wraningList.push('團長欄位不得為空')
            }
            return wraningList
        },

        // 檢查新增店家資訊
        checkEditShopInfo(){
            if (this.edit_shop_info.shop_menu == undefined){
                return []
            }

            let wraningList = []
            if (this.edit_shop_info.shop_name == ''){
                wraningList.push('商店名稱不得為空')
            }
            if (this.edit_shop_info.shop_menu.length == 0){
                wraningList.push('菜單目前是空的')
            }

            for (D_group of this.edit_shop_info.shop_menu){
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

        // 商店列表相關
        updateShopList(){
			fetch('/TreeStudioAPIs/OrderSys_ShopInfo_Manager/', {
                method: 'GET'
			}).then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
                v_console.success("餐廳列表完成")
                Vue_OrderSystem_OrderSetting.tableInfoList = myJson['data']
            });
        },

        clickOpenOrderBtn(shop_id){
            this.newOrderStep = 'choseShop'
            this.updateShopInfo(shop_id)
            this.orderInfo.shop_id = shop_id
            this.open_order_window_unfold = true
            jumpToDOM("#open-new-order-window")
        },


        // 我要開團相關
        calcOpenOrderWindowSize(){
            this.$nextTick(() => {
                Vue_OrderSystem_OrderSetting.open_order_window_resize = true 
            })
        },
        
        switchOpenOrderWindowUnfold(){
            this.calcOpenOrderWindowSize()
            this.open_order_window_unfold = !this.open_order_window_unfold
        },

        openStepPage(step){
            this.newOrderStep = step
            this.calcOpenOrderWindowSize()
        },

        updateShopInfo(ship_id){
            getShopInfo(ship_id)
            .then(function(shop_info) {
                Vue_OrderSystem_OrderSetting.open_shop_chosed_info = shop_info
                Vue_OrderSystem_OrderSetting.calcOpenOrderWindowSize()
            })
        },

        init_order_setting_info(){
            this.orderInfo = {
                'order_id': uuidv4(),
                'owner_name': '',
                'bank_info' : '',
                'bank_info_qr_code': '',
                'order_desc': '',
                'shop_id': '',
            }
        },

        clickUploadOrderPictureBtn(event, orderInfo, key_name){
            getPicAndReturnBase64String_Sim(event, orderInfo, key_name)
            .then(data => {
                Vue_OrderSystem_OrderSetting.calcOpenOrderWindowSize()
            })
        },

        clickAddNewOrderBtn(){
            createNewOrderInfo(this.orderInfo)
            .then(function(data) {
                v_console.success("建立新團訂單成功")
                Vue_OrderSystem_OrderSetting.init_order_setting_info()
                Vue_OrderSystem_OrderSetting.newOrderStep = 'choseShop'
                Vue_OrderSystem_OrderSetting.open_shop_chosed_info = {}
                Vue_OrderSystem_OrderSetting.open_order_window_unfold = false

            })
        },

        // 新增餐廳相關
        calcAddShopWindowSize(){
            this.$nextTick(() => {
                Vue_OrderSystem_OrderSetting.add_shop_window_resize = true 
            })
        },

        switchAddShopWindowUnfold(){
            this.calcAddShopWindowSize()
            this.add_shop_window_unfold = !this.add_shop_window_unfold
        },

        openAddShopStepPage(step){
            this.addShopStep = step
            this.calcAddShopWindowSize()
        },

        init_add_shop_info(){
            this.add_shop_info = {
                'shop_id': uuidv4(),
                'shop_type': '餐廳',
                'shop_name': '',
                'shop_score': 0,
                'shop_phoneNum': '',
                'shop_des': '',
                'shop_address': '',
                'shop_img': '',
                'shop_picture' : '',
                'shop_menu': [],
                'shop_description': '',
            }
        },

        clickUploadShopPictureBtn(event, add_shop_info, key_name){
            getPicAndReturnBase64String_Sim(event, add_shop_info, key_name)
            .then(data => {
                Vue_OrderSystem_OrderSetting.calcAddShopWindowSize()
            })
        },

        clickAddNewShopBtn(){
            createShopInfo(this.add_shop_info)
            .then(function(data) {
                v_console.success("建立新商店成功")
                Vue_OrderSystem_OrderSetting.init_add_shop_info()
                Vue_OrderSystem_OrderSetting.addShopStep = 'shopInfo'
                Vue_OrderSystem_OrderSetting.add_shop_window_unfold = false
                Vue_OrderSystem_OrderSetting.updateShopList()
            })
        },

        // 編輯餐廳相關
        loadEditShopInfo(shop_id){
            getShopInfo(shop_id)
            .then(function(shop_data) {
                Vue_OrderSystem_OrderSetting.edit_shop_window_style = "animate__animated animate__backInRight"
                Vue_OrderSystem_OrderSetting.edit_shop_info = shop_data
                Vue_OrderSystem_OrderSetting.openEditShopStepPage('shopInfo')
                Vue_OrderSystem_OrderSetting.edit_shop_window_unfold = true
                Vue_OrderSystem_OrderSetting.$nextTick(() => {
                    jumpToDOM("#edit-shop-window")
                })
            });
        },

        calcEditShopWindowSize(){
            this.$nextTick(() => {
                Vue_OrderSystem_OrderSetting.edit_shop_window_resize = true
            })
        },

        switchEditShopWindowUnfold(){
            this.calcEditShopWindowSize()
            this.edit_shop_window_unfold = !this.edit_shop_window_unfold
        },

        openEditShopStepPage(step){
            this.editShopStep = step
            this.calcEditShopWindowSize()
        },

        clickUploadShopPictureBtn(event, edit_shop_info, key_name){
            getPicAndReturnBase64String_Sim(event, edit_shop_info, key_name)
            .then(data => {
                Vue_OrderSystem_OrderSetting.calcEditShopWindowSize()
            })
        },

        clickEditShopBtn(){
            console.log(this.edit_shop_info)
            uploadShopInfo(this.edit_shop_info)
            .then(function(data) {
                v_console.success("編輯商店成功")
                Vue_OrderSystem_OrderSetting.updateShopList()
                Vue_OrderSystem_OrderSetting.closeEditShopWindow()
            })
        },

        closeEditShopWindow(){
            Vue_OrderSystem_OrderSetting.edit_shop_window_unfold = false
            Vue_OrderSystem_OrderSetting.edit_shop_window_style = "animate__animated animate__backOutRight"
            setTimeout(function(){
                Vue_OrderSystem_OrderSetting.edit_shop_info = {}
            },500)
        },
    },

    mounted(){
        this.init_order_setting_info()
        this.init_add_shop_info()
    },
})

// db - 商店資訊相關
function getShopInfo(S_shopID){
    fetch_getShopInfo = fetch('/TreeStudioAPIs/OrderSys_ShopInfo_Manager/'+S_shopID+'/', {
        method: 'GET'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        myJson['data']["shop_menu"] = JSON.parse(myJson['data']["shop_menu"])
        return myJson['data']
    });
    return fetch_getShopInfo
}

function createShopInfo(D_shopInfo){
    var form = new FormData();
    form.append("shop_id", D_shopInfo['shop_id'])
    form.append("shop_type", D_shopInfo['shop_type'])
    form.append("shop_name", D_shopInfo['shop_name'])
    form.append("shop_score", D_shopInfo['shop_score'])
    form.append("shop_phoneNum", D_shopInfo['shop_phoneNum'])
    form.append("shop_des", D_shopInfo['shop_des'])
    form.append("shop_address", D_shopInfo['shop_address'])
    form.append("shop_img", D_shopInfo['shop_img'])
    form.append("shop_menu", JSON.stringify(D_shopInfo['shop_menu']))
    form.append("shop_description", D_shopInfo['shop_description'])
    form.append("shop_picture", D_shopInfo['shop_picture'])
    
    Fetch_createShopInfo = fetch('/TreeStudioAPIs/OrderSys_ShopInfo_Manager/', {
        method: 'POST',
        body: form,
        mode: 'same-origin',
        headers: {'X-CSRFToken': csrftoken}
    }).then(function(response) {
        return response.json();
    })
    return Fetch_createShopInfo
}

function uploadShopInfo(D_shopInfo){
    var form = new FormData();
    form.append("shop_type", D_shopInfo['shop_type'])
    form.append("shop_name", D_shopInfo['shop_name'])
    form.append("shop_score", D_shopInfo['shop_score'])
    form.append("shop_phoneNum", D_shopInfo['shop_phoneNum'])
    form.append("shop_des", D_shopInfo['shop_des'])
    form.append("shop_address", D_shopInfo['shop_address'])
    form.append("shop_img", D_shopInfo['shop_img'])
    form.append("shop_menu", JSON.stringify(D_shopInfo['shop_menu']))
    form.append("shop_description", D_shopInfo['shop_description'])
    form.append("shop_picture", D_shopInfo['shop_picture'])
    
    Fetch_createShopInfo = fetch('/TreeStudioAPIs/OrderSys_ShopInfo_Manager/'+D_shopInfo['shop_id']+'/', {
        method: 'POST',
        body: form,
        mode: 'same-origin',
        headers: {'X-CSRFToken': csrftoken}
    }).then(function(response) {
        return response.json();
    })
    return Fetch_createShopInfo
}

// db - 團訂單資訊相關
function getOrderInfo(S_orderID){
    fetch_getOrderInfo = fetch('/TreeStudioAPIs/OrderSys_OrderInfo_Manager/'+S_orderID+'/', {
        method: 'GET'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        return myJson['data']
    });
    return fetch_getOrderInfo
}

function createNewOrderInfo(D_orderInfo){
    var form = new FormData();
    form.append("order_id", D_orderInfo['order_id'])
    form.append("owner_name", D_orderInfo['owner_name'])
    form.append("bank_info", D_orderInfo['bank_info'])
    form.append("shop_id", D_orderInfo['shop_id'])
    form.append("order_description", D_orderInfo['order_desc'])
    form.append("bank_info_qr_code", D_orderInfo['bank_info_qr_code'])
    
    Fetch_createNewOrderInfo = fetch('/TreeStudioAPIs/OrderSys_OrderInfo_Manager/', {
        // method: 'GET'
        method: 'POST',
        body: form,
        mode: 'same-origin',
        headers: {'X-CSRFToken': csrftoken}
    }).then(function(response) {
        return response.json();
    });
    return Fetch_createNewOrderInfo
}

// db連線 - shop cart db
function uploadShopCartInfo(L_cartDatas, shopperName){
    shop_cart_id = uuidv4()
    var form = new FormData();
    form.append("shop_cart_id",shop_cart_id)
    form.append("shopper_name",shopperName)
    form.append("shop_cart_data",JSON.stringify(L_cartDatas))

    fetch_result = fetch('/TreeStudioAPIs/OrderSys_ShopCart_Manager/', {
        method: 'POST',
        body: form,
        mode: 'same-origin',
        headers: {'X-CSRFToken': csrftoken}
    }).then(function(response) {
        return response.json();
    })
    return fetch_result

}

function getAllShopCartByOrderID(S_orderID){
    fetch_getAllShopCartByOrderID = fetch('/TreeStudioAPIs/OrderSys_ShopCart_Manager/order_id/'+S_orderID+'/', {
        method: 'GET'
    }).then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        return myJson['data']
    });
    return fetch_getAllShopCartByOrderID
}

function delAllShopCartByShopCartID(S_shopCart_id){
    console.log(S_shopCart_id)
    fetch_result = fetch('/TreeStudioAPIs/OrderSys_ShopCart_Manager/shop_cart_id/'+S_shopCart_id+'/', {
        method: 'DELETE',
        mode: 'same-origin',
        headers: {'X-CSRFToken': csrftoken},
    }).then(function(response) {
        return response.json();
    })
    return fetch_result
}

function delShopCartByShopCartIDAndItemIndex(S_shopCart_id, I_itemIndex){
    console.log(S_shopCart_id, I_itemIndex)
    fetch_result = fetch('/TreeStudioAPIs/OrderSys_ShopCart_Manager/shop_cart_id/'+S_shopCart_id+'/'+I_itemIndex+'/', {
        method: 'DELETE',
        mode: 'same-origin',
        headers: {'X-CSRFToken': csrftoken},
    }).then(function(response) {
        return response.json();
    })
    return fetch_result
}

function getPicAndReturnBase64String(e, vue_posi, vue_name){
    if (e.target.files[0].size/1024/1024 > 15){
        v_console.error("上傳的圖案大於15MB了!取消上傳!")
        return null
    }

    this.convertFile(e.target.files[0])
    .then(data => {
        //console.log(data) // 把編碼後的字串輸出到console
        console.log(data.length)
        if (data.length > 2000000){
            v_console.error("上傳的圖案編碼後長度太長，請換過一張")
            return null
        }

        Vue.set(vue_posi,vue_name, {
            'file_name': e.target.files[0].name,
            'data': data,
        })
    })
    .catch(err => console.log(err))
}

function getPicAndReturnBase64String_Sim(e, vue_posi, vue_name){
    if (e.target.files[0].size/1024/1024 > 15){
        v_console.error("上傳的圖案大於15MB了!取消上傳!")
        return null
    }

    Promise_convertFile =  convertFile(e.target.files[0])
    .then(data => {
        //console.log(data) // 把編碼後的字串輸出到console
        console.log(data.length)
        if (data.length > 2000000){
            v_console.error("上傳的圖案編碼後長度太長，請換過一張")
            return null
        }

        Vue.set(vue_posi,vue_name, data)
    })
    .catch(err => console.log(err))

    return Promise_convertFile
}

function convertFile(file) {
    console.log(file)
    return new Promise((resolve,reject)=>{
        let reader = new FileReader()
        reader.onload = () => { resolve(reader.result) }
        reader.onerror = () => { reject(reader.error) }
        reader.readAsDataURL(file)
    })
}
