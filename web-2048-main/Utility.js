const [UP,RIGHT,DOWN,LEFT] = [1,2,3,4];
const [GRAY,OCHRE,WHITE,BLACK,LIGHT_GRAY] =
      ["#8f99a8","#d9b041","#ffffff","#000000","#b5b3ac"];

function GetBestScore() {
  let best_score = localStorage.getItem("best score");
  return Number(best_score);
}

function SetBestScore(best_score) {
  localStorage.setItem("best score",best_score);
}

function ClearBestScore() {
  localStorage.removeItem("best score");
}

function RandomInt(min,max) {
  // returns x from [min,max)
  return Math.floor(Math.random() * (max - min) + min);
}

function GetNeighbours(board,x,y) {
  let neighbours = [];
  if (x==0){
    if (y>0)
      neighbours.push(board[x][y-1]);
    if (y<3)
      neighbours.push(board[x][y+1])
    neighbours.push(board[x+1][y]);
  }else if (x==3){
    if (y>0)
      neighbours.push(board[x][y-1]);
    if (y<3)
      neighbours.push(board[x][y+1])
    neighbours.push(board[x-1][y]);
  }else{
    if (y>0)
      neighbours.push(board[x][y-1]);
    if (y<3)
      neighbours.push(board[x][y+1])
    neighbours.push(board[x-1][y]);
    neighbours.push(board[x+1][y]);
  }
  return neighbours;
}

function Flatten (board){
  let result = [];
  for (let i = 0; i < board.length; i++){
    for (let j = 0; j < board[i].length; j++){
      result.push(board[i][j]);
    }
  }
  return result;
}