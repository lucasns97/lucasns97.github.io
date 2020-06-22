const TOPICS_URL = "https://raw.githubusercontent.com/lucasns97/lucasns97.github.io/master/src/json/topics.json"

const vm = new Vue({
    el: '#index',
    data: {
        inputData: '',
        activeMenu: '1',
        loading: false,
        topicsData: [],
        filteredTopicsData: [],
    },
    async mounted() {

    },
    methods: {

        handleMenu(key, keyPath) {
            this.activeMenu = key;
        },

        ajustText(text, language) {
            this.introductionCorpus[language] = text.split('\n');
        },

        changeLanguage(lang) {
            this.language = lang;
        },

        navigateTo(path) {
            parent.window.location.href = path
        },
    },
    filters: {},
    computed: {},
});
