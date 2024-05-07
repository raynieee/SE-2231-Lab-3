import Solver from "./classes/solver";
import Board from "./classes/board";
import { readFileSync } from "fs";

const fileName: string = process.argv[2]; //argument smth

const lines: string[] = readFileSync(`./puzzles/${fileName}`, "utf8").split(
    "\n"
);
const n: number = parseInt(lines[0]);
const tiles: number[][] = Array(n).fill(Array(n));

lines.forEach((line, row) => {
    if (row === 0) {
        return;
    }

    const nums = line
        .split(" ")
        .map((s) => parseInt(s))
        .filter((x) => !isNaN(x));

    if (nums.length === 0) {
        return;
    }

    tiles[row - 1] = nums;
});

const initial: Board = new Board(tiles);

// solve the puzzle
const solver: Solver = new Solver(initial);

// print solution to standard output
if (!solver.isSolvable()) {
    console.log("No solution possible");
} else {
    console.log("Minimum number of moves = " + solver.moves());
    const solution = solver.solution()

    if (solution) {
        for (let board of solution) {
            console.log(board.displayBoard());
        }
    }
}
