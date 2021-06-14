<template>
  <grid :number-of-horizontal-cases="layersManager.numberOfHorizontalCases"
        :number-of-vertical-cases="layersManager.numberOfVerticalCases"
        :z-index="3" class="card-grid" >
    <template v-slot:default="{ x, y }">
      <card-case :key="`card_case_${layersManager.findObjectForCase(x, y).join()}`"
                 :caseData="layersManager.findObjectForCase(x, y)"/>
    </template>
  </grid>
</template>

<script>
import Grid from '../../../reusables/Grid'
import CardCase from './CardCase'
import LayersManager from './LayersManager'

export default {
  name: 'CardGrid',
  components: {
    CardCase,
    Grid,
  },
  props: {
    layersManager: { type: LayersManager, required: true },
  }
}
</script>
