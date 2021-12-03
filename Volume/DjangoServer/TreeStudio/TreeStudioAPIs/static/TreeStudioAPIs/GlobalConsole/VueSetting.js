function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

var v_console =  new Vue({
    el: '#v-console-window',
    data: {
        message: 'test',
        D_consoleList : {},
    },

    computed: {

    },

    methods:{
        addConsole(D_content, F_time=3.){
            Vue.set(
                this.D_consoleList,
                D_content.uuid,
                D_content
            )
            setTimeout(function(){
                v_console.deleteConsole(D_content.uuid)
            },F_time*1000)
        },

        deleteConsole(S_uuid){
            if (this.D_consoleList[S_uuid] == undefined){
                return null
            }
            this.D_consoleList[S_uuid].style_set="animate__bounceOutRight"
            setTimeout(function(){
                Vue.delete(v_console.D_consoleList, S_uuid)
            },500)
        },

        log(S_content, F_time=3.){
            D_content = {
                'uuid': uuidv4(),
                'type': 'log',
                'content': S_content,
                'style_set': 'animate__swing',
                'color': 'var(--info)',
            }
            this.addConsole(D_content, F_time)
        },
        warning(S_content, F_time=3.){
            D_content = {
                'uuid': uuidv4(),
                'type': 'warning',
                'content': S_content,
                'style_set': 'animate__swing',
                'color': 'var(--warning)',
            }
            this.addConsole(D_content, F_time)
        },
        error(S_content, F_time=3.){
            D_content = {
                'uuid': uuidv4(),
                'type': 'error',
                'content': S_content,
                'style_set': 'animate__shakeX',
                'color': 'var(--danger)',
            }
            this.addConsole(D_content, F_time)
        },

        debug(S_content, F_time=3.){
            D_content = {
                'uuid': uuidv4(),
                'type': 'debug',
                'content': S_content,
                'style_set': 'animate__swing',
                'color': 'var(--dark)',
            }
            this.addConsole(D_content, F_time)
        },

        success(S_content, F_time=3.){
            D_content = {
                'uuid': uuidv4(),
                'type': 'success',
                'content': S_content,
                'style_set': 'animate__swing',
                'color': 'var(--success)',
            }
            this.addConsole(D_content, F_time)
        },

    },

    created: function() {

    },
})