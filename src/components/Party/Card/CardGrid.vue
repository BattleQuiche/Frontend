<template>
  <grid :number-of-horizontal-cases="30" :number-of-vertical-cases="18" :z-index="3">
    <template v-slot:default="{ x, y }">
      <card-case :key="'card_case_' + x + y" :caseData="findObjectForCase(x, y)"/>
    </template>
  </grid>
</template>

<script>
import Grid from '../../../reusables/Grid'
import CardCase from './CardCase'

export default {
  name: 'CardGrid',
  components: {
    CardCase,
    Grid,
  },
  methods: {
    findObjectForCase(x, y) {
      return this.cases.find(gridCase => (gridCase.x === x && gridCase.y === y))
    }
  },
  props: {
    cases: {
      type: Array,
      required: true
    },
  }
}
</script>

<style scoped>

</style>
