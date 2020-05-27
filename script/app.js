Vue.use(VueLazyload)

const vm = new Vue({
    el: '#app',
    data: {
        results: [],
        collresults: [],
        value: 0,
        search: '',
        lowPoint: 34,
        highPoint: 3,
        turkResults: [],
        workResults: [],
    },
    mounted() {},
    methods: {},
        
});

//initialize page on collection 34
vm.changeCollection()
