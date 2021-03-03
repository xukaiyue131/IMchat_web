<template>
  <div id="app">
    <router-view/>
   <vue-canvas-nest  :config="{color:'#ccc', count:70,opacity:'0.8'}"></vue-canvas-nest>
  </div>
</template>

<script>
import vueCanvasNest from 'vue-canvas-nest'

export default {
  components: { vueCanvasNest },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
