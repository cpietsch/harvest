import { scaleLinear, scaleTime, line, extent, select, axisLeft, axisRight } from 'd3'

export default {
  name: 'axisright',
  props: ['scale', 'width', 'height', 'margin'],
  computed: {
    axis: function() {
      return axisRight(this.scale)
        .tickSize(this.width- this.margin.left - this.margin.right)
    }
  },
  render: function (createElement) {
    if(this.$el) this.draw()
    return createElement('g', '')
  },
  methods: {
    draw: function() {
      const s = select(this.$el).call(this.axis)
      s.select('.domain').remove()
      s.selectAll('text').attr('dx', '1em')
    }
  },
  mounted: function() {
    this.$forceUpdate()
  }
}
