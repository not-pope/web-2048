class Game {
  constructor(){
    this.score = 0;
    this.max = 4
    this.board = this.NewBoard();
    this.AddNewTile();
    this.AddNewTile();
  }

  ShowBoard(){
    // console.log(this.board);
    screen.lineWidth = 5;
    screen.fillStyle = GRAY;
    screen.fillRect(0,0,WIDTH,HEIGHT);
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        const num = this.board[i][j];
        if (num !== 0){
          screen.fillStyle = WHITE;
          screen.fillRect(j*100+(j+1)*5,i*100+(i+1)*5, 100,100);
          screen.font = "30px monospace";
          screen.fillStyle = BLACK;
          screen.fillText(String(num),j*100+(j+1)*5+40,i*100+(i+1)*5+60);
        }else{
          screen.fillStyle = LIGHT_GRAY;
          screen.fillRect(j*100+(j+1)*5,i*100+(i+1)*5, 100,100);
        }
      }
    }
  }

  Move(direction){
    let moved = false;
    switch (direction) {
      case RIGHT:
        for (let p = 0;p<4;p++){
          let next = [0,0,0,0];
          let current = 0;
          let j = 0;
          let i = 3;
          while (i>=0){
            if (this.board[p][i]!=0){
              if (current==0){
                current = this.board[p][i--];
              }else{
                if (this.board[p][i]==current){
                  let new_num = this.board[p][i--]<<1;
                  next[j++]=new_num;
                  this.score+=new_num;
                  current = 0;
                }else{
                  next[j++]=current;
                  current = this.board[p][i--];
                }
              }
            }else{
              i--;
            }
          }
          if (current!=0){
            next[j++]=current;
          }
          let old = [0,0,0,0];
          for (let i = 0;i<4;i++){
            old[i]=this.board[p][i];
          }
          for (let i = 0;i<next.length;i++){
            this.board[p][3-i]=next[i];
          }
          for (let i = 0;i<4;i++){
            if(old[i]!=this.board[p][i]){
              moved=true;
              break;
            }
          }
        }
        break;
      case LEFT:
        for (let p = 0;p<4;p++){
          let next = [0,0,0,0];
          let current = 0;
          let j = 0;
          let i = 0;
          while (i<4){
            if (this.board[p][i]!=0){
              if (current==0){
                current = this.board[p][i++];
              }else{
                if (this.board[p][i]==current){
                  let new_num = this.board[p][i++]<<1;
                  next[j++]=new_num;
                  this.score+=new_num;
                  current = 0;
                }else{
                  next[j++]=current;
                  current = this.board[p][i++];
                }
              }
            }else{
              i++;
            }
          }
          if (current!=0){
            next[j++]=current;
          }
          let old = [0,0,0,0];
          for (let i = 0;i<4;i++){
            old[i]=this.board[p][i];
          }
          for (let i = 0;i<next.length;i++){
            this.board[p][i]=next[i];
          }
          for (let i = 0;i<4;i++){
            if(old[i]!=this.board[p][i]){
              moved=true;
              break;
            }
          }
        }
        break;
      case UP:
        for (let p = 0;p<4;p++){
          let next = [0,0,0,0];
          let current = 0;
          let j = 0;
          let i = 0;
          while (i<4){
            if (this.board[i][p]!=0){
              if (current==0){
                current = this.board[i++][p];
              }else{
                if (this.board[i][p]==current){
                  let new_num = this.board[i++][p]<<1;
                  next[j++]=new_num;
                  this.score+=new_num;
                  current = 0;
                }else{
                  next[j++]=current;
                  current = this.board[i++][p];
                }
              }
            }else{
              i++;
            }
          }
          if (current!=0){
            next[j++]=current;
          }
          let old = [0,0,0,0];
          for (let i = 0;i<4;i++){
            old[i]=this.board[i][p];
          }
          for (let i = 0;i<next.length;i++){
            this.board[i][p]=next[i];
          }
          for (let i = 0;i<4;i++){
            if(old[i]!=this.board[i][p]){
              moved=true;
              break;
            }
          }
        }
        break;
      case DOWN:
        for (let p = 0;p<4;p++){
          let next = [0,0,0,0];
          let current = 0;
          let j = 0;
          let i = 3;
          while (i>=0){
            if (this.board[i][p]!=0){
              if (current==0){
                current = this.board[i--][p];
              }else{
                if (this.board[i][p]==current){
                  let new_num = this.board[i--][p]<<1;
                  next[j++]=new_num;
                  this.score+=new_num;
                  current = 0;
                }else{
                  next[j++]=current;
                  current = this.board[i--][p];
                }
              }
            }else{
              i--;
            }
          }
          if (current!=0){
            next[j++]=current;
          }
          let old = [0,0,0,0];
          for (let i = 0;i<4;i++){
            old[i]=this.board[i][p];
          }
          for (let i = 0;i<next.length;i++){
            this.board[3-i][p]=next[i];
          }
          for (let i = 0;i<4;i++){
            if(old[i]!=this.board[i][p]){
              moved=true;
              break;
            }
          }
        }
        break;
      default:
        break;
    }
    if(moved && (this.FreeTiles()!=0)){
      this.AddNewTile();
    }
  }

  Won(){
    if(this.max>=2048){
      return true;
    }
  }

  AddNewTile(){
    let i = 0;
    while (i<1) {
      let row = RandomInt(0,4);
      let col = RandomInt(0,4); 
      if (this.board[row][col]!=0)
        continue;
      let num = Math.random() < 0.9 ? 2 : 4;
      this.board[row][col]=num; 
      i++;
    }
  }

  ThereIsPossibleMove() {
    if(this.FreeTiles()!=0){
      return true;
    }
    for (let i = 0; i < 4; i++){
      for (let j = 0; j < 4; j++){
        let neighbours = GetNeighbours(this.board,i,j);
        // there is a case with two same numbers and 1 or 2 empty places
        // in between them, but that will be captures by empty place check
        for (let k = 0; k < neighbours.length; k++)
          if (neighbours[k]==this.board[i][j])
            return true;
      }
    }
    return false;
  }
  
  NewBoard() {
    let board = [[0,0,0,0],
                 [0,0,0,0],
                 [0,0,0,0],
                 [0,0,0,0]];
    return board;
  }

  FreeTiles() {
    let count = 0;
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++)
        if (this.board[i][j]===0)
          count++;
    return count;
  }
}
