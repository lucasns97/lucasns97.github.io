
const vm = new Vue({
    el: '#app',
    data: {
        inputData: '',
        activeMenu: '1',
        dictData: '',
    },
    mounted() {
        this.loadJSON(function(response) {
            // Parse JSON string into object
            dictData = JSON.parse(response);
        });
    },
    methods: {
        handleMenu(key, keyPath) {
            this.activeMenu = key;
        },

        loadJSON(callback) {   

            var xobj = new XMLHttpRequest();

            xobj.overrideMimeType("application/json");
            xobj.open('GET', './src/json/dict.json', true);

            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                    console.log(xobj.responseText)
                    callback(xobj.responseText);
                }
            };
            xobj.send(null);  
        }
    },
    filters: {},
    computed: {}
});
