import Board from "./board";

class SearchNode {
  board: Board
  moves: number
  previousSearchNode: SearchNode | null;

  constructor(
    board: Board,
    moves: number,
    previousSearchNode: SearchNode | null = null
  ) {
    this.board = board;
    this.moves = moves;
    this.previousSearchNode = previousSearchNode;
  }

  manhattanPriority(): number {
    return this.moves + this.board.manhattan();
  }

  hammingPriority(): number {
    return this.moves + this.board.hamming();
  }

  priority(): number {
    return this.manhattanPriority();
  }

  getBoard(): Board {
    return this.board;
  }

  neighbors(): Board[] {
    return this.board.neighbors();
  }

  displayBoard() {
    return this.board.displayBoard();
  }
}

export default SearchNode;