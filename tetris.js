const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20,20)

const matrix= [
  [0, 0 ,0],
  [1, 1, 1],
  [0, 1, 0],
];

function createMatrix(w,h){
  const matrix=[];
  while(h--){
    matrix.push( new Array(w).fill(0));
  }
    return matrix;
}


function drawMatrix(matrix,offset){
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value!==0){
        context.fillStyle = "red";
        context.fillRect(x + offset.x, //offset for later movement
                         y + offset.y,
                         1, 1);
      }
    });
  });
}
//function draw will enable new canvas and new position
function draw(){
  context.fillStyle= "#000000";
  context.fillRect (0, 0, canvas.width, canvas.height);
  drawMatrix(player.matrix, player.pos);


}
const arena = createMatrix(12,20); //we created a board with 12 columns, 20 rows 



let dropCounter = 0;
let dropInterval = 1000;
let prev= 0;
function drop(){
  player.pos.y ++; //drops down one per second
  dropCounter= 0;
}
function update(time = 0){
  const deltaTime= time - prev;
  prev= time; //update prev to current
  dropCounter+=deltaTime;
  if(dropCounter > dropInterval){
    drop();
  }
  draw()
  requestAnimationFrame(update);
}
const player={
    pos: {x :5, y: 5},
    matrix: matrix,
}

document.addEventListener('keydown',event=>{

  if(event.keyCode ===37){
    player.pos.x--; //move left, right arrow
  }else if(event.keyCode ===39){
    player.pos.x++; //move right ,left arrow
  }else if(event.keyCode===40){
    drop(); //move down , arrow down
  }

});


update() //we can continue to update and draw
