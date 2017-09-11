<template>
  <div class="panel">
    <div v-bind:style="{ width: width + 'px', height: height + 'px' }">
      <h3>{{ title }}</h3>
      <h4>{{ value }} {{ unit }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'panel',
  props: ['value', 'width', 'height', 'title', 'unit'],
  computed: {
    
  }
}
</script>

<style scoped>

  .panel {
    padding: 20px;
    margin: 20px;
    background: #151515;
    display: block;
    float: left;
  }

  h3 {
    text-transform: uppercase;
    font-size: 1.4em;
    color: #696969;
    margin: 0;
    margin-bottom: 10px;
  }
  h4 {
    font-size: 1.3em;
    font-weight: normal;
    color: #585858;
    margin: 0;
    margin-bottom: 10px;
  }

</style>
