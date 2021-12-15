import { getLines, neighbors2D } from "../utils";
import { PriorityQueue } from "./PriorityQueue";

export const parseInputForDay = (file: string) => {
  return getLines(file).map((x) => x.split("").map(Number));
};

const dijkstra = (grid: number[][], scale = 1): number => {
  const visited: { [key: string]: boolean } = {};
  // risk totals
  const distances: { [key: string]: number } = {};
  const parents: { [key: string]: string } = {};
  const start = { x: 0, y: 0, priority: 0 };
  const finish = {
    x: grid[grid.length - 1].length * scale - 1,
    y: grid.length * scale - 1,
  };
  const queue = new PriorityQueue();

  // Add start node to bookkeeping and Priority Queue
  queue.push(start.x, start.y, start.priority);
  parents[`${start.y}-${start.x}`] = `${start.y}-${start.x}`;
  distances[`${start.y}-${start.x}`] = 0;

  while (!queue.isEmpty()) {
    // Get the desired value and parse a key to use with bookkeeping
    const current = queue.pop();
    const currentKey = `${current.y}-${current.x}`;

    if (visited[currentKey]) continue;
    visited[currentKey] = true;

    // If we reached finish node, calculate and return route
    if (current.x === finish.x && current.y === finish.y) {
      return current.priority;
    }

    const validNeighbors = neighbors2D(
      current.y,
      current.x,
      grid,
      false,
      scale
    );

    // Go through all valid directions and if this route is faster than the previous one,
    // mark this as the fastest route by updating bookkeeping
    for (let i = 0; i < validNeighbors.length; i++) {
      const [neighborY, neighborX] = validNeighbors[i];
      const neighborKey = `${neighborY}-${neighborX}`;
      const distance = distances[neighborKey] || Infinity;
      const baseY = neighborY % grid.length;
      const baseX = neighborX % grid[baseY].length;
      const baseValue = grid[baseY][baseX];
      const yMultiplier = Math.floor(neighborY / grid.length);
      const xMultiplier = Math.floor(neighborX / grid[baseY].length);
      const modifiedValue = baseValue + yMultiplier + xMultiplier;
      const actualValue =
        modifiedValue <= 9 ? modifiedValue : modifiedValue % 9;

      const newDistance = current.priority + actualValue;

      if (!visited[neighborKey] && newDistance < distance) {
        distances[neighborKey] = newDistance;
        parents[neighborKey] = currentKey;
        queue.push(neighborX, neighborY, newDistance);
      }
    }
  }

  return -1;
};

export const task1 = (input: number[][]) => {
  return dijkstra(input);
};

export const task2 = (input: number[][]) => {
  return dijkstra(input, 5);
};
