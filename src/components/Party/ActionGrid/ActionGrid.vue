<template>
  <div :style="style" class="grid action-grid">
    <span
      v-for="player in players"
      :key="player._id"
      :style="{ gridColumnStart: player.x + 1, gridRowStart: player.y + 1 }"
      class="grid__case player-icon"
    >
      <img
        :alt="`${player.icon}.png`"
        :src="`/players/${player.icon}.png`"
        class="grid__case_content"
      />
    </span>

    <span
      v-for="aroundCase in movableCases"
      :key="JSON.stringify(aroundCase)"
      :style="{
        gridColumnStart: aroundCase.x + 1,
        gridRowStart: aroundCase.y + 1,
      }"
      class="grid__case_content movable"
      @click="handlePlayerAction(aroundCase)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LayersManager from '../Map/LayersManager';

class ActionType {
  static MOVE = 'MOVE';

  static ATTACK = 'ATTACK';

  static NO_ACTION = 'NO_ACTION';
}

export default {
  name: 'ActionGrid',
  ActionType,
  data() {
    return {
      style: {
        width: `${this.layersManager.numberOfHorizontalCases * 16}px`,
        height: `${this.layersManager.numberOfVerticalCases * 16}px`,
        gridTemplateColumns: `repeat(${this.layersManager.numberOfHorizontalCases}, 16px)`,
        gridTemplateRows: `repeat(${this.layersManager.numberOfVerticalCases}, 16px)`,
      },
    };
  },
  props: {
    players: { type: Array, required: true },
    actionType: { type: String, required: true },
    layersManager: { type: LayersManager, required: true },
    player: { type: Object, required: true },
  },
  methods: {
    getPlayerWithSameCoords(x, y) {
      return this.players.find((player) => player.x === x && player.y === y);
    },
    canMoveOn({ x, y }) {
      const playerWithSameCoords = this.getPlayerWithSameCoords(x, y);
      const currentCase = this.layersManager.findObjectForCase(x, y);

      return (
        !playerWithSameCoords // there isn't player on this coords
        && currentCase.every((item) => this.movableTiles.includes(item))
      ); // All tiles on position are movables
    },
    canAttackOn({ x, y }) {
      const playerWithSameCoords = this.getPlayerWithSameCoords(x, y);
      if (playerWithSameCoords) {
        this.targetUserId = playerWithSameCoords.userId;
      }
      return (
        playerWithSameCoords
        // && this.player.userId !== this.targetUserId
        // Player can attack himself without this line
        // there is player on these coords & it's not yourself
      ); // All tiles on position are movables
    },
    getCasesDistance({ xA, yA }, { xB, yB }) {
      const xDistance = Math.abs(xA - xB);
      const yDistance = Math.abs(yA - yB);

      return xDistance + yDistance;
    },
    handlePlayerAction({ x, y }) {
      this.$emit('player-action', {
        newPosition: { x, y },
        actionType: this.actionType,
      });
    },
  },
  computed: {
    ...mapGetters(['movableTiles']),
    movableCases() {
      if (!this.player) {
        return;
      }

      const movementPoints = 6;
      const minX = 0;
      const maxX = this.layersManager.numberOfHorizontalCases - 1;
      const minY = 0;
      const maxY = this.layersManager.numberOfVerticalCases - 1;
      const finalCases = [];
      let lastCases = [{ x: this.player.x, y: this.player.y }];

      while (lastCases.length > 0) {
        const saveLastCases = Array.from(lastCases);

        lastCases = [];

        /* eslint-disable no-loop-func */
        saveLastCases.forEach((mapCase) => {
          const aroundCases = [
            { x: mapCase.x, y: mapCase.y - 1 },
            { x: mapCase.x + 1, y: mapCase.y },
            { x: mapCase.x, y: mapCase.y + 1 },
            { x: mapCase.x - 1, y: mapCase.y },
          ]
            .filter(
              (aroundCase) => !(
                aroundCase.x < minX
                  || aroundCase.x > maxX
                  || aroundCase.x < minY
                  || aroundCase.y > maxY
              ),
            ) // filter boxes outside the map
            .filter(
              (aroundCase) => this.getCasesDistance(
                {
                  xA: this.player.x,
                  yA: this.player.y,
                },
                {
                  xB: aroundCase.x,
                  yB: aroundCase.y,
                },
              ) <= movementPoints,
            ) // filter cases that are too far from the player
            .filter((aroundCase) => this.canMoveOn(aroundCase)); // filter movable cases

          aroundCases.forEach((aroundCase) => {
            if (
              !finalCases.find(
                (item) => item.x === aroundCase.x && item.y === aroundCase.y,
              )
            ) {
              finalCases.push(aroundCase);
              lastCases.push(aroundCase);
            }
          });
        });
      }

      /* eslint-disable consistent-return */
      return finalCases;
    },
  },
};
</script>

<style>
.grid {
  position: absolute;
  top: 0;
  left: 0;
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

.player-icon img {
  max-width: none;
  max-height: none;
  height: 32px;
  width: 16px;
  transform: translateY(-50%);
  pointer-events: none;
}
</style>

<style scoped>
.grid {
  display: grid;
}

.movable {
  background-color: rgba(0, 0, 0, 0.3);
}

.movable:hover {
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
</style>
