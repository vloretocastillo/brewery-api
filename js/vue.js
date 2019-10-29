
let app = new Vue({
    el: '#root',
    data : {
        data : [],
        current : {},
        page : 1,
        per_page : 80
    },

    computed : {
        
        
    },

    methods : {
        updateValues : function (id) {
            this.current = this.data.find(el => el.id == id)
            // console.log(this.current.name)
        },

        getData : async function () {
            this.data = await fetch(`https://api.punkapi.com/v2/beers?page=${this.page}&per_page=${this.per_page}`, {
                method: 'GET',
            })
            .then(res => res.json())
            .catch(err => console.error(err)) 
        },
    },

    created : function () {  
        this.getData()
            .then(()=> {
                this.page +=1 
            })
    },

})