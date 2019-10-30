
const mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  document.body.scrollTop > 300 || document.documentElement.scrollTop > 300 ? mybutton.style.display = "block" : mybutton.style.display = "none";
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}




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

        updateCurrentPrevious : function () {
            let index = this.beers.indexOf(this.current) - 1
            index >= 0 ? this.current = this.beers[index] : false
        },

        updateCurrentNext : function () {
            let index = this.beers.indexOf(this.current) + 1
            index < this.beers.length ? this.current = this.beers[index] : false
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

// back to top button style color 







//// const malts = beers.ingredients.malt 
/// WITH  MAP
// const newMalts = malts.map((el) => el.name)
/// SAME AS MAP ABOVE
// const newMalts =[]
// for (let i =0; i < malts.length; i++) {
    // newMalts.push(malts[i].name)
//}

