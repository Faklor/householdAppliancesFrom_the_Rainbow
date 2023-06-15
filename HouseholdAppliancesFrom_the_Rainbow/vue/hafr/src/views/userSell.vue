<script>
import axios from 'axios'
import { defineComponent } from 'vue'
import { Line } from 'vue3-chart-v2'

export default defineComponent({
  extends: Line,
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
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      required: false
    },
  },
  mounted () {
    this.renderChart(this.chartData, this.chartOptions)
  },

  methods: {
    async theMostProduct(){
      //const {data} = await axios.get('http://localhost:5000/api/diagramsUsers')
      //this.countProdductPay = productsCount.data
      
      
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

