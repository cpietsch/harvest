<template>
  <div class="chartsmall">
    <h3>{{ title }}</h3>
     <svg :width="width" :height="height">
      <g :transform="transform">
        <axisright :scale="scaleY" :width="width" :height="height" :margin="margin" :unit="unit" class="axis"/>
        <axisbottom :scale="scaleX" :width="width" :height="height" :margin="margin" class="axis axisx"/>
        <path :d="linePath" />
      </g>
    </svg>
  </div>
</template>

<script>
import { scaleLinear, scaleTime, scaleLog, line, extent, select, axisLeft, axisRight } from 'd3'
import Axisright from './Axisright.js'
import Axisbottom from './Axisbottom.js'

export default {
  name: 'linechartsmall',
  props: ['data', 'width', 'height', 'margin', 'title', 'unit'],
  components: { Axisright, Axisbottom },
  computed: {
    extentX: function() {
      return extent(this.data, d => d.date)
    },
    scaleX: function() {
      return scaleTime()
        .range([0, this.width - this.margin.left - this.margin.right])
        .domain(this.extentX)
    },
    extentY: function() {
      return extent(this.data, d => d.value)
    },
    scaleY: function() {
      return scaleLinear()
        .range([0, this.height - this.margin.top - this.margin.bottom])
        .domain([this.extentY[1], 0])
    },
    linePath: function() {
      return line()
        .x(d => this.scaleX(d.date))
        .y(d => this.scaleY(d.value))
        (this.data)
    },
    transform: function() {
      return `translate(${this.margin.left}, ${this.margin.top})`
    }
  }
}
</script>

<style>

  .chartsmall {
    padding: 15px;
    margin: 10px;
    background: rgba(111, 111, 111, 0.19);
    display: block;
    float: left;
    width: 580px;
  }

  .chartsmall h3 {
    text-transform: uppercase;
    font-size: 1.2em;
    color: #696969;
    margin: 0;
    margin-bottom: 10px;
    padding-left: 5px;
    padding-top: 5px;
  }

  .chartsmall path {
    fill: none;
    stroke: #6cf391;
    stroke-width: 0.2em;
  }

  .chartsmall .axis line {
    /*stroke: #444444;*/
    stroke: none;
    stroke-width: 1px;
  }
  .chartsmall .axis text {
    fill: #999;
    font-family: 'Cousine';
    font-size: 1em;
  }
  .chartsmall .axisx line {
    stroke-dasharray: 1 1;
    display: none;
  }
</style>
