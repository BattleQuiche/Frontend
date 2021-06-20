<template>
  <Grid
      id="player-grid"
      :number-of-horizontal-cases="numberOfHorizontalCases"
      :number-of-vertical-cases="numberOfVerticalCases"
      :init-grid-func="initGrid"/>
</template>

<script>
import { mapGetters } from "vuex";
import Grid from '../../../reusables/Grid'

export default {
  name: 'Player-Grid',
  components: {
    Grid,
  },
  computed: {
    ...mapGetters([ 'tileSets' ]),
  },
  props: {
    numberOfHorizontalCases: { type: Number, required: true },
    numberOfVerticalCases: { type: Number, required: true },
    players: { type: Array, required: true },
  },
  methods: {
    async initGrid(canvasContext) {
      this.players.forEach(player => {
        const casePositionX = player.x * 16;
        const casePositionY = player.y * 16;

        let image = new Image();
        image.onload = () => {
          canvasContext.drawImage(image, casePositionX, casePositionY);
        };
        image.src = player.playerImg;
      });
    },
    getPlayerIcon( x, y ) {
      const player = this.players.find(( player ) => ( player.x === x && player.y === y ))

      if ( !player ) {
        return null
      }

      return player.playerIcon
    }
  }
}
</script>
