class Board {
  private tiles: number[][];  // create a board from an n-by-n array of tiles,
  private n: number;  // where tiles[row][col] = tile at (row, col)

  constructor(tiles: number[][]) {
    this.n = tiles.length;
    this.tiles = tiles.map((row) => [...row]);
    // creates a copy of the tiles array, ensures modifications made to copied array don't affect original array
  }

  displayBoard(): string {
    let boardRep = "";  // string representation of this board
    for (let i = 0; i < this.n; i++) {  // iteration over the rows
      for (let j = 0; j < this.n; j++) {  // iteration over the columns
        boardRep += this.tiles[i][j] + " ";  // tiles numbered from 1 to n^2 - 1, places a space after each num
      }
      boardRep += "\n";  // next line after iterating through n columns
    }
    return boardRep;
  }

  dimension(): number {
    return this.n;
  }

  hamming(): number {  // number of tiles out of place
    let count = 0;
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        let goalPlacement = i * this.n + j + 1;
        if (goalPlacement === this.n * this.n) {
          goalPlacement = 0; // for the last tile
        }
        if (this.tiles[i][j] !== goalPlacement) {
          count++;
        }
      }
    }
    let finalCount = 0;
    if (this.tiles[this.n - 1][this.n - 1] === 0) {
      finalCount = count - 1; // minus one if blank space is in the goal position
    } else {
      finalCount = count; // otherwise, this
    }
    return finalCount;
  }

  // sum of Manhattan distances between tiles and goal
  manhattan(): number {
    let manhattanDistance = 0;
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        const expectedRow = Math.floor((this.tiles[i][j] - 1) / this.n); // Calculate the expected position of the tile in the goal state
        const expectedCol = (this.tiles[i][j] - 1) % this.n; // Calculate the Manhattan distance for this tile
        manhattanDistance += Math.abs(i - expectedRow) + Math.abs(j - expectedCol);
      }
    }
    return manhattanDistance;
  }

  isGoal(): boolean {
    // is this board the goal board?
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.tiles[i][j] !== 0 && this.tiles[i][j] !== i * this.n + j + 1) {
          return false; // if tiles are not in correct position
        }
      }
    }
    return true; // if tiles are in correct position
  }

  equals(y: Board): boolean {
    // does this board equal y?
    if (y.n !== this.n) {
      return false; // not of same dimension, therefore automatic unequal
    }

    for (let i = 0; i < this.n; i++) {
      // rows
      for (let j = 0; j < this.n; j++) {
        // columns
        if (this.tiles[i][j] !== y.tiles[i][j]) {
          return false; // if tiles in current board don't match with y
        }
      }
    }
    return true; // if current board is equal to y
  }

  // all neighboring boards
  neighbors(): Board[] {
    let neighbors: Board[] = [];
    for (let i = 0; i < this.n; i++) { // rows of the board
      for (let j = 0; j < this.n; j++) { // columns of the board
        if (this.tiles[i][j] === 0) { // check the current tile at (i, j) neighboring tiles
          if (i > 0) { // if the current tile is not in the first row
            neighbors.push(this.swapTiles(i , j, i - 1, j)); // swap current tile with the tile above it ex. 4,0,5 -> 0, 4, 5
          }
          if (i < this.n - 1) { // if the current tile is not in the last row
            neighbors.push(this.swapTiles(i, j, i + 1, j)); // swap current tile with the tile below it ex. 4, 0, 5 -> 4, 5, 0
          }
          if (j > 0) { // if current tile is not in the first column
            neighbors.push(this.swapTiles(i, j, i, j - 1)); // swap current tile with the tile to the left
          }
          if (j < this.n - 1) { // if current tile is not in the last column
            neighbors.push(this.swapTiles(i, j, i, j + 1)); // swap current tile with the tile to the right
          }
        }
      }
    }
    return neighbors;
  }

  private swapTiles(row1: number, col1: number, row2: number, col2: number): Board {
    let newTiles = this.tiles.map(row => [...row]);
    [newTiles[row1][col1], newTiles[row2][col2]] = [newTiles[row2][col2], newTiles[row1][col1]];
    return new Board(newTiles);
  }

  // a board that is obtained by exchanging any pair of tiles
  twin(): Board {
    // PLS MODIFY
    return new Board([[]]);
  }
}

export default Board;
