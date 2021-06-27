import overWorldTileset from '@/assets/tilesets/overworld.tileset.png';
import townTileset from '@/assets/tilesets/town.tileset.png';
import store from '../../../store';

const cutTileset = (image, firstGid) => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  const tileWidth = 16;
  const tileHeight = 16;

  const tilesOnX = image.width / tileWidth;
  const tilesOnY = image.height / tileHeight;

  ctx.drawImage(image, 0, 0);

  const tileData = {};
  let count = firstGid;

  for (let y = 0; y < tilesOnY; y += 1) {
    for (let x = 0; x < tilesOnX; x += 1) {
      const data = ctx.getImageData(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
      const dataImageCanvas = document.createElement('canvas');
      const dataImageCtx = dataImageCanvas.getContext('2d');
      dataImageCanvas.width = data.width;
      dataImageCanvas.height = data.height;
      dataImageCtx.putImageData(data, 0, 0);

      tileData[count] = dataImageCanvas.toDataURL();
      count += 1;
    }
  }

  return tileData;
};

const setTileSets = async () => {
  const overWorldImage = new Image();
  overWorldImage.src = overWorldTileset;

  overWorldImage.onload = () => {
    const overWorld = cutTileset(overWorldImage, 1);

    store.dispatch('setTileSets', { ...store.state.tileSets, ...overWorld });
  };

  const townImage = new Image();
  townImage.src = townTileset;

  townImage.onload = () => {
    const town = cutTileset(townImage, 201);

    store.dispatch('setTileSets', { ...store.state.tileSets, ...town });
  };
};

setTileSets();

export default {
  setTileSets,
};
