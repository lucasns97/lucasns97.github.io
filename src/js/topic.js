const TOPICS_URL = "https://raw.githubusercontent.com/lucasns97/lucasns97.github.io/master/src/json/topics.json"

const vm = new Vue({
    el: '#topic',
    data: {
        loading: false,
    },
    async mounted() {

    },
    methods: {

        navigateTo(path) {
            parent.window.location.href = path
        },

    },
    filters: {},
    computed: {},

});
