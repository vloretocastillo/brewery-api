
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

        updateCurrent : function (id) {
            let index = this.beers.indexOf(this.current) 
            this.current = this.beers[index + 1]
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


// css customize the individual view of the beer
// right now, the beers load only if a button is pressed --- make it so that it loads when the user scrolls down completely 
// next button on detailed view with updated current 
// tell the user when its over

// back to top button 


//// const malts = beers.ingredients.malt 


/// WITH  MAP
// const newMalts = malts.map((el) => el.name)


/// SAME AS MAP ABOVE
// const newMalts =[]
// for (let i =0; i < malts.length; i++) {
    // newMalts.push(malts[i].name)
//}

