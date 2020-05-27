const jsonURL = "https://art-decoder.bienal.berinfontes.com/api/collection/1/?format=json"
const jsonURLcrop = "https://art-decoder.bienal.berinfontes.com/api/collection/"
const jsonCollections = "https://art-decoder.bienal.berinfontes.com/api/collection/?format=json"


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
    mounted() {
        this.getCollections();
    },
    methods: {
        getResults() {
            axios.get(jsonURL).then((response) => {
                preRes =  response.data;
                this.results =  preRes;

            }).catch( error => { console.log(error); });
        },
        getCollections() {
            axios.get(jsonCollections).then((response) => {
                preColl =  response.data;
                this.collresults =  preColl;

            }).catch( error => { console.log(error); });
        },

        //all this lowpoint and highpoint thing is due to the fact that there is no collection 1,
        // because we deleted. but we wanted there to be stuff immediately when someone accessed this page.
        changeCollection() {
            this.results = [];
            this.highPoint = parseInt(this.lowPoint) + 1;
            axios.get(jsonURLcrop + this.highPoint + "/?format=json").then((response) => {
                preRes =  response.data;
                this.results =  preRes;
            }).catch( error => { console.log(error); });

        },
    },
    filters: {
        toPercentage: function (value) {
            if (!value) return '';
            value = Math.round((value) * 100);
            return value + "%"
        },
        toFullNumber: function (value) {
            if (!value) return '';
            value = Math.round((value) * 100);
            return value
        },
        substringNumber: function (value, substringVal) {
            if (!value) return '';
            value = value.toString();
            value = value.substring(0, substringVal);
            return value
        },
        removeNullProps: function (object) {
            return _.reject(object, (value) => value === null);
        }
    },
    computed: {
        // a computed getter
        reversedMessage: function () {
            // `this` points to the vm instance
            return this.message.split('').reverse().join('')
        },
        dynamicStyle: function(red, green, blue) {
            var red = 30;
            var green = 30;
            var blue = 30;
            return {
                // in the case of redComp, greenComp and blueComp are a vue prop or data
                color : `rgb(${red}, ${green}, ${blue});`,
            };
        },
        componentToHex: function(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        },
        rgbToHex: function(r, g, b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
    }
});

//initialize page on collection 34
vm.changeCollection()
