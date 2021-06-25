<template>
  <div id="app">
      <router-view/>
    <force-landscape />
  </div>
</template>

<script>
import ForceLandscape from './components/ForceLandscape'
import TileSets from './components/Party/Map/TileSets'

export default {
  name: 'App',
  components: {
    ForceLandscape
  },
  mounted () {
    TileSets.setTileSets()
  }
}
</script>

<style>
  body {
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  .wrapper {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
</style>
