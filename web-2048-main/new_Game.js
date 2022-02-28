class Game {
  constructor(display_cells,score_element,best_score_element) {
    this.score = 0;
    this.max = 4;
    this.display_cells = display_cells;
    this.cells = [];
    this.score_element = score_element;
    this.best_score_element = best_score_element;
    this.display_cells.forEach((cell) => {
      this.cells.push(0);
    });
    this.AddNewCell();
    // this.AddNewCell();
  }

  Move(direction) {
    let moved = false;
    LEFT:
        for (let p = 0; p < 4; p++) {
          let next = [0, 0, 0, 0];
          let current = 0;
          let j = 0;
          let i = 0;
          while (i < 4) {
            if (this.board[p][i] != 0) {
              if (current == 0) {
                current = this.board[p][i++];
              } else {
                if (this.board[p][i] == current) {
                  let new_num = this.board[p][i++] << 1;
                  next[j++] = new_num;
                  this.score += new_num;
                  current = 0;
                } else {
                  next[j++] = current;
                  current = this.board[p][i++];
                }
              }
            } else {
              i++;
            }
          }
          if (current != 0) {
            next[j++] = current;
          }
          let old = [0, 0, 0, 0];
          for (let i = 0; i < 4; i++) {
            old[i] = this.board[p][i];
          }
          for (let i = 0; i < next.length; i++) {
            this.board[p][i] = next[i];
          }
          for (let i = 0; i < 4; i++) {
            if (old[i] != this.board[p][i]) {
              moved = true;
              break;
            }
          }
        }
        
    if (moved && this.FreeTiles() != 0) {
      this.AddNewTile();
    }
  }

  Won() {
    if (this.max >= 2048) {
      return true;
    }
  }

  AddNewCell() {
    let empty = this.GetEmptyCellIndexes();
    // let i = empty[RandomInt(0, empty.length)];
    let i = 0;
    let num = Math.random() < 0.9 ? 2 : 4;
    this.cells[i] = num;
    this.display_cells[i].classList.remove("new_cell");
    void this.display_cells[i].offsetWidth;
    this.display_cells[i].classList.add("new_cell");
    this.display_cells[i].innerHTML = num;
  }

  GetEmptyCellIndexes() {
    let result = [];
    for (let i = 0; i < 16; i++) {
      if (this.cells[i] == 0) result.push(i);
    }
    return result;
  }

  ThereIsPossibleMove() {
    if (this.FreeTiles() != 0) {
      return true;
    }
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let neighbours = GetNeighbours(this.board, i, j);
        // there is a case with two same numbers and 1 or 2 empty places
        // in between them, but that will be captures by empty place check
        for (let k = 0; k < neighbours.length; k++)
          if (neighbours[k] == this.board[i][j]) return true;
      }
    }
    return false;
  }

  FreeTiles() {
    let count = 0;
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) if (this.board[i][j] === 0) count++;
    return count;
  }

  Slide(direction) {
    let moved = false;
    for (let i = 0; i < 4; i++) {
      let old_row = [];
      for (let j = 0; j < 4; j++) {
        switch (direction) {
          case LEFT:
            old_row.push(this.cells[i * 4 + j]);
            break;
          case RIGHT:
            old_row.unshift(this.cells[i * 4 + j]);
            break;
          case UP:
            old_row.push(this.cells[i + j * 4]);
            break;
          case DOWN:
            old_row.unshift(this.cells[i + j * 4]);
            break;
          default:
            break;
        }
      }
      old_row = old_row.filter((element) => element != 0);
      let old_len = old_row.length;
      let k = 0;
      let new_row = [];
      while (k < old_row.length - 1) {
        if (old_row[k] == old_row[k + 1]) {
          new_row.push(old_row[k] << 1);
          k += 2;
        } else {
          new_row.push(old_row[k]);
          k += 1;
        }
      }
      if (old_row.length != k) {
        new_row.push(old_row[k]);
      }
      if( old_len != new_row.length){
        moved = true;
      }
      let zeros=4-new_row.length;
      for (let k=0;k<zeros;k++){
        new_row.push(0);
      }
      for (let j = 0; j < 4; j++) {
        switch (direction) {
          case LEFT:
            this.cells[i * 4 + j]=new_row.pop();
            break;
          case RIGHT:
            this.cells[i * 4 + j]=new_row.shift();
            break;
          case UP:
            this.cells[i + j * 4]=new_row.pop();
            break;
          case DOWN:
            this.cells[i + j * 4]=new_row.shift();
            break;
          default:
            break;
        }
      }
    }
    if (moved && this.GetEmptyCellIndexes().length != 0) {
      this.AddNewCell();
    }
    this.ShowBoard();
  }
}




// function GameLoop() {
//   game.ShowBoard();
//   if (game.Won() && !won){
//     console.log("heeeeeeeeeeey you WONNNNNNNNNN");
//     won = true;
//   }
//   if (!game.ThereIsPossibleMove()){
//     console.log("game over. score = "+String(game.score));
//     console.log("max tile value = ", game.max);
//     if (game.score>GetBestScore()){
//       SetBestScore(game.score);
//     }
//     console.log("best score = "+String(GetBestScore()));
//     won = false;
//   }
// }

// function ShowBoard(){
//   for (let i = 0; i < this.cells.length; i++) {
//       const cell = this.cells[i];
//       if (cell!=0){
//           this.display_cells[i].style.backgroundColor=WHITE;
//           this.display_cells[i].innerHTML = cell;
//       }else{
//           this.display_cells[i].innerHTML = "";
//       }
//     }
// }