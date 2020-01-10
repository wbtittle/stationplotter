<template>
  <div class="GMApp">

  </div>
</template>

<script>
import gmapsInit from '@/utils/gmaps'
import stations from '@/assets/ghcnd-stations.json'
import MarkerClusterer from '@google/markerclusterer'

export default {
  name: 'GMApp',
  data() {
    return {
      stations: stations,
      markers: {}
    }
  },
  methods: {
    markerClick( marker ){
       const station = this.stations.filter( item => item.id == marker.local_id ).pop()
       this.$store.dispatch("setStation", station )
    }
  },
  async mounted(){
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder()
      const map = new google.maps.Map(this.$el)

      geocoder.geocode({ address: 'United States' }, (results, status) => {
        if (status !== 'OK' || !results[0]){
          throw new Error(status)
        }

        map.setCenter(results[0].geometry.location)
        map.fitBounds(results[0].geometry.viewport)
      })

      this.markers = this.stations.map( ( station ) => {
        const marker = new google.maps.Marker({ local_id: station.id, title: station.name, position: { lat: parseFloat(station.lat), lng: parseFloat(station.lng)  } , map });
        marker.addListener('click', () => this.markerClick( marker ))
        return marker
      })

    new MarkerClusterer(map, this.markers, { imagePath: '/img/m'}) 
    } catch (error) {
      console.log(error)
    }
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
