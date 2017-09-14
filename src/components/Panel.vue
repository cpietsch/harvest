<template>
  <div class="panel">
    <div>
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
    margin: 10px;
    background: rgba(111, 111, 111, 0.19);
    display: block;
    float: left;
    width: 570px;
  }

  h3 {
    text-transform: uppercase;
    font-size: 1.2em;
    color: #696969;
    margin: 0;
    float: left;
  }
  h4 {
    padding-left: 1em;
    font-size: 1.2em;
    font-weight: 600;
    color: #ececec;
    margin: 0;
    float: right;
  }

</style>
