<template>
  <div class="grid__case_content">
    <img v-for="data in caseData" :src="tileSets[data]" :key="`map_tile_${data}`" alt="">
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'CardCase',
  props: {
    caseData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['tileSets']),
  },
}
</script>

<style scoped>
  .grid__case_content {
    position: relative;
  }

  .grid__case_content img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
