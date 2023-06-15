<script>
import axios from 'axios'
import { defineComponent } from 'vue'
import { Pie } from 'vue3-chart-v2'

export default defineComponent({
  extends: Pie,
  data() {
    return {
      countProdductPay:[],
      labels:[],
      values:[],
      massCount:[],
      test:[1,2,3,4],
    }
  },
  mounted () {
    this.theMostProduct()
    
  },

  methods: {
    async theMostProduct(){
      const productsCount = await axios.get('http://localhost:5000/api/diagrams')
      this.countProdductPay = productsCount.data

      this.countProdductPay.sells.map(sell=>{
        sell.number.map((item)=>{
          let sellOb = {
            name:{type:String},
            value:{type:Number},
          }
          sellOb.name = item.product.product.info.name + ' ' + item.product.product.info.manufacturer + ' ' + item.product.product.info.model
          sellOb.value = item.value
          this.massCount.push(sellOb)
        })
      })
      let counts = {}
      this.massCount.map(item=> { 
        counts[item.name] = (counts[item.name] || 0)+item.value 
        //
      })
      //console.log(counts)
      let a = JSON.stringify(counts)
      let b = a.replace(/"/g,'').replace(/{/g,'').replace(/}/g,'')
      let v = b.split(',')
      v.map(item=>{
        //item.split(':')
        //console.log(item.split(':')[0])
        this.labels.push(item.split(':')[0])
        this.values.push(Number(item.split(':')[1]))
      })
      //console.log(JSON.parse(JSON.stringify(this.labels)),JSON.parse(JSON.stringify(this.values)),this.test)
      this.addInfo()
    },
    addInfo(){
      this.renderChart({
      labels: this.labels,
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
          data: this.values,
          
          //#f87979
        }
      ]
    })
    }
  },
})


//import { h } from 'vue'
// render() {
//     return h('div')
//   },
</script>

<style>
  canvas{
   width:500px;
  }
</style>


