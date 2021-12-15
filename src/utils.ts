export const getLines = (file: string): string[] => file.split("\r\n");

export const sumOf = (numbers: number[]) => {
  return numbers.reduce((x, y) => x + y, 0);
};

export const productOf = (numbers: number[]) => {
  return numbers.reduce((x, y) => x * y, 1);
};

export const averageOf = (numbers: number[], floor = false) => {
  const avg = numbers.reduce((prev, cur) => prev + cur, 0) / numbers.length;
  return floor ? Math.floor(avg) : Math.round(avg);
};

export const inBounds2D = (y: number, x: number, grid: any[][], scale = 1) => {
  return (
    y >= 0 &&
    x >= 0 &&
    y < grid.length * scale &&
    x < grid[y % scale].length * scale
  );
};

export const inBounds3D = (
  y: number,
  x: number,
  z: number,
  grid: any[][][]
) => {
  return (
    y >= 0 &&
    x >= 0 &&
    z >= 0 &&
    y < grid.length &&
    x < grid[y].length &&
    z < grid[y][x].length
  );
};

export const neighbors2D = (
  y: number,
  x: number,
  grid: any[][],
  diagonal: boolean = true,
  scale = 1
): number[][] => {
  const neighbors = [];
  for (let ny = y - 1; ny <= y + 1; ny++) {
    for (let nx = x - 1; nx <= x + 1; nx++) {
      if (ny === y && nx === x) continue;
      if (!diagonal && ny !== y && nx !== x) continue;
      if (inBounds2D(ny, nx, grid, scale)) {
        neighbors.push([ny, nx]);
      }
    }
  }
  return neighbors;
};

export const neighbors3D = (
  y: number,
  x: number,
  z: number,
  grid: any[][][]
): number[][] => {
  const neighbors = [];
  for (let ny = y - 1; ny <= y + 1; ny++) {
    for (let nx = x - 1; nx <= x + 1; nx++) {
      for (let nz = z - 1; nz <= z + 1; nz++) {
        if (ny === y && nx === x && nz === z) continue;
        if (inBounds3D(ny, nx, nz, grid)) {
          neighbors.push([ny, nx, nz]);
        }
      }
    }
  }
  return neighbors;
};

export const generateEmptyVisited = (grid: any[][]): boolean[][] => {
  const visited = [];
  for (let y = 0; y < grid.length; y++) {
    visited.push([]);
    for (let x = 0; x < grid[y].length; x++) {
      visited[y].push(false);
    }
  }

  return visited;
};

export const bfs = (
  y: number,
  x: number,
  grid: any[][],
  visited: boolean[][],
  diagonal = true,
  predicate?: (y: number, x: number, grid: any[][]) => any
) => {
  const V = [];
  let target = null;
  const queue = [[y, x]];
  while (queue.length > 0) {
    const [currentY, currentX] = queue.shift();
    if (visited[currentY][currentX]) continue;
    visited[currentY][currentX] = true;

    // Collect visited vertices for problems that require reachable area
    V.push([currentY, currentX]);

    // Early break for problems that have a defined target
    if (!!predicate && predicate(currentY, currentX, grid)) {
      target = [currentY, currentX];
      break;
    }

    const neighbors = neighbors2D(currentY, currentX, grid, diagonal);
    neighbors.forEach((n) => queue.push(n));
  }
  return {
    V,
    target,
  };
};

declare global {
  interface Array<T> {
    sortAscending(): Array<T>;
    sortDescending(): Array<T>;
    take(n: number): Array<T>;
  }
}

Array.prototype.sortAscending = function () {
  return this.sort((a, b) => a - b);
};

Array.prototype.sortDescending = function () {
  return this.sort((a, b) => b - a);
};

Array.prototype.take = function (n: number) {
  return this.slice(0, n);
};
