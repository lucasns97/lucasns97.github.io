const DICTONARY_URL = "https://raw.githubusercontent.com/lucasns97/lucasns97.github.io/master/src/json/dict.json"
const TOPICS_URL = "https://raw.githubusercontent.com/lucasns97/lucasns97.github.io/master/src/json/topics.json"

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
                console.log(self.topicsData)

            }).catch((e) => console.error(e))

    },
    methods: {
        async loadTopics() {   

            try {
                const res = await axios.get(TOPICS_URL);
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
        },

        navigateTo(path) {
            parent.window.location.href = path
        },

        getRandomTopic() {
            console.log('Carregando tópico aleatório')
        },

        filterByText() {
            console.log(`Buscando por ${this.inputData}`)
        },

    },
    filters: {},
    computed: {}
});
