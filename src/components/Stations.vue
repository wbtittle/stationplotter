<template lang="html">
  <div class="">
    <Countries />
    <States v-show="visible" />
    <h2>Stations {{ stations.length }}</h2>
    <span v-for="station in stations" :key="station.id"><button :class="station.inventory | flags" v-on:click="setFile(station.id)" >{{ station.name }} {{ station.state }}</button></span>
  </div>
</template>

<script>
import Countries from '@/components/Countries'
import States from '@/components/States'
import { mapState } from 'vuex'

export default {
  name: "Stations",
  data(){
    return {
      rows: stations,
      stations: []
    }
  },
  filters: {
    flags( value ) {
      if (Array.isArray(value))
      {
        if (value.includes("TAVE")||value.includes("TOBS")||value.includes("TMIN")||value.includes("TMAX")||value.includes("TAVG"))
          return "bg-success"
      }
      return ""
    }
  },
  computed: {
    visible(){
      return (this.country.code == "US" || this.country.code == "CA")
    },
    station: {
      get(){
        console.log("GETTER CALLED Station")
        return this.$store.state.station
      },
      set( newStation ) {
        console.log("SETTER CALLEd", newStation)
        this.$store.dispatch("setStation", this.stations.filter( item => item.id == newStation ).pop())
      }
    },
    ...mapState(['state', 'country', 'station', 'stations'])
  },
  watch: {
    country(newCountry){
      console.log( "COUNTRY watch... ", newCountry)
      this.stations = this.rows.filter( item => item.country == newCountry.code && Array.isArray(item.inventory) && (
          item.inventory.includes('TMAX') ||
          item.inventory.includes('TMIN') ||
          item.inventory.includes('TAVG') ||
          item.inventory.includes('TAVE') ||
          item.inventory.includes('TOBS')))
    },
    state(newState){
        console.log( "State watch... ", newState)
      this.stations = this.rows.filter( item => item.state == newState.code )
    }
  },
  components: {
    Countries,
    States
  },
  methods: {
    setFile( file ){
      console.log(this.stations.filter( item => item.id == file ).pop())
      var station = this.stations.filter( item => item.id == file ).pop()
      this.$store.dispatch("setStation", station )
    }
  }
}
</script>

<style lang="css" scoped>
</style>
