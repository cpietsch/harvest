import { scaleLinear, scaleTime, line, extent, select, axisBottom } from 'd3'

export default {
  name: 'axisbottom',
  props: ['scale', 'width', 'height', 'margin'],
  computed: {
    axis: function() {
      return axisBottom(this.scale)
        .tickSize(this.height- this.margin.top - this.margin.bottom)
    }
  },
  render: function (createElement) {
    if(this.$el) this.draw()
    return createElement('g', '')
  },
  methods: {
    draw: function() {
      const s = select(this.$el)
        .attr("transform", "translate(0," + (this.margin.top) + ")")
        .call(this.axis)
      s.select('.domain').remove()
      s.selectAll('text').attr('dy', '1em')
    }
  },
  mounted: function() {
    this.$forceUpdate()
  }
}
