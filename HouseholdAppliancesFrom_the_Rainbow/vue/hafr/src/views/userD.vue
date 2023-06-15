<script>
import axios from 'axios'
import { defineComponent } from 'vue'
import { Pie } from 'vue3-chart-v2'

export default defineComponent({
  extends: Pie,
  data() {
    return {
      countUserPay:[],
      labels:[],
      values:[],
      massCount:[],
      test:[1,2,3,4],
    }
  },
  mounted () {
    this.theMostUser()
    
  },

  methods: {
    async theMostUser(){
      const usersCount = await axios.get('http://localhost:5000/api/diagrams')
      this.countUserPay = usersCount.data
      
      this.countUserPay.sells.map(sell=>{
        this.massCount.push(sell.user) 
      })
      let counts = {}
      this.massCount.map(item=> { 
        counts[item] = (counts[item] || 0)+1
        //
      })
      
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
          //label: 'Самый покупаемый товар',
          backgroundColor: [
            '#EAC870 ',
            '#A23CC6',
            '#43C89B',
            '#D79999',
            '#F2B063'
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


