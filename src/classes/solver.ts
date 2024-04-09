import Board from "./board";
import SearchNode from "./searchNode";
import { MinHeap } from "min-heap-typed";

class Solver {
  // find a solution to the initial board (using the A* algorithm)
  private initial: Board;
  private openList: MinHeap<SearchNode>;
  private closedList: Map<string, SearchNode>;

  constructor(initial: Board) {
    this.initial = initial;
    this.openList = new MinHeap<SearchNode>([], {
      comparator: (a, b) => a.manhattanPriority() - b.manhattanPriority(),
    });
    this.closedList = new Map();

    // add the initial search node to the open list
    const initialSearchNode = new SearchNode(initial, 0, null);
    this.openList.add(initialSearchNode);
  }

  // is the initial board solvable? (see below)
  isSolvable(): boolean {
    const dimension = this.initial.dimension(); // puzzle dimension
    const tiles = this.initial.getTiles(); // retrieve the 2D array representing the tiles

    let inversions = 0;
    let blankRow = 0;

    // find the blank tile's row
    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {
        if (tiles[i][j] === 0) {
          blankRow = i;
          break;
        }
      }
    }

    // count inversions
    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {
        if (tiles[i][j] !== 0) {
          for (let k = j + 1; k < dimension; k++) {
            if (tiles[i][k] !== 0 && tiles[i][j] > tiles[i][k]) {
              inversions++;
            }
          }
        }
      }
    }
    
    // grid width = odd, return true if inversion count even,
    // grid width = even, return true if blank is on even row and inversion count odd
    if (dimension % 2 === 0) {
      return (blankRow % 2 === 0) === (inversions % 2 === 0);
    } else {
      return inversions % 2 === 0;
    }
  }

  // min number of moves to solve initial board; -1 if unsolvable
  moves(): number {
    if (!this.isSolvable()) {
      return -1;
    }

    while (!this.openList.isEmpty()) {
      let currentNode = this.openList.poll(); // dequeue node with smallest priority

      if (currentNode) {
        if (currentNode.board.isGoal()) {
          // if the dequeued node is the goal, we've found the solution
          return currentNode.moves;
        }

        this.closedList.set(currentNode.board.toString(), currentNode);

        for (let neighbor of currentNode.board.neighbors()) {
          if (!this.closedList.has(neighbor.toString())) {
            this.openList.add(
              new SearchNode(neighbor, currentNode.moves + 1, currentNode)
            );
          }
        }
      }
    }
    // If no solution was found, return -1
    return -1;
  }

  // sequence of boards in a shortest solution; null if unsolvable
  solution(): SearchNode[] | null {
    let solvedNode = this.closedList.get(this.initial.toString());

    if (!solvedNode) {
      return null;
    }

    // if a solution was found, reconstruct the path from the initial board to the goal
    const solutionPath: SearchNode[] = [];
    let currentNode: SearchNode | null = solvedNode;
    while (currentNode) {
      solutionPath.unshift(currentNode);
      currentNode = currentNode.previousSearchNode;
    }
    return solutionPath;
  }
}

export default Solver;
