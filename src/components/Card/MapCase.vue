<template>
  <div class="grid__case_content" :class="classes">
    <simple-grass v-if="caseData.type === 'grass'" />
    <simple-water v-if="caseData.type === 'water'" />
    <p v-if="debug === true">[{{caseData.x}},{{caseData.y}}]</p>
  </div>
</template>

<script>
import SimpleGrass from './backgrounds/SimpleGrass'
import SimpleWater from './backgrounds/SimpleWater'
import {mapGetters} from 'vuex'

export default {
  name: 'MapCase',
  components: {
    SimpleGrass,
    SimpleWater,
  },
  props: {
    caseData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      classes: {
        wood: (!!this.caseData && this.caseData.type === 'wood'),
      },
    }
  },
  computed: {
    ...mapGetters(['debug']),
  }
}
</script>

<style scoped>
  .grid__case_content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: relative;
  }

  .grid__case_content span {
    display: block;
    height: 100%;
    width: 100%;
  }

  .grid__case_content .case-background {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }

  .wood {
    background-color: #673f23;
  }

  p {
    font-size: 10px;
    text-align: center;
  }
</style>
