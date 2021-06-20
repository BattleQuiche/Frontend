<template>
  <grid :number-of-horizontal-cases="layersManager.numberOfHorizontalCases"
        :number-of-vertical-cases="layersManager.numberOfVerticalCases"
        :z-index="4" class="player-grid" >
    <template v-slot:default="{ x, y }">
      <player-case :key="`player_case_${x}_${y}`" :case-data="getPlayerIcon(x, y)"/>
    </template>
  </grid>
</template>

<script>
import Grid from '../../../reusables/Grid'
import PlayerCase from './PlayerCase'
import LayersManager from '../Map/LayersManager'

export default {
  name: 'PlayerGrid',
  components: {
    Grid,
    PlayerCase,
  },
  props: {
    players: { type: Array, required: true },
    layersManager: { type: LayersManager, required: true },
  },
  methods: {
    getPlayerIcon(x, y) {
      const player = this.players.find((player) => (player.x === x && player.y === y))

      if (!player) {
        return null
      }

      return player.playerIcon
    }
  }
}
</script>
