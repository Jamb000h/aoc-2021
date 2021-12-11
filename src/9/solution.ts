import {
  getLines,
  sumOf,
  productOf,
  neighbors2D,
  generateEmptyVisited,
  bfs,
} from "../utils";

export const parseInputForDay = (file: string) => {
  return getLines(file).map((line) => line.split("").map(Number));
};

export const task1 = (input: number[][]) => {
  const lowPoints = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const neighbors = neighbors2D(y, x, input, false);
      const isLow = neighbors.every(([ny, nx]) => input[ny][nx] > input[y][x]);
      if (isLow) {
        lowPoints.push(input[y][x]);
      }
    }
  }
  const riskLevels = lowPoints.map((x) => x + 1);
  const sumOfRiskLevels = sumOf(riskLevels);

  return sumOfRiskLevels;
};

export const task2 = (input: any) => {
  const visited = generateEmptyVisited(input);
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === 9) {
        visited[y][x] = true;
      }
    }
  }

  const basinSizes = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (visited[y][x]) continue;
      basinSizes.push(bfs(y, x, input, visited, false).V.length);
    }
  }
  return productOf(basinSizes.sortDescending().take(3));
};
