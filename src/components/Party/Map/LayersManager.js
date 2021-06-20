export default class LayersManager {
  constructor (map) {
    this.layers = map.layers
    this.numberOfHorizontalCases = map.width
    this.numberOfVerticalCases = map.height
  }

  findObjectForCase = (x, y) => {
    const caseNumber = (x + y * this.numberOfHorizontalCases)

    return [
      this.findLayerInMap('Map')[caseNumber],
      this.findLayerInMap('MapDecorations')[caseNumber],
      this.findLayerInMap('Objects')[caseNumber],
    ].filter((item) => (item !== 0))
  }

  findLayerInMap = (layerName) => {
    return this.layers.find((layer) => (layer.name === layerName))?.data
  }
}
