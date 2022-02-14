const app = document.getElementById("app");
const canvas = document.createElement("canvas");
app.appendChild(canvas);
const WIDTH = 425;
const HEIGHT = 425;
canvas.width = WIDTH;
canvas.height = HEIGHT;
const screen = canvas.getContext("2d");
let game;
let won = false;

function GameLoop() {
  game.ShowBoard();
  if (game.Won() && !won){
    console.log("heeeeeeeeeeey you WONNNNNNNNNN");
    won = true;
  }
  if (!game.ThereIsPossibleMove()){
    console.log("game over. score = "+String(game.score));
    console.log(String(game.Max()));
    if (game.score>GetBestScore()){
      SetBestScore(game.score);
    }
    console.log("best score = "+String(GetBestScore()));
    game = new Game();
    won = false;
  }
}

function GamePad(event) {
  if(event.key=="ArrowRight"){
    game.Move(RIGHT);
    GameLoop();
  }else if(event.key=="ArrowLeft"){
    game.Move(LEFT);
    GameLoop();
  }else if(event.key=="ArrowUp"){
    game.Move(UP);
    GameLoop();
  }else if(event.key=="ArrowDown"){
    game.Move(DOWN);
    GameLoop();
  }else{
    return;
  }
}



game = new Game();
GameLoop();

window.addEventListener("keydown",GamePad);