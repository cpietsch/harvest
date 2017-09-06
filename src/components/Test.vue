<template>
  <svg width="1000" height="500"></svg>
</template>

<script>

import * as d3 from 'd3';

export default {
  name: 'test',
  mounted () {
    var data = []
    var svg = d3.select(this.$el),
        margin = {top: 40, right: 40, bottom: 40, left: 40},
        width = svg.attr("width") - margin.left - margin.right,
        height = svg.attr("height") - margin.top - margin.bottom;

    var formatValue = d3.format(",d");

    var now = Date.now()

    var x = d3.scaleTime()
        .rangeRound([0, width])
        .domain([now - 1000 * 60 * 7, now + 1000 * 60 * 3])
        .clamp(true)

    var r = d3.scaleLinear()
      .range([1,20])
      .domain([0.00001,300])
      // .clamp(true)

    var opacity = d3.scaleLinear()
      .range([1,0.05])
      .domain([0.00001,300])
      .clamp(true)

    var fill = d3.scaleSequential(d3.interpolateRainbow)
        .domain([0.00001,300])

    var voronoi = d3.voronoi()
      .extent([[-margin.left, -margin.top], [width + margin.right, height + margin.top]])
      .x(function(d) { return d.x; })
      .y(function(d) { return d.y; })

    data.forEach(d => {
      d.x = x(d.time)
      d.y = height / 2 + ((Math.random()-0.5) * height)
    })

    var simulation = d3.forceSimulation(data)
          .force("x", d3.forceX(d => x(d.time)).strength(1))
          .force("y", d3.forceY(height / 2))
          .force("collide", d3.forceCollide(d => r(d.value) + 2))
          .on("tick", _ => {
            cells
              .attr("r", d => r(d.value))
              .attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; });
          });

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xAxis = d3.axisBottom(x);
    var xAxisG = g.append("g")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxis);

    var cell = g.append("g")
      .attr("class", "cells")

    var cells = cell.selectAll('circle')

    // api.on('tx', tx => {
    //   // console.log(tx)
    //   tx.x = x(tx.time)
    //   tx.y = height / 2 + ((Math.random()-0.5) * height)
    //   data.push(tx)
    //   simulation.nodes(data)
    //   simulation.alpha(0.3)

    //   cells = cell.selectAll('circle').data(data)
    //   cells.exit()
    //     .remove()

    //   cells.enter()
    //     .append("circle")
    //     //.attr("fill", d => fill(d.value))
    //     .style('opacity', 0)
    //     .transition(4000)
    //     .style('opacity', d => opacity(d.value))
    //     //.attr("r", d => r(d.value))
    //     // .attr("cx", function(d) { return d.x; })
    //     // .attr("cy", function(d) { return d.y; });
    // })

    // data.push({ time: Date.now(), value: Math.random() * 10, id: "asd" })
    // simulation.nodes(data)
    // simulation.alpha(1)

    // this.timer = d3.timer(function() {
    //   // var now = Date.now();
    //   // x.domain([now - 5000, now]);
    //   // xAxisG.call(xAxis);
    //   // cell.selectAll("g").data()
    //   console.log(data)
    // }, 500);

  },
  beforeDestroy () {
    // this.timer.stop()
  }
}
</script>

<style scoped>

</style>
