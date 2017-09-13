<template>
  <div>
    <!-- <input type="text" v-model="addr"> -->
    <!-- <button v-on:click="polling = !polling">{{polling}}</button> -->
    <div v-if="view === 'graph'">
      <linechart
        v-if="history"
        title="Hashrate History"
        width="1750"
        height="900"
        :data="history"
        :margin="{top: 20, right: 80, bottom: 30, left: 10}"
      />
    </div>
    <div v-if="view === 'dashboard'">
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
        height="200"
        width="200"
        unit="m/s"
        :value="9"
      />
      <panel
        v-if="user"
        title="address"
        unit=""
        :value="user.account"
      />
      <panel
        v-if="user"
        title="Unconfirmed Balance"
        unit="zec"
        :value="user.unconfirmed_balance"
      />
      <panel
        v-if="user"
        title="Balance"
        unit="zec"
        :value="user.balance"
      />
      <panel
        title="outside temperature"
        unit="°C"
        :value="19"
      />
      <panel
        title="GPU load"
        unit="W"
        :value="242"
      />
      <panel
        title="GPU temp"
        unit="°C"
        :value="67"
      />
      <panel
        v-if="payments"
        title="payouts"
        unit=""
        :value="payments.length"
      />
      <panel
        v-if="lastblocknumber"
        title="last block number"
        unit=""
        :value="lastblocknumber"
      />
      <panel
        v-if="avgblocktime"
        title="avg blocktime"
        unit="sec"
        :value="avgblocktime"
      />
      <panel
        v-if="prices"
        title="zec Price"
        unit="btc"
        :value="prices.price_btc"
      />
      <panel
        v-if="prices"
        title="zec Price"
        unit="€"
        :value="prices.price_eur"
      />
      <panel
        v-if="prices"
        title="zec Price"
        unit="$"
        :value="prices.price_usd"
      />
      <panel
        v-if="totalpayout"
        title="total mined"
        unit="zec"
        :value="totalpayout"
      />
      <panel
        v-if="totalpayout"
        title="total mined"
        unit="$"
        :value="totalpayout"
      />
    </div>
  </div>
</template>

<script>
import { json, csvParseRows } from 'd3'
import Linechart from './Linechart'
import Gauge from './Gauge'
import Panel from './Panel'
import Rx from 'rxjs/Rx'

const parseDate = (date) => new Date(date * 1000)

export default {
  name: 'vis',
  components: { Linechart, Gauge, Panel },
  data () {
    return {
      url: 'https://api.nanopool.org/v1/zec',
      polling: true,
      pollingTime: 30000,
      csvUrl: 'https://julianoliver.com/harvest/nodes/node1.csv'
    }
  },
  subscriptions () {
    return {
      timepoll: Rx.Observable
        .timer(0, this.pollingTime)
        .takeWhile((v) => this.polling ? true : v === 0)
        .map((a) => +new Date())
      ,
      // csv: this.reactivelyFetchCsv(() => {
      //   `${this.csvUrl}?${this.timepoll}`
      // }),
      lastblocknumber: this.reactivelyFetchData(() =>
        `${this.url}/network/lastblocknumber/?${this.timepoll}`
      ),
      lastblocks: this.reactivelyFetchData(() =>
        `${this.url}/blocks/${this.lastblocknumber}/10`
      ),
      history: this.reactivelyFetchData(() =>
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
      ),
      totalpayout: this.$watchAsObservable(() => this.payments)
        .pluck('newValue')
        .map(payouts => payouts.reduce((a,c) => a + c.amount, 0))
        .map(amount => amount * this.prices.price_eur)
    }
  },
  computed: {
    addr: function(){
      return this.$route.params.addr || '31o2tiFd3anrB7KWLhNvCFyx9WnxAWkZUr'
    },
    view: function(){
      return this.$route.params.view || 'dashboard'
    },
  },
  methods: {
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
    },
    reactivelyFetchCsv: function (getter) {
      return this
        .$watchAsObservable(getter)
        .pluck('newValue')
        .switchMap(url => Rx.Observable
          .fromPromise(fetch(url).then(r => r.text()))
          .catch((e) => {
            console.log("api fetch error", e)
            return Rx.Observable.of({ status: false })
          })
        )
        .do(d => { console.log(d) })
        // 9  19  242 67
        // wind speed (m/s), outside temperature (C), GPU load (watts), GPU temp (C)
        // .filter(r => r.status)
        // .map(r => r.data)
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
