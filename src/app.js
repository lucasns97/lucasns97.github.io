
const vm = new Vue({
    el: '#app',
    data: {
        inputData: '',
        activeMenu: '1',
        dictData: '',
        language: 'pt',
    },
    mounted() {
        this.loadJSON(function(response) {
            // Parse JSON string into object
            this.dictData = JSON.parse(response);
            console.log(this.dictData)
        });
    },
    methods: {
        handleMenu(key, keyPath) {
            this.activeMenu = key;
        },

        loadJSON(callback) {   

            var xobj = new XMLHttpRequest();

            xobj.overrideMimeType("application/json");
            xobj.open('GET', 'https://raw.githubusercontent.com/lucasns97/lucasns97.github.io/master/src/json/dict.json', true);

            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                    callback(xobj.responseText);
                }
            };
            xobj.send(null);  
        }
    },
    filters: {},
    computed: {}
});
