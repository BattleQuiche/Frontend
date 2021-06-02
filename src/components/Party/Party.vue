<template>
  <div class="party">
    <card-grid :cases="mapObjects"/>
  </div>
</template>

<script>
import CardGrid from '../../components/Party/CardGrid'
import testMap from '../../assets/map.test.json'

export default {
  name: 'Party',
  components: {
    CardGrid,
  },
  data() {
    return {
      mapObjects: testMap
    }
  }
}
</script>

<style scoped>
  .party {
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: scroll;
    scrollbar-width: none;
  }

  .party::-webkit-scrollbar {
    display: none;
  }
</style>
