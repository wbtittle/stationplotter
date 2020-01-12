<template>
<div class="accordion">
  <div class="card" style="width: 30rem">
    <div class='card-header' id='map-select'>
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#mapSelect">
          Map
        </button>
      </h2>
    </div>

        <MappedStations />



    <div class='card-header' id='data-select'>
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#dataSelect">
          Data Elements
        </button>
      </h2>
    </div>

    <div id='dataSelect' class="collapse show" style="height: 25%" data-parent="#data-select">
      <div class="card-body">
        <div v-for="name in inventory" :key="name" class="input-group input-group-sm">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <input type='checkbox' :id="name" v-model="elem" :value="name" />
            </div>
          </div>
          <input type='text' class="form-control" :value='elements[name].description' />
        </div>
      </div>
    </div>

    <div class='card-header' id='chart-select'>
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#chartSelect">
          Chart Settings
        </button>
      </h2>
    </div>

    <div id='chartSelect' class="collapse show" style="height: 25%" data-parent="#chart-select">
      <div class="card-body">
        <div class="input-group input-group-sm">
          <div class="input-group-prepend">
            <div class="input-group-text">Width</div>
          </div>
          <input class="form-control" v-on:keyup="updateChart" type="text" v-model="chart_settings.width">


          <div class="input-group input-group-sm ">

            <div class="input-group-prepend">
              <div class="input-group-text">Height</div>
            </div>
            <input class="form-control" v-on:keyup="updateChart" type="text" v-model="chart_settings.height">
          </div>

          <div class="input-group input-group-sm ">

            <div class="input-group-prepend">
              <div class="input-group-text">Start Year</div>
            </div>
            <input class="form-control" v-on:keyup="updateChart" type="text" v-model="chart_settings.start_year">
          </div>

          <div class="input-group input-group-sm ">

            <div class="input-group-prepend">
              <div class="input-group-text">End Year</div>
            </div>
            <input class="form-control" v-on:keyup="updateChart" type="text" v-model="chart_settings.end_year">
          </div>

          <div class="input-group input-group-sm ">

            <div class="input-group-prepend">
              <div class="input-group-text">Low Value</div>
            </div>
            <input class="form-control" v-on:keyup="updateChart" type="text" v-model="chart_settings.low">
          </div>

          <div class="input-group input-group-sm ">

            <div class="input-group-prepend">
              <div class="input-group-text">High Value</div>
            </div>
            <input class="form-control" v-on:keyup="updateChart" type="text" v-model="chart_settings.high">
          </div>

          <div class="input-group input-group-sm ">

            <div class="input-group-prepend">
              <div class="input-group-text">Temp Units</div>
            </div>
            <input class="form-control" v-on:keyup="updateChart" type="text" v-model="chart_settings.units">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import { mapState } from "vuex"
  import MappedStations from "@/components/MappedStations"
  import elements from '@/assets/ghcnd-elements.json'

  export default {
      name: 'ControlPanel',
      data(){
        return {
          elements: elements,
          elem: [],
          station_elem: ''
        }
      },
      filters: {
        shorten( value ){
          return value.substr(0,30)
        }


      },
      watch: {
        elem( ){
          this.updateChart()
        },
        station_elem(newElem) {
          this.$store.dispatch("setStationElem", newElem)
        }
      },
      computed: {
        findstations(){
          return ["TAVG","TOBS","TMIN","TMAX","PRCP","SNOW","SNWD"]
        },
        inventory(){
          return this.station.inventory
        },
        ...mapState(['chart_settings','station' ])
      },
      methods: {
        updateChart( ){
          this.$store.dispatch("setLoading", true)
          this.$store.dispatch("setChartValues", {
            width: parseInt(this.chart_settings.width),
            height: parseInt(this.chart_settings.height),
            start_year: parseInt(this.chart_settings.start_year),
            end_year: parseInt(this.chart_settings.end_year),
            high: parseInt(this.chart_settings.high),
            low: parseInt(this.chart_settings.low),
            units: this.chart_settings.units,
            elem: this.elem
          } )
        }
      },
      components: {
        MappedStations
      }
  }

</script>

<style>
  .input-group-prepend.div { width: 33%}
  .card { height: 75vh;}
  .card-body {
    margin: 2px
  }
</style>
