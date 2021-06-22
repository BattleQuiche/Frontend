<template>
  <div class="grid action-grid" :style="10">
    <div class="grid__row" v-for="y in layersManager.verticalCases" :key="y">
      <span class="grid__case" v-for="x in layersManager.horizontalCases" :key="x">
        <action-case :key="`mode_${x}_${y}`" :caseData="getCaseType(x, y)" :x="x" :y="y" @player-action="handlePlayerAction"/>
      </span>
    </div>
  </div>
</template>

<script>
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

<style>
.grid {
  position: absolute;
  top: 0;
  left: 0;
}

.grid__row {
  display: flex;
}

.grid__case {
  display: block;
  height: 16px;
  width: 16px;
  /*margin: 1px;*/
}

.grid__case_content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.grid__case_content span {
  display: block;
  height: 100%;
  width: 100%;
}
</style>
