

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// 

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

    methods : {
        detailedView : function (id) {
            this.current = this.beers.find(el => el.id == id)
            this.displayDetailedView = true
            this.topFunction()
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
                return res.json()
            })
            .catch(err => console.error(err)) 
        },

        loadData : function () {
            this.getData()
                .then(()=>{
                    this.beers = this.beers.concat(this.data)
                })
        },

        scroll : function () {
            window.onscroll = () => {
              let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight
              if (bottomOfWindow) this.loadData()

              const mybutton = document.getElementById("myBtn");
              document.body.scrollTop > 300 || document.documentElement.scrollTop > 300 ? mybutton.style.display = "block" : mybutton.style.display = "none";
           }
        },

        topFunction :  function() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    },

    created : function () {  

        this.getData()
            .then(()=>{
                this.beers = this.data
                this.loader = false
            })
            
    },

    mounted () {
        this.scroll(); 
    }

})


// media queries 
// table instead
// banner 



