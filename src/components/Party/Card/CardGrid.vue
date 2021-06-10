<template>
  <grid :number-of-horizontal-cases="numberOfHorizontalCases"
        :number-of-vertical-cases="numberOfVerticalCases"
        :z-index="3" class="card-grid" >
    <template v-slot:default="{ x, y }">
      <card-case :key="`card_case_${findObjectForCase(x, y).join()}`" :caseData="findObjectForCase(x, y)"/>
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
      const caseNumber = (x + y * this.numberOfHorizontalCases)

      return [
        this.findLayerInMap('Map')[caseNumber],
        this.findLayerInMap('MapDecorations')[caseNumber],
        this.findLayerInMap('Objects')[caseNumber],
      ].filter((item) => (item !== 0))
    },
    findLayerInMap(layerName) {
      return this.layers.find((layer) => (layer.name === layerName))?.data
    }
  },
  props: {
    layers: { type: Array, required: true },
    numberOfHorizontalCases: { type: Number, require: true },
    numberOfVerticalCases: { type: Number, require: true },
  }
}
</script>
