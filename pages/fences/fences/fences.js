/*
Some things to note: player one is going downwards/horizontal. The board numbering is as reading in English works.
*/

class Fences {
  boardState = [];
  boardLength = 0;

  constructor(boardSize) {
    this.boardLength = boardSize;
    // Create correct boardsive
    this.boardState.length = (boardSize ** 2) + ((boardSize - 1) ** 2 );
    this.boardState.fill(0);
  }

  init() {
  }

   

  hasWon(boardLayout) {
    //console.log(boardLayout);
    //console.log((boardLayout >>> 0).toString(2));

    //let ret = (boardLayout << 3) | (boardLayout << 2);

    //let ret = (across << 1) | (across >>> 1) | across;

    //console.log((ret >>> 0).toString(2));

    var i;
    for (i = this.boardLength; i < this.boardState.length; i++) {


      // TODO replace this with a splice and AND
      if( i % 5 == 0 ) {
         
        //check if any become live on the next level
        //remove others
        let shouldContinue = 0;

        for (let j = 0; j < this.boardLength; j++) {
          let currentLocation = i + j;
          let backLocation = (i - (this.boardLength + (this.boardLength - 1 ))) + j;

          this.boardState[currentLocation] = this.boardState[currentLocation] * this.boardState[backLocation];

          if(this.boardState[currentLocation] > 0){
            shouldContinue = 1;
          }
        }

        if( shouldContinue === 0 ) {
          return false; 
        }

        i = i + 2;
        continue;
      }




      if ((this.boardState[i] * this.boardState[i - 3]) > 0) {
        this.boardState[i - 2] = 1;
      }

      if ((this.boardState[i] * this.boardState[i - 2]) > 0) {
        this.boardState[i - 3] = 1;
      }

    }

    return true;
  }

  play(player, boardLocation) {
    if(this.isValidMove(boardLocation)) {
      this.boardState[boardLocation] = player;
    }
  }

  isValidMove(boardLocation) {
    return this.boardState[boardLocation] === 0 
  }

}

var fences = new Fences(3);
