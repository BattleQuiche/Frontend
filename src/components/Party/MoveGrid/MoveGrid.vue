<template>
  <grid class="move-grid" :number-of-horizontal-cases="30" :number-of-vertical-cases="18" :z-index="4">
    <template v-slot:default="{ x, y }">
      <move-case :key="'move_' + x + y" :caseData="getCaseType(x, y)" :x="x" :y="y" @move-player="handleMovePlayer"/>
    </template>
  </grid>
</template>

<script>
import Grid from '../../../reusables/Grid'
import MoveCase from './MoveCase'

export default {
  name: 'MoveGrid',
  components: {
    Grid,
    MoveCase,
  },
  props: {
    cases: {
      type: Array,
      required: true
    },
    players: {
      type: Array,
      required: true
    },
    currentPlayer: {
      type: Object,
      required: true
    },
  },
  methods: {
    getCaseType(x, y) {
      const mapCase = this.cases.find(gridCase => (gridCase.x === x && gridCase.y === y))
      const playerWithSameCoords = this.players.find(player => player.x === x && player.y === y)

      if (!['grass', 'wood'].includes(mapCase.type) ||
          !!playerWithSameCoords ||
          this.currentPlayer.x === x && this.currentPlayer.y === y) {
        return MoveCase.Type.EMPTY
      }

      const distance = this.getCasesDistance({ xA: x, yA: y }, { xB: this.currentPlayer.x, yB: this.currentPlayer.y })

      return (distance <= this.currentPlayer.movementPoint) ? MoveCase.Type.MOVE : MoveCase.Type.EMPTY
    },
    getCasesDistance({ xA, yA }, { xB, yB }) {
      const xDistance = Math.abs(xA - xB);
      const yDistance = Math.abs(yA - yB);

      return (xDistance + yDistance)
    },
    handleMovePlayer({ x, y }) {
      this.$emit('move-player', { newPosition: { x, y }, player: this.currentPlayer })
    }
  },
}
</script>

<style scoped>

</style>
