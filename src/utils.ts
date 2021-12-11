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

export const inBounds2D = (y: number, x: number, grid: any[][]) => {
  return y >= 0 && x >= 0 && y < grid.length && x < grid[y].length;
};

export const neighbors2D = (
  y: number,
  x: number,
  grid: any[][],
  diagonal = true
) => {
  const neighbors = [];
  for (let ny = y - 1; ny <= y + 1; ny++) {
    for (let nx = x - 1; nx <= x + 1; nx++) {
      if (ny === y && nx === x) continue;
      if (!diagonal && ny !== y && nx !== x) continue;
      if (inBounds2D(ny, nx, grid)) {
        neighbors.push([ny, nx]);
      }
    }
  }
  return neighbors;
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
