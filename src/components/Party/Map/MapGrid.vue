<template>
  <Grid
      :layers-manager="layersManager"
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
  props: {
    layersManager: { type: LayersManager, required: true },
  },
  computed: {
    ...mapGetters([ 'tileSets' ]),
  },
  methods: {
    async initMap(canvasContext) {
      this.layersManager.verticalCases.forEach(verticalCaseId => {
        this.layersManager.horizontalCases.forEach(horizontalCasesId => {
          this.layersManager.findObjectForCase(verticalCaseId, horizontalCasesId).forEach(caseLayerId => {
            const casePositionX = verticalCaseId * 16;
            const casePositionY = horizontalCasesId * 16;
            let image = new Image();
            image.onload = () => {
              canvasContext.drawImage(image, casePositionX, casePositionY);
            };
            image.src = this.tileSets[caseLayerId];
          })
        });
      });
    }
  }
}
</script>
