import { getLines, neighbors2D } from "../utils";

export const parseInputForDay = (file: string) => {
  return getLines(file).map((x) => x.split("").map(Number));
};

const step = (octopuses: number[][]): number => {
  let flashes = 0;

  // Increase every octopus by 1
  for (let y = 0; y < octopuses.length; y++) {
    for (let x = 0; x < octopuses[y].length; x++) {
      octopuses[y][x] += 1;
    }
  }

  // Flashes!!
  while (true) {
    let flashesThisIteration = false;

    for (let y = 0; y < octopuses.length; y++) {
      for (let x = 0; x < octopuses[y].length; x++) {
        if (octopuses[y][x] > 9) {
          const neighbors = neighbors2D(y, x, octopuses);
          neighbors.forEach(([ny, nx]) => {
            if (octopuses[ny][nx] > 0) {
              octopuses[ny][nx] += 1;
            }
          });
          // This one has no energy anymore
          octopuses[y][x] = 0;
          flashesThisIteration = true;
          flashes++;
        }
      }
    }

    if (!flashesThisIteration) {
      return flashes;
    }
  }
};

export const task1 = (input: number[][]) => {
  let flashes = 0;
  for (let i = 0; i < 100; i++) {
    flashes += step(input);
  }
  return flashes;
};

export const task2 = (input: number[][]) => {
  const size = input.length * input[0].length;
  let i = 0;
  while (true) {
    i++;
    if (step(input) === size) {
      return i;
    }
  }
};
