<template>
  <Grid :init-grid-func="initMap" :layers-manager="layersManager" />
</template>

<script>
import { mapGetters } from 'vuex';
import LayersManager from './LayersManager';
import Grid from '../../../reusables/Grid.vue';

export default {
  name: 'Map-Grid',
  components: {
    Grid,
  },
  props: {
    layersManager: { type: LayersManager, required: true },
  },
  computed: {
    ...mapGetters(['tileSets']),
  },
  methods: {
    async initMap(canvasContext) {
      this.layersManager.verticalCases.forEach((verticalCaseId) => {
        this.layersManager.horizontalCases.forEach((horizontalCasesId) => {
          this.layersManager
            .findObjectForCase(verticalCaseId, horizontalCasesId)
            .forEach((caseLayerId) => {
              const casePositionX = verticalCaseId * 16;
              const casePositionY = horizontalCasesId * 16;
              const image = new Image();
              image.onload = () => {
                canvasContext.drawImage(image, casePositionX, casePositionY);
              };
              image.src = this.tileSets[caseLayerId];
            });
        });
      });
    },
  },
};
</script>
