<template>
  <grid v-if="gridIsShown" class="action-grid" :z-index="10"
        :number-of-horizontal-cases="layersManager.numberOfHorizontalCases"
        :number-of-vertical-cases="layersManager.numberOfVerticalCases">
    <template v-slot:default="{ x, y }">
      <action-case :key="`mode_${x}_${y}`" :caseData="getCaseType(x, y)" :x="x" :y="y" @player-action="handlePlayerAction"/>
    </template>
  </grid>
</template>

<script>
import Grid from '../../../reusables/Grid'
import ActionCase from './ActionCase'
import LayersManager from '../Map/LayersManager'

class ActionType {
  static MOVE = 'MOVE';
  static ATTACK = 'ATTACK';
  static NO_ACTION = 'NO_ACTION'
}

export default {
  name: 'ActionGrid',
  ActionType,
  data() {
    return {
      movableCase: [1, 2, 3, 4, 7, 8, 9, 36, 40, 48, 49, 50, 59, 201, 202, 203, 204, 205, 206, 207, 211, 212, 213, 214, 215, 221, 222, 223, 224, 225, 231, 232, 234, 235, 242, 243, 244, 250, 251, 252, 253, 254, 255, 267, 259, 291, 292, 293, 294, 301, 302, 303, 304, 314, 324]
    }
  },
  components: {
    Grid,
    ActionCase,
  },
  props: {
    players: {type: Array, required: true },
    currentPlayer: {type: Object, required: true },
    actionType: {type: String, required: true },
    layersManager: { type: LayersManager, required: true },
  },
  methods: {
    getCaseType(x, y) {
      const playerWithSameCoords = this.players.find((player) => (player.x === x && player.y === y))
      const currentCase = this.layersManager.findObjectForCase(x, y)

      if (currentCase.every((item) => this.movableCase.includes(item)) && !playerWithSameCoords) {
        return ActionCase.Type.MOVE
      }

      return ActionCase.Type.EMPTY
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
