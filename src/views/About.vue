<template>
  <div class="about">
    <h1>Charting the worlds temperatures</h1>
    <p>They tell me that the worlds is catching fire. But there are temperature measurement stations all around the world. That data can
      be found at https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/  The data is a little painful to just plot. So this is a tool that will
      let people find the stations they are interested in an look at the raw plot of the data. Right now the data is limited to stations
      that have data after 2018 and more than 30 years of data (as defined by the lastyear - startyear)

      Right now you can select from TMAX (the high temperature of the day), TMIN( the minimum temperature of the day),
       TOBS ( the temperature recorded when the data was collected), TAVG (the average of high and low temperature. ) There are a bunch of
       other measurements that can be accessed, but thaat will be available soon. After I figure out how to make that happen efficiently.
    </p>

    <h2>Things I still want to do:</h2>
    <ul>
      <li>Create a routine that steps through the stations, plots them, saves the image of the plot and then moves onto the next item. </li>
      <li>Create a piece that stacks all of the data onto 1 chart. </li>
      <li>Connect this tool to the BerkeleyEarth representations of the same data</li>
      <li>Make the other datasets also visible (right now we are just looking at the Temperature data. The data sources also include many other observations)</li>
      <li>Make the map open up initially on the continent the person coming from be starting location</li>
    </ul>

    <h2>Interesting locations:</h2>
    <ul>
      <li><button v-on:click="direct_to('AYM00089606')">Vostok Antartica</button> (TMIN -- &lt; -80C)  </li>
      <li>Anyplace in <button v-on:click="direct_to('RSM00025503')">Eastern Russia</button> Range of temperatures </li>
      <li><button v-on:click="direct_to('USC00042319')">Death Valley</button> -- (TMAX -- > 50C)</li>
      <li><button v-on:click="direct_to('VEM00080416')">Caracas, Venezuela</button> -- (TMAX -- > 50C)</li>
      <li><button v-on:click="direct_to('DRM00078486')">SANTO DOMINGO</button> -- (TMAX -- > increasing)</li>
    </ul>

    <p> In case you are wondering why the range of the y-axis is the size it is. See Vostok (TMIN) and Death Valley (TMAX). This is the range of temperatures on our beloved planet</p>

  </div>
</template>
<script>
  export default {
    name: "About",
    data(){
      return {}
    },
    methods: {
      direct_to( id ){
        this.$store.dispatch("setStation", id)
        this.$router.push({ name: 'station', params: { station_id: id }})
      }
    }
  }
</script>
<style>
  p {max-width: 800px}
</style>
