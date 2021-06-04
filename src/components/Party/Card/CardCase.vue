<template>
  <div class="grid__case_content" :class="{ [caseData.type]: true }">
    <p v-if="debug === true">[{{caseData.x}} , {{caseData.y}}]</p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

class Type {
  static WOOD = 'wood';
  static WATER = 'water';
  static GRASS = 'grass';
}

export default {
  name: 'CardCase',
  props: {
    caseData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['debug']),
  },
  Type,
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
    background-color: #6dd46d;
  }

  .water {
    background-color: #267488;
  }

  .wood {
    background-color: #774f3a;
  }
</style>
