const new_game = document.getElementById("new_game");
new_game.addEventListener("click",NewGame);
window.addEventListener("keydown",GamePad);

let game;
let cells = GetCells();

function GamePad(event) {
  if(event.key=="ArrowRight"){
    game.Move(RIGHT);
  }else if(event.key=="ArrowLeft"){
    game.Move(LEFT);
  }else if(event.key=="ArrowUp"){
    game.Move(UP);
  }else if(event.key=="ArrowDown"){
    game.Move(DOWN);
  }else{
    return;
  }
}


function NewGame() {
    ResetCells(cells);
    game = new Game(cells);
    move();
}
let d ;

NewGame();

function move() {
  let  dcells = cells.slice(0,4);
  let  vcells = dcells.map(cell => parseInt(cell.innerHTML)||0);
  d = dcells[0];
  setTimeout(() => {
    console.log(dcells[0].style.left);
  }, 500);
}