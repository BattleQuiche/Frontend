<template>
  <div class="grid" :style="{ zIndex }">
    <div class="grid__row" v-for="y in verticalCases" :key="y">
      <span class="grid__case" v-for="x in horizontalCases" :key="x">
        <slot v-bind="{ x, y }"/>
      </span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Grid',
  data() {
    return {
      horizontalCases: [...Array(this.numberOfHorizontalCases).keys()],
      verticalCases: [...Array(this.numberOfVerticalCases).keys()],
    }
  },
  props: {
    numberOfHorizontalCases: { type: Number, require: true },
    numberOfVerticalCases: { type: Number, require: true },
    zIndex: { type: Number, default: 1 },
  },
  computed: {
    ...mapGetters(['debug']),
  }
}
</script>

<style scoped>
  .grid {
    position: absolute;
  }

  .grid__row {
    display: flex;
  }

  .grid__case {
    display: block;
    height: 32px;
    width: 32px;
  }
</style>
