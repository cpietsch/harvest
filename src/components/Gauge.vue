<template>
  <div class="gauge">
    <h3>{{ title }}</h3>
     <svg :width="width" :height="height">
      <g :transform="transform">
      <path :d="backgroundArc" class="backgroundArc"/>
      <path :d="arc" class="arc"/>
      <text>{{ rounded }} {{ unit }}</text>
      </g>
    </svg>
  </div>
</template>

<script>
import { select, arc } from 'd3'
import TWEEN from 'tween'

export default {
  name: 'gauge',
  props: ['value', 'width', 'height', 'title', 'unit'],
  data: function(){
    return {
      margin: 5,
      border: 25,
      max: 1,
      animatedNumber: 0
    }
  },
  watch: {
    value: function(newValue,oldValue){
      newValue = newValue*1
      oldValue = oldValue*1
      console.log(newValue,oldValue)
      if(newValue > this.max) this.max = newValue

      var vm = this
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 2000)
        .onUpdate(function () {
          vm.animatedNumber = this.tweeningNumber.toFixed(2)
        })
        .start()
      animate()
    }
  },
  computed: {
    rounded: function() {
      return Math.round(this.animatedNumber * 10000) / 10000
    },
    transform: function() {
      return `translate(${this.width/2}, ${this.height/2 + this.margin})`
    },
    percent: function() {
      return this.animatedNumber / this.max
    },
    arc: function () {
      return arc()
        // .cornerRadius(8)
        .innerRadius(this.width/2 - this.margin - this.border)
        .outerRadius(this.width/2 - this.margin)
        .startAngle(-Math.PI+0.5)
        .endAngle(this.percent * (2*Math.PI-1) - Math.PI+0.5)()
    },
    backgroundArc: function(){
      return arc()
        // .cornerRadius(8)
        .innerRadius(this.width/2 - this.margin - this.border)
        .outerRadius(this.width/2 - this.margin)
        .startAngle(-Math.PI+0.5)
        .endAngle((Math.PI*2) - (Math.PI+0.5))()
    }
  },
  created() {
    this.max = this.value * 1.1
    this.animatedNumber = this.value * 1
  }
}
</script>

<style scoped>

  .gauge {
    padding: 20px;
    margin: 10px;
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

/*  background: #151515;
  animation: Ping 2s ease;

  @keyframes Ping {
      0%{background: #151515;}
      50%{background: #EEE}
      100%{background: #151515;}
  }*/
</style>
