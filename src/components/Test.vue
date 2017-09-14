<template>
  <gauge
    title="windspeed"
    height="200"
    width="200"
    unit="m/s"
    :value="8"
    />
</template>

<script>

import Linechart from './Linechart'
import Gauge from './Gauge'
import Panel from './Panel'

import { text, csvParseRows } from 'd3'

export default {
  name: 'test',
  components: { Linechart, Gauge, Panel },
  data: function(){
    return {
      url: 'https://julianoliver.com/harvest/nodes/node1.csv',
      history: [],
      stats: null
    }
  },
  methods: {
    updateStats: function(url){
      return new Promise((resolve, reject) => {
        const header = ['timestamp', 'windspeed','outsidetemp','load','gputemp']
        text(url, text => {
          const parsed = csvParseRows(text)[0]
          if(parsed.length) {
            const data = {}
            header.forEach((name, i) => {
              data[name] = parsed[i]
            })
            data.date = new Date(data.timestamp*1000)
            // this.stats = data
            // console.log(data)
            // this.history.push(data)
            resolve(data)
          }
        })
      })
    }
  },
  mounted: function(){
    this.updateStats(this.url).then(d => {
      console.log(d)
    })
  }
}
</script>

<style scoped>

</style>
