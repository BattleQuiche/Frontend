<template>
  <div id="app">
    <Menu/>
    <force-landscape/>
  </div>
</template>

<script>
import ForceLandscape from './components/ForceLandscape'
import Menu from './components/Menu/Menu'

export default {
  name: 'App',
  components: {
    Menu,
    ForceLandscape
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
