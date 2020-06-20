const DICTONARY_URL = "https://raw.githubusercontent.com/lucasns97/lucasns97.github.io/master/src/json/dict.json"
const TOPICS_URL = "https://raw.githubusercontent.com/lucasns97/lucasns97.github.io/master/src/json/topics.json"

const vm = new Vue({
    el: '#app',
    data: {
        inputData: '',
        activeMenu: '1',
        dictData: '',
        language: 'pt',
        introductionCorpus: {},
        loading: false,
        topicsData: [],
        filteredTopicsData: [],
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
                Object.entries(self.topicsData).forEach(function(data) {
                    let key = data[0]
                    let values = data[1]
                    self.filteredTopicsData[key] = values
                })

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
            this.loading = true

            let randomIndex = Math.floor(Math.random() * Object.keys(this.topicsData).length)

            this.navigateTo(this.topicsData[randomIndex].path)

            this.loading = false
        },

        filterByText() {
            this.loading = true

            var self = this

            setTimeout(function() {
                self.loading = false
            }, 400)

            this.filteredTopicsData = {}
            Object.entries(this.topicsData).forEach(function(data) {
                let key = data[0]
                let values = data[1]

                let searchValues = self.inputData.split(' ')
                searchValues.forEach(function(value) {
                    if (values.text.indexOf(value.toLowerCase()) !== -1) {
                        self.filteredTopicsData[key] = values
                    }
                })
                
            })
        },

    },
    filters: {},
    computed: {},
    watch: {
        inputData: function() {
            this.filterByText()
        }
    }
});
