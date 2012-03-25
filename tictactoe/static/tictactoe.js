var TicTacToe = {
    turn: "O",
    board: ["", "", "", "", "", "", "", "", "", ""],
    win: false,
    
    /* Clears and starts a new game with a new board */
    startGame: function() {
      // Draw the board
      var board_table =
'<table class="board" border="0px" cellpadding="0px" cellspacing="0px" align="center"><tr><td id="ttt0">&nbsp;</td><td id="ttt1">&nbsp;</td><td id="ttt2">&nbsp;</td></tr><tr><td id="ttt3">&nbsp;</td><td id="ttt4">&nbsp;</td><td id="ttt5">&nbsp;</td></tr><tr><td id="ttt6">&nbsp;</td><td id="ttt7">&nbsp;</td><td id="ttt8">&nbsp;</td></tr></table>';
      $("#board").html(board_table);
      $("#menu").hide();
      
      // clear the board
      this.board = ["", "", "", "", "", "", "", "", "", ""];
      
      // Adds the event for clicking a cell
      $("#board td").click(function(e) {
          TicTacToe.move( e.target.id );
         });

    },

    move: function(id) {
      var space = $("#" + id); //The id of the space where the move was made
      var num = id.replace("ttt", ""); //The index in the array for the space
    
      if (!this.board[num] && !this.win) {
        space.html( this.turn );
        this.board[num] = this.turn;
        this.nextTurn();  // End turn
      } 
    },

    nextTurn: function() {
      this.turn = (this.turn == "O") ? "X" : "O";
      this.win = this.checkForWin();
      if (this.win) {
          this.endGame();
      } else if (this.turn == "X") {
          this.makeRandomMove();
      }
    },

    /*This function creates a random index and tries to move there. If
      the cell is taken, it tries subsequent cells until it finds an empty one*/
    makeRandomMove: function() {
      var rdnCell = Math.floor(Math.random()*9); //random number between 0 and 8
      while (this.board[rdnCell]) {
          rdnCell = (rdnCell + 1) % 9;
      }
      this.move("ttt" + rdnCell);
    },

   /*If I have more time, I will impliment some asynchronous communication
     with Ajax to do this more securely. Right now, it increments the
     user's win count by sending a get request to the /increment/ url.*/
    endGame: function() {
    
      if (this.win == "Tie") {
          $("#menu").html("Tie Game.");
      } else if (this.win == "You lose!") {
          $("#menu").html(this.win);
          $("#menu").append("<br><a id='play_again' href='/main/'>Play Again?</a>");
      } else {
          $("#menu").html(this.win); 
          $("#menu").append("<br><a id='play_again' href='/increment/'>Play Again?</a>");
      }

      $("#menu").show();
      this.win = false;
    
    },

    // If any of these patterns of board spaces have all X's or all O's somebody won!
    wins: [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]],
    
    /* Check for whether someone won the game of it was a Tie game. */
    checkForWin: function() {
        
      // Loop through all possible winning combinations 
      for (k in this.wins){
        var pattern = this.wins[k];
        var p = this.board[pattern[0]] + this.board[pattern[1]] + this.board[pattern[2]];
        if (p == "XXX") {
          return "You lose!";  // X Won!
        } else if (p == "OOO") {
          return "You win!";  // O Won!
        }
      }
      
      // Check if all spaces in the board are filled, then its a Tie game
      var count = 0;
      for (s in this.board) {
        if (this.board[s]) { count+=1; }
      }
      if (count == 9) { 
        return "Tie";  // Tie game!
      }
  }
};

$(document).ready(function() {
    
    // Start a game!
    TicTacToe.startGame();
});
