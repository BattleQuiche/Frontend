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
  data() {
    return {
      canvasEl: undefined,
      canvasContext: undefined,
      entities: [],
    }
  },
  computed: {
    ...mapGetters([ 'tileSets' ]),
  },
  props: {
    numberOfHorizontalCases: { type: Number, required: true },
    numberOfVerticalCases: { type: Number, required: true },
    players: { type: Array, required: true },
    isPlayerCanWalk: { type: Boolean, default: false },
  },
  methods: {
    async initGrid( canvasContext ) {
      this.canvasEl = this.$el;
      this.canvasContext = canvasContext;

      this.players.forEach(player => {
        const casePositionX = player.x * 16;
        const casePositionY = player.y * 16;

        let image = new Image();
        image.onload = () => {
          canvasContext.drawImage(image, casePositionX, casePositionY, 16, 16);

          this.entities.push({
            type: 'User',
            username: player.username,
            coordinates: {
              x: casePositionX,
              y: casePositionY
            },
            size: {
              height: 16, // get real size : image.height
              width: 16, // get real size : image.width
            },
            movementPoints: 5,
            isCurrentPlayer: player.isCurrentPlayer,
            playerImg: player.playerImg,
          });
        };
        image.src = player.playerImg;
      });
    },
    getCursorPosition( canvas, event ) {
      const rect = canvas.getBoundingClientRect();
      const x = Math.round(event.clientX - rect.left);
      const y = Math.round(event.clientY - rect.top);

      return { x, y }
    },
    getEntityByPosition( x, y ) {
      return this.entities.filter(entity => {
        const entityMinX = entity.coordinates.x;
        const entityMinY = entity.coordinates.y;
        const entityMaxX = entityMinX + entity.size.width;
        const entityMaxY = entityMinY + entity.size.height;

        return x >= entityMinX && x <= entityMaxX && y >= entityMinY && y <= entityMaxY;
      });
    },
    drawUserMovementsLimit() {
      const { coordinates, size, movementPoints } = this.getCurrentPlayer();
      const entityMinX = coordinates.x;
      const entityMinY = coordinates.y;
      const entityMaxX = entityMinX + size.width;
      const entityMaxY = entityMinY + size.height;

      for ( let directionIndex = 1; directionIndex <= 8; directionIndex++ ) {
        let firstRectX = 0;
        let firstRectY = 0;
        for ( let movementPointIndex = 0; movementPointIndex < movementPoints; movementPointIndex++ ) {
          let x = 0;
          let y = 0;
          switch ( directionIndex ) {
            case 1: // right
              firstRectX = entityMaxX + 1;
              firstRectY = entityMinY + 1;

              x = firstRectX + (16 * movementPointIndex);
              y = firstRectY;
              break;

            case 2: // right bottom
              firstRectX = entityMaxX + 1;
              firstRectY = entityMaxY + 1;

              x = firstRectX + (16 * movementPointIndex);
              y = firstRectY + (16 * movementPointIndex);
              break;


            case 3: // bottom
              firstRectX = entityMinX + 1;
              firstRectY = entityMaxY + 1;

              x = firstRectX;
              y = firstRectY + (16 * movementPointIndex);
              break;

            case 4: // left bottom
              firstRectX = entityMinX - 1;
              firstRectY = entityMaxY + 1;

              x = firstRectX - (16 * (movementPointIndex + 1));
              y = firstRectY + (16 * movementPointIndex);
              break;

            case 5: // left
              firstRectX = entityMinX - 16;
              firstRectY = entityMinY + 1;

              x = firstRectX - (16 * movementPointIndex);
              y = firstRectY;
              break;

            case 6: // left top
              firstRectX = entityMinX - 1;
              firstRectY = entityMinY - 1;

              x = firstRectX - (16 * (movementPointIndex + 1));
              y = firstRectY - (16 * (movementPointIndex + 1));
              break;

            case 7: // top
              firstRectX = entityMinX + 1;
              firstRectY = entityMinY - 16;

              x = firstRectX;
              y = firstRectY - (16 * movementPointIndex);
              break;

            case 8: // right top
              firstRectX = entityMaxX + 1;
              firstRectY = entityMinY - 1;

              x = firstRectX + (16 * movementPointIndex);
              y = firstRectY - (16 * (movementPointIndex + 1));
              break;
          }

          console.log({firstRectX, firstRectY, movementPointIndex, x, y});

          this.canvasContext.beginPath();
          this.canvasContext.fillStyle = "rgba(0, 0, 255, .25)";
          this.canvasContext.rect(x, y, 14, 14);
          this.canvasContext.fill();

          // this.entities.push({
          //   type: 'User',
          //   username: player.username,
          //   coordinates: {
          //     x: casePositionX,
          //     y: casePositionY
          //   },
          //   size: {
          //     height: 16, // get real size : image.height
          //     width: 16, // get real size : image.width
          //   },
          //   movementPoints: 5,
          //   isCurrentPlayer: player.isCurrentPlayer,
          //   playerImg: player.playerImg,
          // });
        }
      }
    },
    getCurrentPlayer() {
      return this.entities.filter(entity => entity.type === 'User' && entity.isCurrentPlayer === true)[0];
    },
    handleCanvasInteraction: ( canvasEl, e ) => {
      console.log(this);
      const { x, y } = this.getCursorPosition(canvasEl, e);
      const entity = this.getEntityByPosition(x, y);

      console.log(entity);

      return entity;
    }
  },
  watch: {
    isPlayerCanWalk( newValue ) {
      if ( newValue !== true ) {
        // this.canvasEl.removeEventListener('mouseup', this.handleCanvasInteraction);
        console.log('User can\'t move');
        return;
      }

      console.log('User can move');
      this.drawUserMovementsLimit();
      // this.canvasEl.addEventListener('mouseup', this.handleCanvasInteraction(this.canvasEl), { passive: true });
    }
  }
}
</script>
