<template>
  <div id="app">
      <router-view/>
    <force-landscape />
  </div>
</template>

<script>
import ForceLandscape from './components/ForceLandscape'

export default {
  name: 'App',
  components: {
    ForceLandscape
  }
}
</script>
