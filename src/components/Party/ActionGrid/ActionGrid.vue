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
import LayersManager from '../Card/LayersManager'

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
      movableCase: [1, 2, 3, 4, 7, 8, 9, 36, 48, 201, 202, 203, 204, 205, 206, 207, 230, 266, 290, 291, 292, 293, 300, 301, 302, 303]
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
    // eslint-disable-next-line no-unused-vars
    getCaseType(x, y) {
      const currentCase = this.layersManager.findObjectForCase(x, y)

      if (currentCase.every((item) => this.movableCase.includes(item))) {
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
