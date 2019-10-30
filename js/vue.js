
let app = new Vue({
    el: '#root',
    data : {
        beers : [],
        data : [],
        current : {},
        page : 1,
        per_page : 80,
        displayDetailedView : false,
        loader : true
    },

    computed : {},

    methods : {
        detailedView : function (id) {
            this.current = this.beers.find(el => el.id == id)
            this.displayDetailedView = true
        },

        getData : async function () {
            this.data = await fetch(`https://api.punkapi.com/v2/beers?page=${this.page}&per_page=${this.per_page}`, {
                method: 'GET',
            })
            .then(res => {
                this.page +=1 
                this.loader = false
                return res.json()
            })
            .catch(err => console.error(err)) 
        },

        loadData : function () {
            this.getData()
                .then(()=>{
                    this.beers = this.beers.concat(this.data)
                })
        }
    },

    created : function () {  

        this.getData()
            .then(()=>{
                this.beers = this.data
            })
            
    },

})


// add nice header
// css customize the individual view of the beer
// right now, the beers load only if a button is pressed --- make it so that it loads when the user scrolls down completely 
// next button on detailed view with updated current 

// back to top button 