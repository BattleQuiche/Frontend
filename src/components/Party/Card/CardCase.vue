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
