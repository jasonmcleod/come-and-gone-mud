const chalk = require('chalk');

const CHUNK_HEIGHT = 50;
const CHUNK_WIDTH = 50;
const AVG_TEMP = 75;
const TEMP_FLUCTUATION = 15;

const chunks = new Map();

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function ParseChunkId(chunkId) {
  if (!chunkId || typeof chunkId !== 'string') {
    throw new Error('Expected a string chunkId');
  }

  const chunkParts = chunkId.split(',');

  if (chunkParts.length !== 2) {
    throw new Error('Expected a comma separated chunkId');
  }

  const chunkX = parseInt(chunkParts[0], 10);
  const chunkY = parseInt(chunkParts[1], 10);

  if (isNaN(chunkX) || isNaN(chunkY)) {
    throw new Error('Expected numeric chunk coordinates');
  }

  return {
    chunkId,
    x: chunkX,
    y: chunkY,
  };
}

function ChunkForTileCoords(x, y) {
  return `${Math.floor(x / CHUNK_WIDTH)},${Math.floor(y / CHUNK_HEIGHT)}`;
}

function RelativeTileIndexToRelativeCoords(index) {
  const x = index % CHUNK_WIDTH;
  const y = ~~(index / CHUNK_WIDTH);
  return {
    x,
    y,
  };
}

function RelativeTileCoordsToRelativeIndex(x, y) {
  return x + (y * CHUNK_WIDTH);
}

function RelativeTileCoordsToActualTileCoords(x, y, chunkId) {
  const chunkKey = ParseChunkId(chunkId);

  return {
    x: x + (chunkKey.x * CHUNK_WIDTH),
    y: y + (chunkKey.y * CHUNK_HEIGHT),
  }
}

function ActualTileCoordsToRelativeTileCoords(x, y) {
  return {
    x: x % CHUNK_WIDTH,
    y: y % CHUNK_HEIGHT,
  };
}

function GenerateTiles(startingX, startingY) {
  // console.debug(`Generating tile ${startingX},${startingY}`);
  const currentChunkId = ChunkForTileCoords(startingX, startingY);
  const chunk = chunks.get(currentChunkId);
  if (!chunk) {
    console.warn(`Chunk ${currentChunkId} does not exist`);
    return 0;
  }

  const relativeTileCoords = ActualTileCoordsToRelativeTileCoords(startingX, startingY);
  const currentTileIndex = RelativeTileCoordsToRelativeIndex(relativeTileCoords.x, relativeTileCoords.y);
  if (typeof chunk[currentTileIndex] === 'undefined') {
    chunk[currentTileIndex] = 0;
    const samplingDeltas = [
      (x, y) => ({ x, y: y - 1 }),
      (x, y) => ({ x, y: y + 1 }),
      (x, y) => ({ x: x - 1, y }),
      (x, y) => ({ x: x + 1, y }),

      (x, y) => ({ x: x - 1, y: y - 1 }),
      (x, y) => ({ x: x + 1, y: y + 1 }),
      (x, y) => ({ x: x - 1, y: y + 1 }),
      (x, y) => ({ x: x + 1, y: y - 1 }),
    ];
    shuffleArray(samplingDeltas);
    const neighborValues = [];
    for (let i = 0; i < samplingDeltas.length; i++) {
      let neighborTile = samplingDeltas[i](startingX, startingY);
      let neighborValue = GenerateTiles(neighborTile.x, neighborTile.y);
      if (neighborValue !== 0) {
        neighborValues.push(neighborValue);
      }
    }

    if (neighborValues.length === 0) {
      chunk[currentTileIndex] = Math.round(AVG_TEMP + ((Math.random() - .5) * TEMP_FLUCTUATION));
    } else {
      let sum = 0;
      for (let i = 0; i < neighborValues.length; i++) {
        sum += neighborValues[i];
      }
      chunk[currentTileIndex] = Math.round(sum / neighborValues.length);
    }
  }

  return chunk[currentTileIndex];
}

function GetOrGenerateChunk(chunkId) {
  const chunkKey = ParseChunkId(chunkId);

  if (!chunks.has(chunkId)) {
    console.info(`Chunk ${chunkId} not found, generating`);
    chunks.set(chunkId, []);
    const chunkTileCount = CHUNK_HEIGHT * CHUNK_WIDTH;
    const startingRelativeTileIndex = ~~(Math.random() * chunkTileCount);
    const startingRelativeTileCoordinates = RelativeTileIndexToRelativeCoords(startingRelativeTileIndex);
    const startingTileCoordinates = RelativeTileCoordsToActualTileCoords(startingRelativeTileCoordinates.x, startingRelativeTileCoordinates.y, chunkKey.chunkId);
    console.debug(`Beginning generation in chunk ${chunkId} with tile index ${startingRelativeTileIndex} (${startingTileCoordinates.x},${startingTileCoordinates.y})`);
    GenerateTiles(startingTileCoordinates.x, startingTileCoordinates.y);
  }

  return chunks.get(chunkId);
}

function RenderChunk(chunk) {
  for (let y = 0; y < CHUNK_HEIGHT; y++) {
    let line = '';
    for (let x = 0; x < CHUNK_WIDTH; x++) {
      let value = chunk[RelativeTileCoordsToRelativeIndex(x, y)];
      let scaled = (100 * (value - 60)) / 30;
      line += chalk.hsl(32, 100, scaled)('▓▓');
    }
    console.log(line);
  }
}

const chunk = GetOrGenerateChunk('0,0');
const chunk2 = GetOrGenerateChunk('0,1');

RenderChunk(chunk);
RenderChunk(chunk2);