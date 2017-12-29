<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <amap/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import amap from './components/amap/amap'
export default {
  name: 'app',
  components: {
    HelloWorld,
    amap
  }
}
</script>

<style>
#app {
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
*/}
</style>
