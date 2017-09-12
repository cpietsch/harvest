<template>
  <div class="chart">
    <h3>{{ title }}</h3>
     <svg :width="width" :height="height">
      <g>
        <axisright :scale="scaleY" :width="width" :height="height" :margin="margin" class="axis"/>
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
  name: 'linechart',
  props: ['data', 'width', 'height', 'margin', 'title'],
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

  .chart {
    padding: 3em;
    margin: 2em;
    background: rgba(113, 113, 113, 0.17);
    float: left;
  }

  .chart h3 {
    text-transform: uppercase;
    font-size: 1.9em;
    color: #696969;
    margin: 0;
    margin-bottom: 1em;
  }

  .chart path {
    fill: none;
    stroke: #6cf391;
    stroke-width: 0.2em;
  }

  .chart .axis line {
    stroke: #444444;
    stroke-width: 2px;
  }
  .chart .axis text {
    fill: #999;
    font-family: 'Cousine';
    font-size: 1.5em;
  }
  .chart .axisx line {
    stroke-dasharray: 5 5;
  }
</style>
