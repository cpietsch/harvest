<template>
  <div>
    <!-- <input type="text" v-model="addr"> -->
    <linechart
      v-if="history"
      title="Hashrate History"
      width="900"
      height="300"
      :data="history"
      :margin="{top: 20, right: 60, bottom: 10, left: 10}"
    />
    <gauge
      v-if="user"
      title="Hashrate"
      width="200"
      height="200"
      unit="sol/s"
      :value="user.hashrate"
      :max="user.avgHashrate.h3"
    />
    <gauge
      title="windspeed"
      width="200"
      height="200"
      unit="km/s"
      :value="14"
    />
    <gauge
      v-if="user"
      title="Balance"
      width="200"
      height="200"
      unit="zec"
      :value="user.balance"
    />
  </div>
</template>

<script>
import { json } from 'd3'
import Linechart from './Linechart'
import Gauge from './Gauge'

export default {
  name: 'vis',
  components: { Linechart, Gauge },
  data () {
    return {
      url: 'https://api.nanopool.org/v1/zec'
    }
  },
  asyncComputed: {
    history: function(){
      return new Promise(resolve =>
        json(this.url + '/history/' + this.addr, result => {
          const { data } = result
          data.sort((a,b) => a.date - b.date)
          resolve(data.map(d => {
            return {
              date: this.parseDate(d.date),
              value: d.hashrate
            }
          }))
        })
      )
    },
    user: function(){
      return new Promise(resolve =>
        json(this.url + '/user/' + this.addr, result => {
          resolve(result.data)
        })
      )
    }
  },
  computed: {
    addr: function(){
      return this.$route.params.addr || 't1brhGiJhFEj2vnxN8gSrxLdokjgJLzSpsU'
    }
  },
  mounted () {

  },
  methods: {
    parseDate(date) {
      return new Date(date * 1000)
    }
  },
  beforeDestroy () {
  }
}
</script>

<style scoped>
  input {
    background: none;
    color: #999;
    font-family: 'Titillium Web';
    display: block;
    font-size: 1.2em;
    border:0;

  }
</style>
