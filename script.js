import blocks from './blocks.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const blockSize = canvas.width / 10;

const grid = new Array(10);

for (let l = 0; l < 20; l++) {
  grid[l] = new Array();
  for (let r = 0; r < 10; r++) {
    grid[l][r] = null;
  }
}

ctx.strokeStyle = '#333';

function drawBg() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  ctx.strokeStyle = "#333"

  for (let r = 0; r < 20; r++) {
    for (let c = 0; c < 10; c++) {
      if (grid[r][c] !== null) {
        ctx.fillStyle = grid[r][c];
        ctx.fillRect(c * blockSize, r * blockSize, blockSize, blockSize);
      }

      ctx.strokeRect(
        c * blockSize + 1,
        r * blockSize + 1,
        blockSize - 2,
        blockSize - 2
      );
    }
  }
}

drawBg();

//* funcionamento
let posX, posY, actualBlock, rotation;

createNewBlock();

function createNewBlock() {
  posX = canvas.width / 2;
  posY = 240;
  rotation = 0;
  actualBlock =
    Object.values(blocks)[
      Math.floor(Math.random() * Object.keys(blocks).length)
    ];
  // actualBlock = blocks.Z;

  drawBlock();
}
function drawBlock() {
  //* 0x0
  ctx.fillStyle = actualBlock.color;
  ctx.fillRect(posX, posY, blockSize, blockSize);
  ctx.strokeStyle = 'red';
  // ctx.strokeRect(posX, posY, blockSize, blockSize);

  //* Outros
  actualBlock.pattern.forEach((item) => {
    const deltaX = blockSize * item[0];
    const deltaY = blockSize * item[1];
    
    const angle = Math.atan2(deltaY, deltaX);

    let distance;
    if(angle % (Math.PI / 2) === 0 || angle % (-Math.PI / 2) === 0){
      distance = blockSize;
    } else{
      distance = Math.sqrt(Math.pow(blockSize, 2) * 2);
      console.log(angle + ' não é multiplo de pi / 2')
    }

    if(item.includes(2) || item.includes(-2)){
      distance *= 2;
    }

    const X = posX + distance * Math.cos(angle + rotation);
    const Y = posY + distance * Math.sin(angle + rotation);

    console.log(X + ' e ' + Y)

    ctx.fillRect(
      X,
      Y,
      blockSize,
      blockSize
    );
  });
}

function deleteBlock() {
  //* 0x0
  ctx.clearRect(posX, posY, blockSize, blockSize);

  //* Outros
  actualBlock.pattern.forEach((item) => {
    ctx.clearRect(
      posX + blockSize * item[0],
      posY + blockSize * item[1],
      blockSize,
      blockSize
    );
  });
}

//* TECLA APERTADA
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      posX -= blockSize;

      break;
    case 'ArrowRight':
      posX += blockSize;

      break;
    case 'z':
      if(!['square'].includes(actualBlock.id)){
        if(!['T', 'L', 'J'].includes(actualBlock.id)){
          if(rotation == Math.PI / 2){
            rotation -= Math.PI / 2;
          } else {
            rotation += Math.PI / 2;
          }
        } else{
          rotation += Math.PI / 2;
        }
      }
      break;
    case 'x':
      if(!['square'].includes(actualBlock.id))
      rotation -= Math.PI / 2;
      break;
  }

  if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'z', 'x'].includes(e.key)) {
    drawBg();
    drawBlock();
  }
});

//* INTERVALO REFRESH
const intervaloRefresh = setInterval(refresh, 600);

function refresh() {
  if (posY + 30 + actualBlock.size.down * blockSize === canvas.height) {
    // console.log(grid[posY / blockSize][posX / blockSize]);
    grid[posY / blockSize][posX / blockSize] = actualBlock.color;

    drawBg();
    // console.log(grid);

    createNewBlock();
  } else {
    deleteBlock(actualBlock);
    drawBg();
    posY += blockSize;
    drawBlock(actualBlock);
  }
}
