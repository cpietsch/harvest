<template>
  <div class="main">
    <div class="intro">
      <h1>HARVEST PROJECTION ENDPOINT</h1>
      <p>
        This is the endpoint of the realtime projection for Julian Olivers <a href="https://julianoliver.com/output/harvest" target="_blank">HARVEST</a> installation.
      </p>
      <p>
        There are 2 views: <a href="#/vis/t1YR6ihrgmWWGp4kDjyeXRpbUgEUzmFDSVC/graph">hashrate history</a> & <a href="#/vis/t1YR6ihrgmWWGp4kDjyeXRpbUgEUzmFDSVC/dashboard">dashboard</a> both are optimized for full hd. To display your own miner just change the ZEC address in the url to yours. You can find the source code on <a href="https://github.com/cpietsch/harvest" target="_blank">GitHub</a>.
      </p>
      <p>
        APIs used: <a href="https://zec.nanopool.org/api" target="_blank">Nanopool</a>, <a href="https://min-api.cryptocompare.com" target="_blank">Cryptocompare</a>
      </p>
      <p>
        Created by <a href="https://chrispie.com" target="_blank">Christopher Pietsch</a> 2017
      </p>

    </div>
    <div>
      <dashboard pollingTime="30000" polling="true" addr="t1YR6ihrgmWWGp4kDjyeXRpbUgEUzmFDSVC" class="scaledDashboard" />
      <graph pollingTime="30000" polling="true" addr="t1YR6ihrgmWWGp4kDjyeXRpbUgEUzmFDSVC" class="scaledGraph" />
    </div>
  </div>
</template>

<script>
import Graph from '@/components/Graph'
import Dashboard from '@/components/Dashboard'

export default {
  name: 'about',
  components: { Graph, Dashboard }
}
</script>

<style scoped>
body {
  overflow: scroll !important;
}
.main {
  width: 960px;
  padding-left: 10px;
}
a {
  color: #c1c1c1;
}
.intro {
  padding-left: 9px;
  padding-bottom: 30px;
}
p {
  color: #9c9c9c;
  font-weight: 600;
  margin-bottom: 6px;
  margin-top: 6px;
  width: 600px;
}
.scaledDashboard {
  transform: scale(0.8);
  transform-origin: 0 0;
  float: left;
  height: 790px;
  width: 1200px;
}
.scaledGraph {
  transform: scale(0.502);
  transform-origin: 0 0;
  float: left;
  height: 790px;
  width: 1200px;
  left:-6px;
  position: relative;
  top:60px;
}
</style>
