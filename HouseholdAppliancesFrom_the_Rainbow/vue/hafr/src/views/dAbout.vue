<script>
import axios from 'axios'
import { defineComponent } from 'vue'
import { Line  } from 'vue3-chart-v2'

export default defineComponent({
  extends: Line ,
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
        //console.log(sell.date)
        sell.number.map(item=>{
          let sellOb = {
            date:{type:String},
            value:{type:Number},
          }
          let dateOnly = sell.date.split(' ')[0]
          sellOb.date = dateOnly
          sellOb.value = item.value
          this.massCount.push(sellOb)
          //console.log(dateOnly)
        })
      })
      //console.log(this.massCount)
      let counts = {}
      this.massCount.map(item=> { 
        counts[item.date] = (counts[item.date] || 0)+item.value 
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
      //console.log(this.labels, this.values)
      
      this.addInfo()
    },
    addInfo(){
      this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: 'Количество купленных товаров за последние дни',
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


