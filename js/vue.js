
let app = new Vue({
    el: '#root',
    data : {
        data : [],
        current : {},
        page : 1,
        per_page : 80,
        displayDetailedView : false
    },

    computed : {},

    methods : {
        detailedView : function (id) {
            this.current = this.data.find(el => el.id == id)
            this.displayDetailedView = true
        },

        getData : async function () {
            this.data = await fetch(`https://api.punkapi.com/v2/beers?page=${this.page}&per_page=${this.per_page}`, {
                method: 'GET',
            })
            .then(res => {
                this.page +=1 
                return res.json()
            })
            .catch(err => console.error(err)) 
        },
    },

    created : function () {  

        this.getData()
            
    },

})