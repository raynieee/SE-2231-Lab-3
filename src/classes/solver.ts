import Board from "./board";
import SearchNode from "./searchNode";
import { MinHeap } from "min-heap-typed";

class Solver {
  // find a solution to the initial board (using the A* algorithm)
  initial: Board | null;
  private openList: MinHeap<SearchNode>;
  private twinOpenList: MinHeap<SearchNode>;
  private closedList: Map<string, SearchNode>;

  constructor(initial: Board) {
    this.initial = initial;
    this.openList = new MinHeap<SearchNode>([], {
      comparator: (a, b) => a.manhattanPriority() - b.manhattanPriority(),
    });
    this.twinOpenList = new MinHeap<SearchNode>([], {
      comparator: (a, b) => a.manhattanPriority() - b.manhattanPriority(),
    });
    this.closedList = new Map();

    // Add the initial search node to the open list
    const initialSearchNode = new SearchNode(initial, 0, null);
    this.openList.add(initialSearchNode);

    // Create and add the twin node to the twin open list
    const twinBoard = initial.twin();
    const twinSearchNode = new SearchNode(twinBoard, 0, null);
    this.twinOpenList.add(twinSearchNode);
  }

  // is the initial board solvable? (see below)
  isSolvable(): boolean {
    const dimension = this.initial!.dimension();
    const tiles = this.initial!.tiles.flat();

    let inversionCount = 0;
    let blanks = 0;

    for (let i = 0; i < dimension * dimension; i++) {
      if (tiles[i] === 0) {
        blanks++;
        continue;
      }

      for (let j = i + 1; j < dimension * dimension; j++) {
        if (tiles[j] === 0) {
          continue;
        }

        if (tiles[i] > tiles[j]) {
          inversionCount++;
        }
      }
    }

    if (dimension % 2 === 1) {
      return inversionCount % 2 === 0;
    } else {
      return (inversionCount + blanks) % 2 === 1;
    }
  }

  // min number of moves to solve initial board; -1 if unsolvable
  moves() {
    const solution = this.solution();
    if (solution && solution.length > 0) {
      return solution.length - 1;
    } else return -1;
  }


  // sequence of boards in a shortest solution; null if unsolvable
  solution(): Board[] | null {
    // Search for a node whose board is in the goal state
    const queue = new MinHeap<SearchNode>([], {
      comparator: (a, b) => a.manhattanPriority() - b.manhattanPriority(),
    });
    const initialSearchNode = new SearchNode(this.initial!, 0, null);
    queue.add(initialSearchNode);

    const visited = new Set<string>();

    while(!queue.isEmpty()) {
      const currentNode = queue.poll();
      if (!currentNode) {
        throw new Error('Queue is empty');
      }

      const currentBoard = currentNode.getBoard();

      if (currentBoard.isGoal()) {
        const solution: Board[] = [];
        let node: SearchNode | null = currentNode;
        while (node !== null) {
          solution.unshift(node.getBoard());
          node = node.previousSearchNode;
        }
        return solution;
      }
      visited.add(currentBoard.toString());
      const neighbors = currentNode.neighbors();
      for (const neighbor of neighbors) {
        const neighborNode = new SearchNode(neighbor, currentNode.moves + 1, currentNode);
        if (!visited.has(neighbor.toStrings())) {
          queue.add(neighborNode);
        }
      }
    }
    return null;
  }
}

export default Solver;