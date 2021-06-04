<template>
  <grid :number-of-horizontal-cases="numberOfHorizontalCases"
        :number-of-vertical-cases="numberOfVerticalCases"
        :z-index="4" class="player-grid" >
    <template v-slot:default="{ x, y }">
      <p>{{x + y}}</p>
<!--      <card-case :key="'card_case_' + x + y" :caseData="findObjectForCase(x, y)"/>-->
    </template>
  </grid>
</template>

<script>
import Grid from '../../../reusables/Grid'

export default {
  name: 'PlayerGrid',
  components: {
    Grid,
  },
  props: {
    players: { type: Array, required: true },
    numberOfHorizontalCases: { type: Number, require: true },
    numberOfVerticalCases: { type: Number, require: true },
  }
}
</script>

<style scoped>

</style>
