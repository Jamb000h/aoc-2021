import { getLines, sumOf, productOf } from "../utils";

export const parseInputForDay = (file: string) => {
  return getLines(file).map((line) => line.split("").map(Number));
};

const getNeighbors = (y: number, x: number, grid: number[][]): number[] => {
  const leftNeighbor = x > 0 ? grid[y][x - 1] : -1;
  const rightNeighbor = x < grid[y].length - 1 ? grid[y][x + 1] : -1;
  const topNeighbor = y > 0 ? grid[y - 1][x] : -1;
  const bottomNeighbor = y < grid.length - 1 ? grid[y + 1][x] : -1;

  return [leftNeighbor, rightNeighbor, topNeighbor, bottomNeighbor].filter(
    (x) => x > -1
  );
};

const getNeighborsAsCoordinates = (
  y: number,
  x: number,
  grid: number[][]
): number[][] => {
  const leftNeighbor = x > 0 ? [y, x - 1] : null;
  const rightNeighbor = x < grid[y].length - 1 ? [y, x + 1] : null;
  const topNeighbor = y > 0 ? [y - 1, x] : null;
  const bottomNeighbor = y < grid.length - 1 ? [y + 1, x] : null;

  return [leftNeighbor, rightNeighbor, topNeighbor, bottomNeighbor].filter(
    (x) => x !== null
  );
};

const traverseBasin = (
  visited: boolean[][],
  grid: number[][],
  y: number,
  x: number
): number => {
  const basin = [];
  // BFS
  const queue = [];
  queue.push([y, x]);
  while (queue.length > 0) {
    const [currentY, currentX] = queue.shift();
    if (visited[currentY][currentX]) continue;
    visited[currentY][currentX] = true;
    basin.push([currentY, currentX]);
    const neighbors = getNeighborsAsCoordinates(currentY, currentX, grid);
    neighbors.forEach((n) => queue.push(n));
  }
  return basin.length;
};

export const task1 = (input: number[][]) => {
  const lowPoints = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const neighbors = getNeighbors(y, x, input);
      const isLow = neighbors.every((n) => n > input[y][x]);
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
  let visited = [];
  for (let y = 0; y < input.length; y++) {
    visited.push([]);
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === 9) {
        visited[y].push(true);
      } else {
        visited[y].push(false);
      }
    }
  }

  const basinSizes = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (visited[y][x]) continue;
      basinSizes.push(traverseBasin(visited, input, y, x));
    }
  }
  return productOf(basinSizes.sortDescending().take(3));
};
