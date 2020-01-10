<template>
  <div>
    <div class="card float-right" style="width:20em" v-if="cur_point.hasOwnProperty('index')">
      <ul class="list-group">
        <li class="list-group-item">TimeTag: {{ cur_point.index }}</li>
        <li class="list-group-item">Value: {{ cur_point.value*elements[cur_point.element].modifier }} {{ elements[cur_point.element].units }}</li>
        <li class="list-group-item">Element: {{ cur_point.element }}</li>
        <li class="list-group-item">Measurement: {{ flags["mflags"]["F"+cur_point.mflag.trim()] }}</li>
        <li class="list-group-item">Quality: {{ flags["qflags"]["F"+cur_point.qflag.trim()] }}</li>
        <li class="list-group-item">Source: {{ flags["sflags"]["F"+cur_point.sflag.trim()] }}</li>
      </ul>
    </div>
    <svg >
      <g style="transform: translate(0, 10px)">
        <path :d="line" />
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { mapGetters } from 'vuex'
import elements from '@/assets/ghcnd-elements.json'
import flags from '@/assets/ghcnd-flags.json'
export default {
  name: 'Chart',
  props: {
    chartData: Array
  },
  data() {
    return {
      cur_point: {},
      line: '',
      height: 800,
      width: 1000,
      chart_height: 800,
      chart_width: 1000,
      flags: flags,
      elements: elements
    }
  },
  watch: {
    chart_data( ) {
      this.drawChart()
    },
    chart_settings() {
      this.drawChart()
    }
  },
  computed: {
    ...mapGetters(['chart_settings'])
  },
  methods: {
    adjust(key, item){
        if (key.match(/sflag|mflag|qflag/))
        {
          console.log(key, item, item.trim(), this.flags[key+"s"], this.flags[key+"s"])
          return item+"|"+this.flags[key+"s"]["F"+item.trim()];
        }
        else
            return item
      },
    handleMouseOver( item ){
      this.cur_point = item
    },
    getScales() {
      const x = d3.scaleTime().range([0, this.chart_width])
      const y = d3.scaleLinear().range([this.chart_height, 0])
      d3.axisLeft().scale(x)
      d3.axisBottom().scale(y)
      x.domain([this.chart_settings.start_year, this.chart_settings.end_year])
      y.domain([this.chart_settings.low, this.chart_settings.high])
      return { x, y };
    },

    drawData( elem ){
      this.circle.data(this.chartData.filter( item => { return item.element == elem }))
      .enter()
      .append('circle')
      .attr("r", 0.25)
      .attr("cx", d=> this.scale.x(d.index))
      .attr("cy", d=> this.scale.y(d.value*this.elements[elem].modifier))
      .attr("stroke",this.elements[elem].color)
      .on('mouseover', this.handleMouseOver)
    },

    drawChart(){

      const margin = 50
      const svg_width = this.chart_settings.width
      const svg_height = this.chart_settings.height
      this.chart_width = svg_width - 2 * margin
      this.chart_height = svg_height - 2 * margin

      this.scale = this.getScales()
      const svg = d3.select('svg')
        .attr('width', svg_width)
        .attr('height', svg_height)

      svg.selectAll("*").remove()

      this.chart = svg.append("g")
                  .attr("transform", `translate(${margin}, ${margin})`)


      this.chart.append('g')
                .call(d3.axisLeft(this.scale.y).ticks(20))
      const format = d3.format("0");
      this.chart.append("g")
                .attr('transform', `translate(0, ${this.chart_height} )`)
                .call(d3.axisBottom(this.scale.x).tickFormat(format))

      this.circle = this.chart
            .selectAll('circle')

            this.chart_settings.elem.forEach( item => this.drawData(item) )

            this.$store.dispatch("setLoading", false)
    }
  },

};
</script>

<style scoped>
svg {
  margin: 25px;
}
path {
  fill: none;
  stroke: #76BF8A;
  stroke-width: 1px;
}
</style>
