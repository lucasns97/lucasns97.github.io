
const vm = new Vue({
    el: '#app',
    data: {
        inputData: '',
        activeMenu: '1'
    },
    mounted() {},
    methods: {
        handleMenu(key, keyPath) {
            this.activeMenu = key;
        }
    },
    filters: {},
    computed: {}
});
