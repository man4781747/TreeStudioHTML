function welcomeWindowBuild(){
    setTimeout(function() {
        var textWrapper = document.querySelector('.vue-load-success-content');
        textWrapper.innerHTML = "TREE  STUDIO".replace(/\S/g, "<span class='letter'>$&</span>");

        var textWrapper_2 = document.querySelector('.vue-load-success-content-2');
        textWrapper_2.innerHTML = "All You Need In Here".replace(/\S/g, "<span class='letter-2'>$&</span>");

        anime.timeline({loop: false})
        .add({
            targets: '.vue-load-success-content .letter',
            translateY: [-100,0],
            easing: "easeOutExpo",
            duration: 1400,
            delay: (el, i) => 30 * i
        })
        // .add({
        //     targets: '.vue-load-success-content',
        //     opacity: 0,
        //     duration: 10000,
        //     easing: "easeOutExpo",
        //     delay: 1000
        // });

        anime.timeline({loop: false})
        .add({
            targets: '.vue-load-success-content-2 .letter-2',
            translateY: [-100,0],
            easing: "easeOutExpo",
            duration: 1400,
            delay: (el, i) => 30 * i
        })
        // .add({
        //     targets: '.vue-load-success-content-2',
        //     opacity: 0,
        //     duration: 10000,
        //     easing: "easeOutExpo",
        //     delay: 1000
        // });
    }, 10);

    setTimeout(function(){
        Vue_WelcomeWindow.openLoadSuccessWindow = false
    },1500)

}


var Vue_WelcomeWindow =  new Vue({
    el: '#vue-load-success-window',
    data: {
        closeLoadingWindow: true,
        openLoadSuccessWindow: true,
    },

    methods:{
    },

    created: function () {
        this.closeLoadingWindow = false
        welcomeWindowBuild()
    }
})


Vue_mainToolBox.loadUrlParas()