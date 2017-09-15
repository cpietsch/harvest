<template>
  <div>
    <linechart
      v-if="history"
      title="Hashrate History"
      width="1750"
      height="820"
      :data="history"
      :margin="{top: 20, right: 80, bottom: 30, left: 10}"
    />
  </div>
</template>

<script>

import Linechart from './Linechart'
import Rx from 'rxjs/Rx'

const parseDate = (date) => new Date(date * 1000)

export default {
  name: 'dashboard',
  components: { Linechart },
  props: ['polling', 'pollingTime', 'addr'],
  data () {
    return {
      url: 'https://api.nanopool.org/v1/zec'
    }
  },
  subscriptions () {
    return {
      timepoll: Rx.Observable
        .timer(0, this.pollingTime)
        .takeWhile((v) => this.polling ? true : v === 0)
        .map((a) => +new Date())
      ,
      history: this.$reactivelyFetchData(() =>
        `${this.url}/history/${this.addr}?${this.timepoll}`
        )
        .map(data => {
          data.sort((a,b) => a.date - b.date)
          return data.map(d => {
            return {
              date: parseDate(d.date),
              value: d.hashrate
            }
          })
        })
    }
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

  body {
    overflow: hidden;
  }
</style>
