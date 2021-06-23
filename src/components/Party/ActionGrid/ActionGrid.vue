<template>
  <div class="grid action-grid" :style="10">
    <div class="grid__row" v-for="y in layersManager.verticalCases" :key="y">
      <span class="grid__case" v-for="x in layersManager.horizontalCases" :key="x">
        <action-case v-if="getCaseType(x, y) !== 'PLAYER_ICON'" :key="`mode_${x}_${y}`" :caseData="getCaseType(x, y)" :x="x" :y="y" @player-action="handlePlayerAction"/>
        <img v-else class="grid__case_content" :src="`/players/${getPlayerWithSameCoords(x, y).icon}.png`" :alt="`${getPlayerWithSameCoords(x, y).icon}.png`">
      </span>
    </div>
  </div>
</template>

<script>
import ActionCase from './ActionCase'
import LayersManager from '../Map/LayersManager'
import {mapGetters} from 'vuex'

class ActionType {
  static MOVE = 'MOVE';
  static ATTACK = 'ATTACK';
  static NO_ACTION = 'NO_ACTION'
}

export default {
  name: 'ActionGrid',
  ActionType,
  components: {
    ActionCase,
  },
  props: {
    players: {type: Array, required: true },
    actionType: {type: String, required: true },
    layersManager: { type: LayersManager, required: true },
  },
  methods: {
    getPlayerWithSameCoords(x, y) {
      return this.players.find((player) => (player.x === x && player.y === y))
    },
    getCaseType(x, y) {
      const playerWithSameCoords = this.getPlayerWithSameCoords(x, y)
      const currentCase = this.layersManager.findObjectForCase(x, y)

      // eslint-disable-next-line no-extra-boolean-cast
      if (!!playerWithSameCoords) {
        console.log(playerWithSameCoords, x, y)
        return ActionCase.Type.PLAYER_ICON
      }

      if (currentCase.every((item) => this.movableTiles.includes(item))) {
        return ActionCase.Type.MOVE
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
      this.$emit('player-action', { newPosition: { x, y }, actionType: this.actionType })
    },
  },
  computed: {
    ...mapGetters(['movableTiles', 'user']),
    currentPlayer() {
      return this.players.find((player) => player.userId === this.user._id)
    }
  },
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

.grid__case_content img {
  max-width: 100%;
  max-height: 100%;
}
</style>
