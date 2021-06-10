<template>
  <div class="party">
    <drawer-widget :players="players"/>
    <card-grid :cases="mapObjects"
               :number-of-horizontal-cases="numberOfHorizontalCases"
               :number-of-vertical-cases="numberOfVerticalCases"/>
    <player-grid :players="players"
                 :number-of-horizontal-cases="numberOfHorizontalCases"
                 :number-of-vertical-cases="numberOfVerticalCases"/>
    <action-grid :cases="mapObjects"
                 :current-player="currentPlayer"
                 :players="players"
                 :action-type="actionType"
                 :number-of-horizontal-cases="numberOfHorizontalCases"
                 :number-of-vertical-cases="numberOfVerticalCases"
                 @player-action="handlePlayerAction"/>

    <inventory-bar-widget :inventory="inventory" :selected-item="selectedItem" @select-item="handleSelectPlayerItem"/>

    <button id="debug-button" @click="setDebugModeTo(!debug)">Debug Mode</button>
  </div>
</template>

<script>
import CardGrid from './Card/CardGrid'
import testMap from '@/assets/map.test.json'
import {mapActions, mapGetters} from 'vuex'
import ActionGrid from './ActionGrid/ActionGrid'
import PlayerGrid from './PlayerGrid/PlayerGrid'
import InventoryBarWidget from "./InventoryBar/InventoryBarWidget";
import DrawerWidget from "./Drawer/DrawerWidget";

export default {
  name: 'Party',
  components: {
    CardGrid,
    ActionGrid,
    PlayerGrid,
    InventoryBarWidget,
    DrawerWidget
  },
  data() {
    return {
      mapObjects: testMap,
      players: [
        { username: 'Waen', x: 17, y: 12, movementPoint: 5, isCurrentPlayer: true, playerIcon: 'player_icon_1' },
        { username: 'MrZyro', x: 14, y: 12, movementPoint: 5, isCurrentPlayer: false, playerIcon: 'player_icon_2' },
        { username: 'Supmil', x: 24, y: 1, movementPoint: 5, isCurrentPlayer: false, playerIcon: 'player_icon_3' },
        { username: 'MrLol', x: 4, y: 1, movementPoint: 5, isCurrentPlayer: false, playerIcon: 'player_icon_4' },
      ],
      inventory: [
        { id:"1234", title: "Objet 1", imageURL: "https://i.pinimg.com/236x/8b/99/48/8b9948f230b107327413d56e3d83b744--battle-axe-traffic-light.jpg"},
        { id:"12323", title: "Objet 2", imageURL: "https://i.pinimg.com/236x/8b/99/48/8b9948f230b107327413d56e3d83b744--battle-axe-traffic-light.jpg"},
        { id:"123456cc2", title: "Objet 3", imageURL: "https://i.pinimg.com/236x/8b/99/48/8b9948f230b107327413d56e3d83b744--battle-axe-traffic-light.jpg"}
      ],
      selectedItem: null,
      actionType: ActionGrid.ActionType.MOVE,
      numberOfHorizontalCases: Math.max(...testMap.map(cell => cell.x)) + 1,
      numberOfVerticalCases: Math.max(...testMap.map(cell => cell.y)) + 1,
    }
  },
  methods: {
    ...mapActions(['setDebugModeTo']),
    handlePlayerAction({ newPosition, player, actionType }) {
      switch (actionType) {
        case ActionGrid.ActionType.MOVE:
          this.movePlayer(player, newPosition);
          break;
        case ActionGrid.ActionType.ATTACK:
          console.log('ATTACK !!!')
          break;
      }
    },
    movePlayer(player, position) {
      const players = this.players.map(pl => pl)
      const playerIndex = players.indexOf(player)
      players[playerIndex] = { ...player, x: position.x, y: position.y }

      this.$set(this.$data, 'players', players)
    },
    handleSelectPlayerItem(item) {
      this.selectedItem = item;
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
