<template>
  <canvas
      :width="layersManager.numberOfHorizontalCases * 16"
      :height="layersManager.numberOfVerticalCases * 16"></canvas>
</template>

<script>
import LayersManager from '../components/Party/Map/LayersManager'

export default {
  name: 'Grid',
  data() {
    return {
      canvasContext: null,
    }
  },
  props: {
    layersManager: { type: LayersManager, required: true },
    initGridFunc: { type: Function, require: true }
  },
  mounted () {
    let cardGrid = this.$el;

    // noinspection JSUnresolvedFunction
    this.canvasContext = cardGrid.getContext('2d');

    this.initGridFunc(this.canvasContext);
  },
}
</script>
