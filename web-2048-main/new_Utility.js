const [UP,RIGHT,DOWN,LEFT] = [1,2,3,4];
const [GRAY,OCHRE,WHITE,BLACK,LIGHT_GRAY] =
      ["#8f99a8","#d9b041","#ffffff","#000000","#b5b3ac"];

function UpdateScore(score_element, score){
  score_element.innerHTML = String(score);
}

function UpdateBestScore(best_score_element) {
  
}

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

// function GetNeighbours(board,x,y) {
//   let neighbours = [];
//   if (x==0){
//     if (y>0)
//       neighbours.push(board[x][y-1]);
//     if (y<3)
//       neighbours.push(board[x][y+1])
//     neighbours.push(board[x+1][y]);
//   }else if (x==3){
//     if (y>0)
//       neighbours.push(board[x][y-1]);
//     if (y<3)
//       neighbours.push(board[x][y+1])
//     neighbours.push(board[x-1][y]);
//   }else{
//     if (y>0)
//       neighbours.push(board[x][y-1]);
//     if (y<3)
//       neighbours.push(board[x][y+1])
//     neighbours.push(board[x-1][y]);
//     neighbours.push(board[x+1][y]);
//   }
//   return neighbours;
// }

function GetCells() {
  let result = [];
  for(let i=0;i<16;i++){
      result.push(document.getElementById(String(i)));
  }
  return result;
}

function ResetCells(cells) {
  for (let i=0; i<16;i++){
    let cell = cells[i];
    // cell.style.order = i;
    cell.style.backgroundColor = LIGHT_GRAY;
    cell.classList.remove("new_cell");
    cell.innerHTML="";
  }
}