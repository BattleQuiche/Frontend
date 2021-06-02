<template>
  <div class="party">
    <card-grid :cases="mapObjects"/>

    <button id="debug-button" @click="setDebugModeTo(!debug)">Debug Mode</button>
  </div>
</template>

<script>
import CardGrid from '../../components/Party/CardGrid'
import testMap from '@/assets/map.test.json'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Party',
  components: {
    CardGrid,
  },
  data() {
    return {
      mapObjects: testMap
    }
  },
  methods: {
    ...mapActions(['setDebugModeTo'])
  },
  computed: {
    ...mapGetters(['debug']),
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

  #debug-button {
    position: fixed;
    z-index: 998;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
