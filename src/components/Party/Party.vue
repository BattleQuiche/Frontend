<template>
  <div class="party">
<!--    <card-grid :layers-manager="layersManager"/>
    <player-grid :players="players"
                 :layers-manager="layersManager"/>
    <action-grid :current-player="currentPlayer"
                 :players="players"
                 :action-type="actionType"
                 :layers-manager="layersManager"
                 @player-action="handlePlayerAction"/>-->

    <inventory-bar-widget :inventory="inventory" :selected-item="selectedItem" @select-item="handleSelectPlayerItem"/>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import CardGrid from './Card/CardGrid'
import ActionGrid from './ActionGrid/ActionGrid'
import PlayerGrid from './PlayerGrid/PlayerGrid'
import InventoryBarWidget from "./InventoryBar/InventoryBarWidget"
import LayersManager from './Card/LayersManager'
import {mapGetters} from "vuex";

export default {
  name: 'Party',
  components: {
    CardGrid,
    ActionGrid,
    PlayerGrid,
    InventoryBarWidget,
  },
  data() {
    return {
      layersManager: null,
      players: [],
      partyId : String(this.$route.params.partyId),
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
    movePlayer(player, position) {
      const players = this.players.map(pl => pl)
      const playerIndex = players.indexOf(player)
      players[playerIndex] = { ...player, x: position.x, y: position.y }

      this.$set(this.$data, 'players', players)
    },
    handleSelectPlayerItem(item) {
      this.selectedItem = item;
    },
    async getMap() {
      const URL = 'https://wars.quiches.ovh/api/party/map'
      try {
        const {data: map} = await this.$http.get(URL)
        this.layersManager = new LayersManager(map)
      } catch (err) {
        console.log(err);
      }
    },
    async getPlayers() {
      const URL = `https://wars.quiches.ovh/api/party/${this.partyId}/players`
      try {
        this.players = (await this.$http.get(URL)).data
          .map(player => ({...player, isCurrentPlayer: (player._id === this.user._id) }))
      } catch (err) {
        console.log(err);
      }
    }
  },
  computed: {
    ...mapGetters(['party', 'user']),
  },
  mounted() {
    this.getMap()
    this.getPlayers()
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
