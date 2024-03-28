class Board {
  private tiles: number[][];  // create a board from an n-by-n array of tiles,
  private n: number;  // where tiles[row][col] = tile at (row, col)

  constructor(tiles: number[][]) {
    this.n = tiles.length;
    this.tiles = tiles.map((row) => [...row]);  
    // creates a copy of the tiles array, ensures modifications made to copied array don't affect original array
  }

  toString(): string {
    let boardRep = "";  // string representation of this board
    for (let i = 0; i < this.n; i++) {  // iteration over the rows
      for (let j = 0; j < this.n; j++) {  // iteration over the columns
        boardRep += this.tiles[i][j] + ' ';  // tiles numbered from 1 to n^2 - 1, places a space after each num
      }
      boardRep += '\n';  // next line after iterating through n columns
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
        if (this.tiles[i][j] !== i * this.n + j + 1) {
          count++;
        }
      }
    }
    return count;
  }

  // sum of Manhattan distances between tiles and goal
  manhattan(): number {
    // PLS MODIFY
    return 0;
  }

  // is this board the goal board?
  isGoal(): boolean {
    // PLS MODIFY
    return true;
  }

  // does this board equal y?
  equals(y: Board): boolean {
    // PLS MODIFY
    return true;
  }

  // all neighboring boards
  neighbors(): Board[] {
    // PLS MODIFY
    return [];
  }

  // a board that is obtained by exchanging any pair of tiles
  twin(): Board {
    // PLS MODIFY
    return new Board([[]]);
  }
}

export default Board;
