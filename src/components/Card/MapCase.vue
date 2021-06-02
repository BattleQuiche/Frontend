<template>
  <div class="grid__case_content" :class="classes">
    <water v-if="caseData.type === 'water'" />
    <water v-else-if="caseData.type === 'water-grass-top'" type="grass-top" />
    <water v-else-if="caseData.type === 'water-grass-bottom'" type="grass-bottom" />
    <simple-grass v-else />
    <p v-if="debug === true">[{{caseData.x}},{{caseData.y}}]</p>
  </div>
</template>

<script>
import SimpleGrass from './backgrounds/SimpleGrass'
import Water from './backgrounds/Water'

export default {
  name: 'MapCase',
  components: {
    SimpleGrass,
    Water,
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
      debug: false
    }
  },
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
