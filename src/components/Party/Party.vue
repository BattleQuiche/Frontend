<template>
  <div class="party">
    <stat-drawer-widget :players="party.users" />
    <activity-drawer-widget
      :actions="actions"
      :players="party.users"
    />
    <map-grid v-if="!!layersManager" :layers-manager="layersManager" />
    <action-grid
      v-if="!!layersManager"
      :action-type="actionType"
      :layers-manager="layersManager"
      :player="player"
      :players="party.users"
      @player-action="handlePlayerAction"
    />

    <inventory-bar-widget
      :inventory="inventory"
      :selected-item="selectedItem"
      @select-item="handleSelectPlayerItem"
    />
    <next-round-button></next-round-button>

    <audio autoplay loop src="/background.mp3" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ActionGrid from './ActionGrid/ActionGrid.vue';
import InventoryBarWidget from './InventoryBar/InventoryBarWidget.vue';
import NextRoundButton from './NextRoundButton.vue';
import LayersManager from './Map/LayersManager';
import ActivityDrawerWidget from './Drawer/ActivityDrawerWidget.vue';
import StatDrawerWidget from './Drawer/StatDrawerWidget.vue';
import MapGrid from './Map/MapGrid.vue';

export default {
  name: 'Party',
  components: {
    MapGrid,
    ActionGrid,
    InventoryBarWidget,
    StatDrawerWidget,
    ActivityDrawerWidget,
    NextRoundButton,
  },
  data() {
    return {
      partyId: this.$route.params.partyId,
      // TODO: Add health to the players data
      layersManager: null,
      inventory: [
        {
          id: '1234',
          title: 'Objet 1',
          imageURL:
            'https://i.pinimg.com/236x/8b/99/48/8b9948f230b107327413d56e3d83b744--battle-axe-traffic-light.jpg',
        },
        {
          id: '12323',
          title: 'Objet 2',
          imageURL:
            'https://i.pinimg.com/236x/8b/99/48/8b9948f230b107327413d56e3d83b744--battle-axe-traffic-light.jpg',
        },
        {
          id: '123456cc2',
          title: 'Objet 3',
          imageURL:
            'https://i.pinimg.com/236x/8b/99/48/8b9948f230b107327413d56e3d83b744--battle-axe-traffic-light.jpg',
        },
      ],
      selectedItem: null,
      actionType: ActionGrid.ActionType.MOVE,
      audioElement: document.querySelector('audio'),
    };
  },
  methods: {
    ...mapActions(['setParty', 'setMovableTiles', 'setActions']),
    handlePlayerAction({ newPosition, actionType, targetUserId = null }) {
      switch (actionType) {
        case ActionGrid.ActionType.MOVE:
          this.movePlayer(newPosition);
          break;
        case ActionGrid.ActionType.ATTACK:
          this.attackPlayer(targetUserId);
          break;

        default:
          console.warn('unhadle player action');
      }
      this.getPartyActions();
    },
    async movePlayer(position) {
      try {
        const URL = `${process.env.VUE_APP_API_BASE_URL}/party/action`;
        await this.$http.put(URL, {
          partyId: this.partyId,
          userId: this.user._id,
          actionType: 'MOVE',
          date: Date.now(),
          fromX: this.player.x,
          fromY: this.player.y,
          toX: position.x,
          toY: position.y,
        });
      } catch (err) {
        console.log(err);
      }
    },
    async attackPlayer(userId) {
      try {
        const URL = `${process.env.VUE_APP_API_BASE_URL}/party/action`;
        await this.$http.put(URL, {
          partyId: this.partyId,
          userId: this.user._id,
          actionType: 'ATTACK',
          date: Date.now(),
          targetUserId: userId,
          // fromX: this.player.x,
          // fromY: this.player.y,
          // toX: position.x,
          // toY: position.y,
        });
      } catch (err) {
        console.log(err);
      }
    },
    handleSelectPlayerItem(item) {
      this.selectedItem = item;
    },
    async getMap() {
      const URL = `${process.env.VUE_APP_API_BASE_URL}/party/map`;
      const URL_TILES = `${process.env.VUE_APP_API_BASE_URL}/party/movable-tiles`;
      try {
        const { data: map } = await this.$http.get(URL);
        const { data: movableTiles } = await this.$http.get(URL_TILES);
        this.layersManager = new LayersManager(map);
        this.setMovableTiles(movableTiles);
      } catch (err) {
        console.log(err);
      }
    },
    async getPartyDetails() {
      const URL = `${process.env.VUE_APP_API_BASE_URL}/party/${this.partyId}/details`;
      try {
        const party = await this.$http.get(URL);
        this.setParty(party.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getPartyActions() {
      const URL = `${process.env.VUE_APP_API_BASE_URL}/party/${this.partyId}/actions`;
      try {
        const actions = await this.$http.get(URL);
        this.setActions(actions.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    ...mapGetters(['party', 'user', 'actions']),
    player() {
      return this.party.users.find((player) => player.userId === this.user._id);
    },
  },
  mounted() {
    this.getMap();
    this.getPartyDetails();
    this.getPartyActions();
    setInterval(() => {
      this.getPartyDetails();
      this.getPartyActions();
    }, 5000);
  },
};
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
