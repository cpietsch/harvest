<template>
  <div class="table">
    <div>
      <h3>{{ title }}</h3>
      <ul>
        <li>
          <span class="title">date</span><span class="value">{{ parseDate(block.date) }}</span>
        </li>
        <li>
          <span class="title">number</span><span class="value">{{ block.number }}</span>
        </li>
        <li>
          <span class="title">hash</span><span class="value">{{ block.hash }}</span>
        </li>
        <li>
          <span class="title">difficulty</span><span class="value">{{ block.difficulty }}</span>
        </li>
        <li>
          <span class="title">miner</span><span class="value">{{ block.miner }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: ['title','data'],
  computed: {
    block: function(){
      // this.data.sort((a,b)=> b.number - b.number)
      // console.log(this.data)
      return this.data[this.data.length-1]
    }
  },
  methods: {
    parseDate: function(date){
      return new Date(date*1000)
    }
  }
}
</script>

<style scoped>

  .table {
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
  }
  ul {
    font-size: 1.2em;
    margin: 0;
    list-style: none;
    padding: 0;
    word-break: break-all;
    padding-top: 10px;
  }
  li {
    clear: both;
  }
  .title {
    text-transform: uppercase;
    padding-right: 1em;
    color: #696969;
    float: left;
    /*font-weight: bold;*/
  }
  .value {
    float: right;
    /*font-weight: 600;*/
    color: #ececec;
    width: 400px;
    /*text-align: right;*/
  }

</style>
