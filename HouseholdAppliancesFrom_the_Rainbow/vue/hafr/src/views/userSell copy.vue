<script>
import axios from 'axios'
import { defineComponent } from 'vue'
import { Bar } from 'vue3-chart-v2'

export default defineComponent({
  extends: Bar,
  data() {
    return {
      countProdductPay:[],
      labels:[],
      values:[],
      users:[],
      massCount:[],
      test:[1,2,3,4],
    }
  },
  mounted () {
    this.theMostProduct()
    
  },

  methods: {
    async theMostProduct(){
      const {data} = await axios.get('http://localhost:5000/api/diagramsUsers')
      //this.countProdductPay = productsCount.data
      //console.log(data)
      this.countProdductPay = []
      this.labels = []
      this.values = []

      

      data.sellsUsers.map(sell=>{
        this.countProdductPay.push(sell)
        sell.mass.map(item=>{
          item.map(item=>{
            let sellOb = {
              login:{type:String},
              name:{type:String},
              value:{type:Number},
            }
            //console.log(item)
            sellOb.login = sell._id
            sellOb.name = item.product.product.info.name +' '+item.product.product.info.manufacturer+' '+item.product.product.info.model
            sellOb.value = item.value
            this.massCount.push(sellOb)
            //console.log(sellOb)
          })
          
        })
        
      })
      let counts = {}
      this.massCount.map(item=> { 
        //counts[item.name] = (counts[item.name]|| 0)+item.value  
        counts[item.login] = (counts[item.login]|| 0)+Number(item.value) +'-'+ item.name+'.'
       // counts[item.login] = (counts[item.name] || 0)+item.value +'/'+ item.name +'/'+ item.login
        //console.log(item.login)
        //
      })
      let a = JSON.stringify(counts)
      let b = a.replace(/"/g,'').replace(/{/g,'').replace(/}/g,'')
      let v = b.split(',')
      v.map(item=>{
        item.split(':')
        console.log(item.split('-')[0])
        this.users.push(item.split(':')[0])
        //this.labels.push(item.split(':')[0])
        //this.values.push(Number(item.split('-')[0]))
        //console.log(item)
      })
      console.log(this.users)
      //console.log(b)
      
      this.addInfo()
    },
    addInfo(){
      this.renderChart({
      name: 'MonthlyChart',
      labels: [],
      datasets: [
        {
          //label: 'Самый покупаемый товар',
          backgroundColor: [
            '#f87979 ',
            '#41B883',
            '#F5CDCD',
            '#FF0000',
            '#DD1B16'
          ],
          data: [],
          
          //#f87979
        }
      ]
    })
    }
  },
})

</script>

<style lang="scss">
  canvas{
   width:500px;
  }
</style>

