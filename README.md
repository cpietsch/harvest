# Harvest

> This is the [endpoint](https://cpietsch.github.io/harvest/#/) of the realtime visualization for Julian Olivers [HARVEST](https://julianoliver.com/output/harvest) installation. Using ZEC (zash) nanopool.org and cryptocompare.com API. 

### View #1

> https://cpietsch.github.io/harvest/#/vis/t1YR6ihrgmWWGp4kDjyeXRpbUgEUzmFDSVC/graph

### View #2

> https://cpietsch.github.io/harvest/#/vis/t1YR6ihrgmWWGp4kDjyeXRpbUgEUzmFDSVC/dashboard

## Contribute

This little project is also a test bench for vuejs, rxjs and d3 integration. You will see that I used rxjs subscriptions for async api calls like [here](https://github.com/cpietsch/harvest/blob/master/src/components/Graph.vue#L37) but also traditional methods mutating the state [here](https://github.com/cpietsch/harvest/blob/master/src/components/Dashboard.vue#L228). After this rxjs experiment I feel like the standart methods (with e.g. vuex) is way more flexible, though the reactive fetching is quite elegant. Feel free to ping me on that topic! The d3js+vuejs integration works smoothly like in animated [transitions](https://github.com/cpietsch/harvest/blob/master/src/components/Gauge.vue) and in the [axis components](https://github.com/cpietsch/harvest/blob/master/src/components/Axisbottom.js).

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
