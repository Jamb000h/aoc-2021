import { kStringMaxLength } from "buffer";
import * as path from "path";
import { readLinesToArray } from "../utils";

type Line = { x1: number; x2: number; y1: number; y2: number };
type Point = [number, number]; // [x, y]

const toLine = (input: string): Line => {
  const n = input.replace(" -> ", ",").split(",").map(Number);
  return {
    x1: n[0],
    y1: n[1],
    x2: n[2],
    y2: n[3],
  };
};

const parseLines = (input: string[]): Line[] => {
  return input.map(toLine);
};

const pointKey = (p: Point) => `${p[0]}-${p[1]}`;

const isDiagonal = (line: Line): boolean =>
  line.x1 !== line.x2 && line.y1 !== line.y2;

const isHorizontal = (line: Line): boolean => line.y1 === line.y2;

const isVertical = (line: Line): boolean => line.x1 === line.x2;

const horizontalPoints = (line: Line): Point[] => {
  const points = [];
  const [start, finish] =
    line.x1 < line.x2 ? [line.x1, line.x2] : [line.x2, line.x1];
  for (let i = start; i <= finish; i++) {
    points.push([i, line.y1]);
  }
  return points;
};

const verticalPoints = (line: Line): Point[] => {
  const points = [];
  const [start, finish] =
    line.y1 < line.y2 ? [line.y1, line.y2] : [line.y2, line.y1];
  for (let i = start; i <= finish; i++) {
    points.push([line.x1, i]);
  }
  return points;
};

const diagonalPoints = (line: Line): Point[] => {
  const points = [];
  let x = line.x1
  let y = line.y1

  while(true) {
    points.push([x, y]);
    if(x < line.x2) {
      x++
    } else {
      x--
    }
    
    if(y < line.y2) {
      y++
    } else {
      y--
    }

    if(x === line.x2 && y === line.y2) {
      points.push([x, y])
      break
    }
  }
  return points;
};

const getCoveredPointsForLine = (line: Line): Point[] => {
  if (isDiagonal(line)) return diagonalPoints(line);
  if (isHorizontal(line)) return horizontalPoints(line);
  if (isVertical(line)) return verticalPoints(line);
  return [];
};

const task1 = (input: string[]) => {
  const lines = parseLines(input);
  let linePoints = lines
    .filter((x) => !isDiagonal(x))
    .map(getCoveredPointsForLine)
    .flat()
    .map(pointKey);
  const coveredPoints = {};
  for (const lp of linePoints) {
    if (!coveredPoints.hasOwnProperty(lp)) {
      coveredPoints[lp] = 0;
    }
    coveredPoints[lp] = coveredPoints[lp] + 1;
  }

  const overlaps = Object.values(coveredPoints).filter((x) => x >= 2);
  return overlaps.length;
};

const task2 = (input: string[]) => {
  const lines = parseLines(input);
  let linePoints = lines
    .map(getCoveredPointsForLine)
    .flat()
    .map(pointKey);
  const coveredPoints = {};
  for (const lp of linePoints) {
    if (!coveredPoints.hasOwnProperty(lp)) {
      coveredPoints[lp] = 0;
    }
    coveredPoints[lp] = coveredPoints[lp] + 1;
  }
  const overlaps = Object.values(coveredPoints).filter((x) => x >= 2);
  return overlaps.length;
};

const input = readLinesToArray(path.join(__dirname, "input.txt"));
const start1 = performance.now();
const result1 = task1(input);
const finish1 = performance.now() - start1;

const start2 = performance.now();
const result2 = task2(input);
const finish2 = performance.now() - start2;

console.log("Task 1 time: ", finish1);
console.log("Task 1 result: ", result1);
console.log("Task 2 time: ", finish2);
console.log("Task 2 result: ", result2);
