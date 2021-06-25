<template>
  <div class="party">
    <drawer-widget :players="party.users"/>
    <map-grid v-if="!!layersManager" :layers-manager="layersManager"/>
    <action-grid v-if="!!layersManager"
                 :players="party.users"
                 :player="player"
                 :action-type="actionType"
                 :layers-manager="layersManager"
                 @player-action="handlePlayerAction"/>

    <inventory-bar-widget :inventory="inventory" :selected-item="selectedItem" @select-item="handleSelectPlayerItem"/>
    <next-round-button></next-round-button>
  </div>
</template>

<script>
import ActionGrid from './ActionGrid/ActionGrid'
import InventoryBarWidget from "./InventoryBar/InventoryBarWidget"
import NextRoundButton from "./NextRoundButton";
import LayersManager from './Map/LayersManager'
import DrawerWidget from "./Drawer/DrawerWidget";
import {mapActions, mapGetters} from "vuex";
import MapGrid from "./Map/MapGrid";

export default {
  name: 'Party',
  components: {
    MapGrid,
    ActionGrid,
    InventoryBarWidget,
    DrawerWidget,
    NextRoundButton
  },
  data() {
    return {
      partyId : this.$route.params.partyId,
      // TODO: Add health to the players data
      layersManager: null,
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
    ...mapActions(['setParty', 'setMovableTiles']),
    handlePlayerAction({ newPosition, actionType }) {
      switch (actionType) {
        case ActionGrid.ActionType.MOVE:
          this.movePlayer(newPosition);
          break;
        case ActionGrid.ActionType.ATTACK:
          console.log('ATTACK !!!')
          break;
      }
    },
    async movePlayer(position) {
      try {
        const URL = `${process.env.VUE_APP_API_BASE_URL}/party/action`
        await this.$http.put(URL, {
          partyId: this.partyId,
          userId: this.user._id,
          actionType: "MOVE",
          date: Date.now(),
          fromX: this.player.x,
          fromY: this.player.y,
          toX: position.x,
          toY: position.y
        })
       } catch (err) {
         console.log(err)
       }
    },
    handleSelectPlayerItem(item) {
      this.selectedItem = item;
    },
    async getMap() {
      const URL = `${process.env.VUE_APP_API_BASE_URL}/party/map`
      const URL_TILES = `${process.env.VUE_APP_API_BASE_URL}/party/movable-tiles`
      try {
        const {data: map} = await this.$http.get(URL)
        const {data: movableTiles} = await this.$http.get(URL_TILES)
        this.layersManager = new LayersManager(map)
        this.setMovableTiles(movableTiles)
      } catch (err) {
        console.log(err);
      }
    },
    async getPartyDetails() {
      const URL = `${process.env.VUE_APP_API_BASE_URL}/party/${this.partyId}/details`
      try {
        const party = await this.$http.get(URL)
        this.setParty(party.data)
      } catch (err) {
        console.log(err);
      }
    }
  },
  computed: {
    ...mapGetters(['party', 'user']),
    player() {
      return this.party.users.find((player) => player.userId === this.user._id)
    }
  },
  mounted() {
    this.getMap()
    this.getPartyDetails()
    setInterval(() => {
      this.getPartyDetails()
    }, 5000);
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
    /*background-color: black;*/
  }

  .party::-webkit-scrollbar {
    display: none;
  }
</style>
