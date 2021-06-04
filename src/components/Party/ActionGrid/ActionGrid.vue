<template>
  <grid v-if="gridIsShown" class="move-grid" :z-index="4"
        :number-of-horizontal-cases="numberOfHorizontalCases"
        :number-of-vertical-cases="numberOfVerticalCases">
    <template v-slot:default="{ x, y }">
      <action-case :key="'move_' + x + y" :caseData="getCaseType(x, y)" :x="x" :y="y" @player-action="handlePlayerAction"/>
    </template>
  </grid>
</template>

<script>
import Grid from '../../../reusables/Grid'
import ActionCase from './ActionCase'

class ActionType {
  static MOVE = 'MOVE';
  static ATTACK = 'ATTACK';
  static NO_ACTION = 'NO_ACTION'
}

export default {
  name: 'ActionGrid',
  ActionType,
  components: {
    Grid,
    ActionCase,
  },
  props: {
    cases: {type: Array, required: true },
    players: {type: Array, required: true },
    currentPlayer: {type: Object, required: true },
    actionType: {type: String, required: true },
    numberOfHorizontalCases: { type: Number, require: true },
    numberOfVerticalCases: { type: Number, require: true },
  },
  methods: {
    getCaseType(x, y) {
      const mapCase = this.cases.find(gridCase => (gridCase.x === x && gridCase.y === y))
      const playerWithSameCoords = this.players.find(player => player.x === x && player.y === y)

      if (!['grass', 'wood'].includes(mapCase.type) ||
          !!playerWithSameCoords ||
          this.currentPlayer.x === x && this.currentPlayer.y === y) {
        return ActionCase.Type.EMPTY
      }

      const distance = this.getCasesDistance({ xA: x, yA: y }, { xB: this.currentPlayer.x, yB: this.currentPlayer.y })

      return (distance <= this.currentPlayer.movementPoint) ? ActionCase.Type.MOVE : ActionCase.Type.EMPTY
    },
    getCasesDistance({ xA, yA }, { xB, yB }) {
      const xDistance = Math.abs(xA - xB);
      const yDistance = Math.abs(yA - yB);

      return (xDistance + yDistance)
    },
    handlePlayerAction({ x, y }) {
      this.$emit('player-action', { newPosition: { x, y }, player: this.currentPlayer, actionType: this.actionType })
    }
  },
  computed: {
    gridIsShown() {
      return this.actionType !== ActionType.NO_ACTION
    }
  }
}
</script>

<style scoped>

</style>
