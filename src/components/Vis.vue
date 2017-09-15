<template>
  <div>
    <dashboard
      v-if="$route.params.view === 'dashboard'"
      pollingTime="30000"
      polling="true"
      :addr="$route.params.addr"
    />
    <graph
      v-if="$route.params.view === 'graph'"
      pollingTime="30000"
      polling="true"
      :addr="$route.params.addr"
    />
  </div>
</template>

<script>
import Graph from '@/components/Graph'
import Dashboard from '@/components/Dashboard'

export default {
  name: 'vis',
  components: { Graph, Dashboard }
}
</script>

<style scoped>

</style>
