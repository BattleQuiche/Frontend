<template>
  <div class="party">
    <drawer-widget :players="players"/>
    <card-grid :layers-manager="layersManager"/>

    <player-grid :players="players"
                 :layers-manager="layersManager"/>
    <action-grid :current-player="currentPlayer"
                 :players="players"
                 :action-type="actionType"
                 :layers-manager="layersManager"
                 @player-action="handlePlayerAction"/>

    <inventory-bar-widget :inventory="inventory" :selected-item="selectedItem" @select-item="handleSelectPlayerItem"/>
  </div>
</template>

<script>
import CardGrid from './Card/CardGrid'
import map from '@/assets/map-battle-quiches.json'
import ActionGrid from './ActionGrid/ActionGrid'
import PlayerGrid from './PlayerGrid/PlayerGrid'
import InventoryBarWidget from "./InventoryBar/InventoryBarWidget"
import LayersManager from './Card/LayersManager'
import DrawerWidget from "./Drawer/DrawerWidget";
import {mapGetters} from "vuex";

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
      partyId : String(this.$route.params.partyId),
      layersManager: new LayersManager(map),
      // TODO: Add health to the players data
      players: [
        { username: 'Waen', x: 17, y: 12, movementPoint: 0, isCurrentPlayer: true, playerIcon: 'player_icon_1' },
        { username: 'MrZyro', x: 14, y: 12, movementPoint: 3, isCurrentPlayer: false, playerIcon: 'player_icon_2' },
        { username: 'Supmil', x: 24, y: 1, movementPoint: 5, isCurrentPlayer: false, playerIcon: 'player_icon_3' },
        { username: 'MrLol', x: 4, y: 1, movementPoint: 2, isCurrentPlayer: false, playerIcon: 'player_icon_4' },
      ],
      inventory: [
        { id:"1234", title: "Objet 1", imageURL: "https://i.pinimg.com/236x/8b/99/48/8b9948f230b107327413d56e3d83b744--battle-axe-traffic-light.jpg"},
        { id:"12323", title: "Objet 2", imageURL: "https://i.pinimg.com/236x/8b/99/48/8b9948f230b107327413d56e3d83b744--battle-axe-traffic-light.jpg"},
        { id:"123456cc2", title: "Objet 3", imageURL: "https://i.pinimg.com/236x/8b/99/48/8b9948f230b107327413d56e3d83b744--battle-axe-traffic-light.jpg"}
      ],
      selectedItem: null,
      actionType: ActionGrid.ActionType.MOVE,
    }
  },
  methods: {
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
    async movePlayer(player, position) {
      try {
        const URL = 'https://wars.quiches.ovh/api/party/action'
        // const players = this.players.map(pl => pl)
        // const playerIndex = players.indexOf(player)
        const result = await this.$http.put(URL, 
        {
          "partyId": this.partyId,
          "userId": this.user._id,
          "actionType": "MOVE",
          "date": Date.now(),
          "fromX": 0,
          "fromY": 0,
          "toX": position.x,
          "toY": position.y
        }
        )
        this.setUser(result.data)
       } catch (err) {
         console.log(err)
       }
      // const players = this.players.map(pl => pl)
      // const playerIndex = players.indexOf(player)
      // players[playerIndex] = { ...player, x: position.x, y: position.y }

      // this.$set(this.$data, 'players', players)
    },
    handleSelectPlayerItem(item) {
      this.selectedItem = item;
    }
  },
  computed: {
    ...mapGetters(['user']),
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
</style>
