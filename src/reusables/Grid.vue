<template>
  <canvas
      :width="numberOfHorizontalCases * 16"
      :height="numberOfVerticalCases * 16"></canvas>
</template>

<script>
export default {
  name: 'Grid',
  data() {
    return {
      horizontalCases: [...Array(this.numberOfHorizontalCases).keys()],
      verticalCases: [...Array(this.numberOfVerticalCases).keys()],
      canvasContext: null,
    }
  },
  props: {
    numberOfHorizontalCases: { type: Number, require: true },
    numberOfVerticalCases: { type: Number, require: true },
    initGridFunc: { type: Function, require: true }
  },
  mounted () {
    let cardGrid = this.$el;

    // noinspection JSUnresolvedFunction
    this.canvasContext = cardGrid.getContext('2d');

    this.initGridFunc();
  },
}
</script>
