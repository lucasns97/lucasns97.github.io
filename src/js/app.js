const DICTONARY_URL = "https://raw.githubusercontent.com/lucasns97/lucasns97.github.io/master/src/json/dict.json"
const GITHUB_API_REPO = "https://api.github.com/repos/lucasns97/lucasns97.github.io/git/trees/master"
const USERNAME = 'lucasns97'
const PASSWORD = '0db4a34334aa72093f2ace7c0a955b0113b32d0f'






Vue.use(VueSpinners)

const vm = new Vue({
    el: '#app',
    data: {
        inputData: '',
        activeMenu: '1',
        dictData: '',
        language: 'pt',
        introductionCorpus: {},
        loading: false,
        topicsData: []
    },
    async mounted() {

        var self = this;

        this.loading = true

        this.loadDict()
            .then(function(dict) {

                self.dictData = dict;

                self.ajustText(self.dictData.pt.introduction, 'pt')
                self.ajustText(self.dictData.en.introduction, 'en')

                self.loading = false

            }).catch((e) => console.error(e))
        
        this.loadTopics()
            .then(function(data) {

                self.topicsData = data;

            }).catch((e) => console.error(e))

    },
    methods: {
        openTopic(topicName) {

            window.location.href = `https://lucasns97.github.io/topics/${topicName}`
        },

        async loadTopics() {   

            try {
                const res = await axios.get(DICTONARY_URL);
                return res.data;

            } catch (e) {console.error(e);}
        },

        handleMenu(key, keyPath) {
            this.activeMenu = key;
        },

        async loadDict() {   

            try {
                const res = await axios.get(DICTONARY_URL);
                return res.data;

            } catch (e) {console.error(e);}
        },

        ajustText(text, language) {
            this.introductionCorpus[language] = text.split('\n');
        },

        changeLanguage(lang) {
            this.language = lang;
        }
    },
    filters: {},
    computed: {}
});
