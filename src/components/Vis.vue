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
        width="200"
        height="200"
        unit="km/s"
        :value="14"
      />
      <panel
        v-if="user"
        title="account"
        width="200"
        unit=""
        :value="user.account"
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
        v-if="lastblocknumber"
        title="last block number"
        width="200"
        unit=""
        :value="lastblocknumber"
      />
      <panel
        v-if="avgblocktime"
        title="avg blocktime"
        width="200"
        unit="sec"
        :value="avgblocktime"
      />
      <panel
        v-if="prices"
        title="zec Price"
        width="200"
        unit="btc"
        :value="prices.price_btc"
      />
      <panel
        v-if="prices"
        title="zec Price"
        width="200"
        unit="€"
        :value="prices.price_eur"
      />
      <panel
        v-if="prices"
        title="zec Price"
        width="200"
        unit="$"
        :value="prices.price_usd"
      />
      <panel
        v-if="payments"
        title="payouts"
        width="200"
        unit=""
        :value="payments.length"
      />
      <panel
        v-if="totalpayout"
        title="total mined"
        width="200"
        unit="zec"
        :value="totalpayout"
      />
      <panel
        v-if="totalpayout"
        title="total mined"
        width="200"
        unit="$"
        :value="totalpayout"
      />
    </div>
  </div>
</template>

<script>
import { json } from 'd3'
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
      return this.$route.params.addr || 't1brhGiJhFEj2vnxN8gSrxLdokjgJLzSpsU'
    },
    view: function(){
      return this.$route.params.view || 'graph'
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
