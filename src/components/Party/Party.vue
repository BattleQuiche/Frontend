<template>
  <div class="party">
    <card-grid :cases="mapObjects"/>
    <move-grid :cases="mapObjects" :current-player="currentPlayer" @move-player="handleMovePlayer"/>

    <button id="debug-button" @click="setDebugModeTo(!debug)">Debug Mode</button>
  </div>
</template>

<script>
import CardGrid from './Card/CardGrid'
import testMap from '@/assets/map.test.json'
import {mapActions, mapGetters} from 'vuex'
import MoveGrid from './MoveGrid/MoveGrid'

export default {
  name: 'Party',
  components: {
    CardGrid,
    MoveGrid,
  },
  data() {
    return {
      mapObjects: testMap,
      players: [
        { username: 'Waen', x: 17, y: 12, movementPoint: 5, isCurrentPlayer: true },
        { username: 'MrZyro', x: 0, y: 11, movementPoint: 5, isCurrentPlayer: false },
        { username: 'Supmil', x: 24, y: 1, movementPoint: 5, isCurrentPlayer: false },
        { username: 'MrLol', x: 4, y: 1, movementPoint: 5, isCurrentPlayer: false },
      ]
    }
  },
  methods: {
    ...mapActions(['setDebugModeTo']),
    handleMovePlayer({ newPosition, player }) {
      const players = this.players.map(pl => pl)
      const playerIndex = players.indexOf(player)
      players[playerIndex] = { ...player, x: newPosition.x, y: newPosition.y }

      this.$set(this.$data, 'players', players)
    }
  },
  computed: {
    ...mapGetters(['debug']),
    currentPlayer() {
      return this.players.find(player => player.isCurrentPlayer)
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
    background-color: black;
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
