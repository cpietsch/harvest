import { scaleLinear, scaleTime, line, extent, select, format, axisRight } from 'd3'

const formatNumber = format(",.2r")

export default {
  name: 'axisright',
  props: ['scale', 'width', 'height', 'margin', 'unit'],
  computed: {
    axis: function() {
      return axisRight(this.scale)
        .tickSize(this.width- this.margin.left - this.margin.right)
        .tickFormat((d,i) => {
          return d == 0 ? '0 ' + this.unit : formatNumber(d)
        })
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
