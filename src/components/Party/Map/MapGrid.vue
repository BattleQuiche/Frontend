<template>
  <Grid
      :number-of-horizontal-cases="numberOfHorizontalCases"
      :number-of-vertical-cases="numberOfVerticalCases"
      :init-grid-func="initMap"/>
</template>

<script>
import { mapGetters } from "vuex";
import LayersManager from './LayersManager'
import Grid from '../../../reusables/Grid';

export default {
  name: 'Map-Grid',
  components: {
    Grid,
  },
  data() {
    return {
      horizontalCases: [ ...Array(this.layersManager.numberOfHorizontalCases).keys() ],
      verticalCases: [ ...Array(this.layersManager.numberOfVerticalCases).keys() ],
      numberOfHorizontalCases: this.layersManager.numberOfHorizontalCases,
      numberOfVerticalCases: this.layersManager.numberOfVerticalCases
    }
  },
  computed: {
    ...mapGetters([ 'tileSets' ]),
  },
  props: {
    layersManager: { type: LayersManager, required: true },
  },
  mounted () {
    let canvas = this.$el;

    // noinspection JSUnresolvedFunction
    this.canvasContext = canvas.getContext('2d');

    this.initMap();
  },
  methods: {
    async initMap() {
      this.verticalCases.forEach(verticalCaseId => {
        this.horizontalCases.forEach(horizontalCasesId => {
          this.layersManager.findObjectForCase(verticalCaseId, horizontalCasesId).forEach(caseLayerId => {
            const casePositionX = verticalCaseId * 16;
            const casePositionY = horizontalCasesId * 16;
            let image = new Image();
            image.onload = () => {
              this.canvasContext.drawImage(image, casePositionX, casePositionY);
            };
            image.src = this.tileSets[caseLayerId];
          })
        });
      });
    }
  }
}
</script>
