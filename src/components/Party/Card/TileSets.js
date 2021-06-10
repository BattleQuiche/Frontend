import store from '../../../store'
import overWorldTileset from '@/assets/tilesets/overworld.tileset.png'
import townTileset from '@/assets/tilesets/town.tileset.png'

const cutTileset = (image, firstGid) => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width
  canvas.height = image.height
  const ctx = canvas.getContext('2d');
  const tileWidth = 16;
  const tileHeight = 16;

  const tilesOnX = image.width / tileWidth
  const tilesOnY = image.height / tileHeight

  ctx.drawImage(image, 0, 0)

  let tileData = {}
  let count = firstGid;

  for(let y = 0; y < tilesOnY; y++) {
    for(let x = 0; x < tilesOnX; x++) {
      const data = ctx.getImageData(x * tileWidth, y * tileHeight, tileWidth, tileHeight)
      const dataImageCanvas = document.createElement('canvas');
      const dataImageCtx = dataImageCanvas.getContext('2d');
      dataImageCanvas.width = data.width
      dataImageCanvas.height = data.height
      dataImageCtx.putImageData(data, 0, 0)

      tileData[count] = dataImageCanvas.toDataURL()
      count++
    }
  }

  return tileData
}

const setTileSets = () => {
  const overWorldImage = new Image()
  overWorldImage.src = overWorldTileset

  overWorldImage.onload = function() {
    const overWorld = cutTileset(overWorldImage, 1)

    store.dispatch('setTileSets', { ...store.state.tileSets, ...overWorld })
  }

  const townImage = new Image()
  townImage.src = townTileset

  townImage.onload = function() {
    const town = cutTileset(townImage, 201)

    store.dispatch('setTileSets', { ...store.state.tileSets, ...town })
  }
}

setTileSets()
