const TOPICS_URL = "https://raw.githubusercontent.com/lucasns97/lucasns97.github.io/master/src/json/topics.json"

const vm = new Vue({
    el: '#topic',
    data: {
        loading: false,
        genderPairs: {
            'ao': ['a', 'o'],
            'ae': ['a', 'e'],
            'a_': ['a', '•'],
        },
        selectedGender: 0,
    },
    async mounted() {
        this.selectedGender = this.randomGender()
    },
    methods: {
        randomGender() {
            if (Math.random() < 0.5) return 0
            else return 1
        },
        changeGender() {
            this.selectedGender = (this.selectedGender + 1) % 2
        },
        navigateTo(path) {
            parent.window.location.href = path
        },

    },
    filters: {},
    computed: {},

});
