const TOPICS_URL = "https://raw.githubusercontent.com/lucasns97/lucasns97.github.io/master/src/json/topics.json"

const vm = new Vue({
    el: '#search',
    data: {
        inputData: '',
        activeMenu: '2',
        language: 'pt',
        introductionCorpus: {},
        loading: true,
        topicsData: [],
        filteredTopicsData: [],
    },
    async mounted() {

        var self = this;

        this.loading = true

        setTimeout(function() {
            self.loadTopics()
                .then(async function(data) {

                    self.topicsData = data;
                    var numOfTopics = data.length;
                    console.log(numOfTopics)
                    await self.topicsData.forEach(function(topic) {
                        self.filteredTopicsData.push(topic)
                    })
                    console.log(self.filteredTopicsData)
                    self.shuffleArray(self.filteredTopicsData)
                    console.log(self.filteredTopicsData)

                    self.loading = false

                }).catch((e) => console.error(e))
        }, 400)
    },
    methods: {
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random()*i)
                const temp = array[i]
                array[i] = array[j]
                array[j] = temp
            }
        },

        async loadTopics() {   
            
            try {
                const res = await axios.get(TOPICS_URL);
                var resArr = []
                await Object.entries(res.data).forEach(function(topicData) {
                    resArr.push(topicData[1])
                })
                return resArr;

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

            this.filteredTopicsData = []
            Object.entries(this.topicsData).forEach(function(data) {
                let key = data[0]
                let values = data[1]

                let searchValues = self.inputData.trim().split(' ')
                searchValues.forEach(function(value) {
                    if (searchValues.length > 1 && value === "") {return}
                    if (values.text.indexOf(value.toLowerCase()) !== -1) {
                        self.filteredTopicsData.push(values)
                    }
                })
                
            })
        },

        filterByTag(tag) {
            console.log(tag)
        }

    },
    filters: {},
    computed: {},
    watch: {
        inputData: function() {
            this.filterByText()
        }
    }
});
