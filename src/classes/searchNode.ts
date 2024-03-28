import Board from "./board";
import { MinHeap } from "min-heap-typed";

class SearchNode {
  //board: Board
  moves: number
  previousSearchNode: SearchNode | null;

  constructor(board: Board, moves: number, previousSearchNode: SearchNode | null = null) {
    //this.board = board
    this.moves = moves
    this.previousSearchNode = previousSearchNode
  }

  priority(): number {
    return this.moves; //+ this.board.hamming
  }
}

const heap = new MinHeap<SearchNode>([], {comparator: (a, b) => a.priority() - b.priority()});

// const node1 = new SearchNode(13);
// const node2 = new SearchNode(15);
// const node3 = new SearchNode(8);

// heap.add(node1);
// heap.add(node2);
// heap.add(node3);

console.log(heap.poll());
console.log(heap.peek());