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
    this.board = board
    this.moves = moves
    this.previousSearchNode = previousSearchNode
  }

  manhattanPriority(): number {
    return this.moves + this.board.manhattan();
  }

  hammingPriority(): number {
    return this.moves + this.board.hamming();
  }
}

export default SearchNode;