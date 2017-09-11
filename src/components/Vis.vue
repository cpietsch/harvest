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
    <panel
      v-if="user"
      title="Unconfirmed Balance"
      width="200"
      unit="zec"
      :value="user.unconfirmed_balance"
    />
    <panel
      v-if="user"
      title="Balance"
      width="200"
      unit="zec"
      :value="user.balance"
    />
    <panel
      v-if="user"
      title="account"
      width="200"
      unit=""
      :value="user.account"
    />
    <panel
      v-if="lastblocknumber"
      title="last block number"
      width="200"
      unit=""
      :value="lastblocknumber"
    /> 
  </div>
</template>

<script>
import { json } from 'd3'
import Linechart from './Linechart'
import Gauge from './Gauge'
import Panel from './Panel'
import Rx from 'rxjs/Rx'

export default {
  name: 'vis',
  components: { Linechart, Gauge, Panel },
  data () {
    return {
      url: 'https://api.nanopool.org/v1/zec',
      polling: false,
      pollingTime: 10000
    }
  },
  subscriptions () {
    return {
      timepoll: Rx.Observable
        .timer(0, this.pollingTime)
        .takeWhile((v) => this.polling ? true : v === 0)
        .map((a) => +new Date())
      ,
      lastblocknumber: this.reactivelyFetchData(() => 
        `${this.url}/network/lastblocknumber/?${this.timepoll}`
      ),
      lastblock: this.reactivelyFetchData(() => 
        `${this.url}/blocks/lastblocknumber/${this.lastblocknumber}/1`
      ),
      history: this.reactivelyFetchData(() => 
        `${this.url}/history/${this.addr}?${this.timepoll}`
        )
        .map(data => {
          data.sort((a,b) => a.date - b.date)
          return data.map(d => {
            return {
              date: this.parseDate(d.date),
              value: d.hashrate
            }
          })
        })
      ,
      user: this.reactivelyFetchData(() => 
        `${this.url}/user/${this.addr}?${this.timepoll}`
      ),
      payments: this.reactivelyFetchData(() => 
        `${this.url}/payments/${this.addr}?${this.timepoll}`
      ),
      avgblocktime: this.reactivelyFetchData(() => 
        `${this.url}/network/avgblocktime?${this.timepoll}`
      ),
      prices: this.reactivelyFetchData(() => 
        `${this.url}/prices?${this.timepoll}`
      )
    }
  },
  computed: {
    addr: function(){
      return this.$route.params.addr || 't1brhGiJhFEj2vnxN8gSrxLdokjgJLzSpsU'
    }
  },
  methods: {
    parseDate(date) {
      return new Date(date * 1000)
    },
    poll() {
      this.timepoll = +new Date()
    },
    reactivelyFetchData: function (getter) {
      return this
        .$watchAsObservable(getter)
        .pluck('newValue')
        .switchMap(url => Rx.Observable
          .fromPromise(fetch(url).then(r => r.json()))
          .catch((e) => {
            console.log("api fetch error", e)
            return Rx.Observable.of({ status: false })
          })
        )
        .filter(r => r.status)
        .map(r => r.data)
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
