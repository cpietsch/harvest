<template>
  <div class="gauge">
    <h3>{{ title }}</h3>
     <svg :width="width" :height="height">
      <g :transform="transform">
      <path :d="backgroundArc" class="backgroundArc"/>
      <path :d="arc" class="arc"/>
      <text>{{ hashrate }} {{ unit }}</text>
      </g>
    </svg>
  </div>
</template>

<script>
import { select, arc } from 'd3'
export default {
  name: 'gauge',
  props: ['value', 'width', 'height', 'title', 'unit'],
  data: function(){
    return {
      margin: 10,
      border: 20
    }
  },
  computed: {
    hashrate: function() {
      return Math.round(this.value * 10000) / 10000
    },
    transform: function() {
      return `translate(${this.width/2}, ${this.height/2 + this.margin})`
    },
    angle: function() {
      return Math.random()
    },
    arc: function () {
      return arc()
        // .cornerRadius(8)
        .innerRadius(this.width/2 - this.margin - this.border)
        .outerRadius(this.width/2 - this.margin)
        .startAngle(-Math.PI * 0.8)
        .endAngle((Math.PI* 0.8) - this.angle)()
    },
    backgroundArc: function(){
      return arc()
        // .cornerRadius(8)
        .innerRadius(this.width/2 - this.margin - this.border)
        .outerRadius(this.width/2 - this.margin)
        .startAngle(-Math.PI * 0.8)
        .endAngle(Math.PI* 0.8)()
    }
  }
}
</script>

<style scoped>

  .gauge {
    padding: 20px;
    margin: 20px;
    background: #151515;
    display: block;
    float: left;
  }

  h3 {
    text-transform: uppercase;
    font-size: 1.4em;
    color: #696969;
    margin: 0;
    margin-bottom: 10px;
  }

  .hashrate {
    font-weight: normal;
  }

  .backgroundArc {
    fill: black;
  }
  .arc {
    fill: #6cf391;
  }

  text {
    text-anchor: middle;
    fill: #666;
    font-size: 1.3em;
  }

  .chart path {
    fill: none;
    stroke: #6cf391;
    stroke-width: 2px;
  }

  .chart .axis line {
    stroke: #444444;
  }
  .chart .axis text {
    fill: #999;
    font-family: 'Cousine'
  }
</style>
