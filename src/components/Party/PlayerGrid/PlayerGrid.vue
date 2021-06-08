<template>
  <grid :number-of-horizontal-cases="numberOfHorizontalCases"
        :number-of-vertical-cases="numberOfVerticalCases"
        :z-index="4" class="player-grid" >
    <template v-slot:default="{ x, y }">
      <player-case :case-data="getPlayerIcon(x, y)"/>
    </template>
  </grid>
</template>

<script>
import Grid from '../../../reusables/Grid'
import PlayerCase from './PlayerCase'

export default {
  name: 'PlayerGrid',
  components: {
    Grid,
    PlayerCase,
  },
  props: {
    players: { type: Array, required: true },
    numberOfHorizontalCases: { type: Number, require: true },
    numberOfVerticalCases: { type: Number, require: true },
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
