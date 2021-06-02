<template>
  <div class="grid__case_content" :class="classes">
    <p v-if="debug === true">[{{caseData.x}} , {{caseData.y}}]</p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'MapCase',
  props: {
    caseData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      classes: {
        grass: (!!this.caseData && this.caseData.type === 'grass'),
        water: (!!this.caseData && this.caseData.type === 'water'),
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
  }

  .grid__case_content span {
    display: block;
    height: 100%;
    width: 100%;
  }

  .grass {
    background-color: green;
  }

  .water {
    background-color: blue;
  }

  .wood {
    background-color: #673f23;
  }
</style>
