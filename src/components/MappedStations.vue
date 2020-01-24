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
        this.map = new google.maps.Map(this.$el)
        const lMap = this.map



          this.map.setCenter({ lat:parseFloat(this.station.lat), lng:parseFloat(this.station.lng) })
          if (parseFloat(this.station.lat)==0 && parseFloat(this.station.lng)==0)
            this.map.setZoom(0)
          else
            this.map.setZoom(5)


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
         this.map.setZoom(6)
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
