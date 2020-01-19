<template>
  <div class="GMApp">

  </div>
</template>

<script>
import gmapsInit from '@/utils/gmaps'
import MarkerClusterer from '@google/markerclusterer'
import { mapGetters } from 'vuex'

export default {
  name: 'GMApp',
  data() {
    return {
      markers: {},
      map: null
    }
  },
  methods: {
    markerClick( marker ){
       this.$store.dispatch("setStation", marker.local_id )
    },
    async initializeMap(){
      console.log("Initializing map")
      try {
        const google = await gmapsInit();
        const geocoder = new google.maps.Geocoder()
        this.map = new google.maps.Map(this.$el)
        const lMap = this.map


        geocoder.geocode({ location:{ lat:parseFloat(this.station.lat), lng:parseFloat(this.station.lng) }}, (results, status) => {
          if (status !== 'OK' || !results[0]){
            throw new Error(status)
          }

          this.map.setCenter(results[0].geometry.location)
          this.map.setZoom(7)
        })

        this.markers = this.stations.map( ( station ) => {
          const marker = new google.maps.Marker(
            {
              local_id: station.id,
              title: station.name,
              position: { lat: parseFloat(station.lat), lng: parseFloat(station.lng)  },
              lMap
            });

          marker.addListener('click', () => this.markerClick( marker ))
          return marker
        })

        new MarkerClusterer(lMap, this.markers, {minimumClusterSize: 5, imagePath: '/img/m', maxZoom: 7})
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    "$route": "initiazeMap",
    station(newStation){
      console.log("Map Watch New Station", newStation, this.map)
      if (this.map) {
         this.map.setCenter({ lat:parseFloat(newStation.lat), lng:parseFloat(newStation.lng)})
         this.map.setCenter({ lat:parseFloat(newStation.lat), lng:parseFloat(newStation.lng)})
      }
    },
    stations( ){
      this.initializeMap()
    }
  },
  computed: mapGetters(['stations', 'station']),
  mounted(){
    this.initializeMap()
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

.GMApp {
  height: 50%;
  width: 100%;
}
</style>
