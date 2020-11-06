/* eslint-disable */
<template>
  <div class="menuBar">
    <radial-menu
    style="margin: auto; margin-top: 40%; background-color: white"
    :itemSize="50"
    :radius="150"
    :angle-restriction="180">
      <radial-menu-item
      v-for="(item, index) in items"
      :key="index"
      style="background-color: white"
      @click="() => handleClick(item)">
        <span>{{item}}</span>
      </radial-menu-item>
    </radial-menu>
  </div>
</template>

<script>
  import {RadialMenu , RadialMenuItem} from 'vue-radial-menu'

  export default {
    name: 'menuBar',

    props: {
      msg: String
    },
    data() {
      return {
	    items:['Working Times' , 'Working Time' , 'Clock Manager' , 'Chart Manager'],
	  }
    },
    components: {
	  RadialMenu,
	  RadialMenuItem
    },
    methods: {
	  handleClick(item) {
	  }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
