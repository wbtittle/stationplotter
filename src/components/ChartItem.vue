<template lang="html">
  <div class="col-8">
    <div class="spinner-border" style="width: 10rem; height: 10rem;position: absolute; top: 25%; left: 50%" v-show="loading"  role="status">
        <span class="sr-only">Loading...</span>
    </div>
    <h4>{{ station.name | shorten }} {{ station.id }} </h4>
    <h5>{{ network[station.network] }}</h5>
    <h5>{{ station.lat }}<span> {{ station.lng }} </span></h5><h5><span> {{ station.state }} </span><span> {{ station.country }} </span></h5>

    <Chart :chartData="chartData" />
  </div>
</template>

<script>
import axios from 'axios'
import flags from '@/assets/ghcnd-flags.json'
import Chart from '@/components/Chart'
import { mapState, mapGetters } from "vuex"

export default {
  name: "ChartItem",
  data(){
    return {
      url:"https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/all/",
      iteration: 0,
      rows: [],
      stationFile: null,
      chartData: [],
      network: flags.network
    }
  },
  filters: {
    shorten(value){
      return value.substr(0,25)
    }
  },
  computed: {
    getUrl(){
        return this.url+this.siteFile+".dly"
    },
    tempkeys(){
      if (this.temperatures.length > 0)
        return Object.keys(this.temperatures[0])
      else return []
    },
    ...mapState(['loading']),
    ...mapGetters(['station', 'chart_settings','stations'])
  },
  methods: {
    iter(){
      return this.iteration++
    },
    parseData(){
      this.chartData = this.stationFile.split("\n").reduce( (results, item )=> {
        var year = item.substr(11,4)
        var month= item.substr(15,2)
        var element = item.substr(17,4)
        var day = 0

          for(var i=21; i<269; i+=8){
            day++;
            var date = new Date(year, month, day)
            var DOY = date.getDOY();
            var partial = DOY/(date.isLeapYear()?366:365)
            var index = parseFloat(year) + partial
            var value = parseInt(item.substr(i,5))
            var mflag = item.substr(i+5,1)
            var qflag = item.substr(i+6,1)
            var sflag = item.substr(i+7,1)

            const regExp = new RegExp(this.chart_settings.elem.join("|"))
            if (!isNaN(index) && !isNaN(value) && value != -9999 && element.match(regExp)){
              results.push({index, element, value, mflag, qflag, sflag})
            }

          }
        return results
      }, [])
    }
  },
  watch: {
    stations( newStations ){
      console.log("HEY,  Stations are now loaded I mounted... Lets see if we have a station_id in play", this.$route.params)
      if(this.$route.params.hasOwnProperty('station_id') && newStations.length > 0 ){
        this.$store.dispatch('setStation', this.stations.filter( station=> station.id==this.$route.params.station_id).pop())
      }
    },
    station(newStation){
        this.$store.dispatch("setLoading", true)
        console.log("New Station", newStation, newStation.id.length )
        if (newStation.id.length == 11)
          axios.get(this.url+newStation.id+".dly")
               .then( response => (this.stationFile=response.hasOwnProperty('data')?response.data:""))
    },
    chart_settings(){
      this.parseData()
    },
    stationFile(){
      this.parseData()
    }

  },
  mounted(){


  },

  components: {
    Chart
  }
}
</script>

<style lang="css" scoped>
</style>
