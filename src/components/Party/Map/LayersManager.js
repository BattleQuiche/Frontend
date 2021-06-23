export default class LayersManager {
  constructor (map) {
    this.layers = map.layers
    this.numberOfHorizontalCases = map.width
    this.numberOfVerticalCases = map.height

    this.horizontalCases = [...Array(this.numberOfHorizontalCases).keys()]
    this.verticalCases = [...Array(this.numberOfVerticalCases).keys()]

    this.mapLayer = this.findLayerInMap('Map');
    this.mapDecorationsLayer = this.findLayerInMap('Water');
    this.objectsLayer = this.findLayerInMap('Objects');
  }

  findObjectForCase = (x, y) => {
    const caseNumber = (x + y * this.numberOfHorizontalCases)

    return [
      this.mapLayer[caseNumber],
      this.mapDecorationsLayer[caseNumber],
      this.objectsLayer[caseNumber],
    ].filter((item) => (item !== 0))
  }

  findLayerInMap = (layerName) => {
    return this.layers.find((layer) => (layer.name === layerName))?.data
  }
}
