/*
Some things to note: player one is going downwards/horizontal. The board numbering is as reading in English works.
*/

class Fences {
  boardState = [];
  boardLength = 0;

  constructor(boardSize) {
    this.boardLength = boardSize;
    // Create correct boardsive
    this.boardState.length = boardSize * boardSize;
    this.boardState.fill(0);
  }

  init() {
  }

  hasWon() {

  }

  play(player, boardLocation) {
    if(isValidMove) {
      this.boardState[boardLocation] = player;
    }
  }

  isValidMove(boardLocation) {
    return this.boardState[boardLocation] === 0 
  }

}

var fences = new Fences(5);
