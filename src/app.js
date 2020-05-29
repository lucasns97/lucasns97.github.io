const DICTONARY_URL = "https://raw.githubusercontent.com/lucasns97/lucasns97.github.io/master/src/json/dict.json"

const vm = new Vue({
    el: '#app',
    data: {
        inputData: '',
        activeMenu: '1',
        dictData: '',
        language: 'pt',
        introductionCorpus: {},
    },
    async mounted() {
        var self = this;

        await this.loadDict()
            .then(function(dict) {

                self.dictData = dict;

            }).catch((e) => console.error(e))

        this.ajustText(self.dictData.pt.introduction, 'pt')
        this.ajustText(self.dictData.en.introduction, 'en')

        console.log(this.introductionCorpus)
        
    },
    methods: {
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

        }
    },
    filters: {},
    computed: {}
});
