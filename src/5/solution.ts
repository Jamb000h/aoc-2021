import { getLines } from "../utils";

type Line = { x1: number; x2: number; y1: number; y2: number };
type PointKey = string;
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

const pointKey = (p: Point): PointKey => `${p[0]}-${p[1]}`;

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
  let x = line.x1;
  let y = line.y1;

  while (true) {
    points.push([x, y]);
    x += x < line.x2 ? 1 : -1;
    y += y < line.y2 ? 1 : -1;

    if (x === line.x2 && y === line.y2) {
      points.push([x, y]);
      break;
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

const coverage = (linePoints: PointKey[]) => {
  const coveredPoints = {};
  for (const lp of linePoints) {
    if (!coveredPoints.hasOwnProperty(lp)) {
      coveredPoints[lp] = 0;
    }
    coveredPoints[lp] = coveredPoints[lp] + 1;
  }
  return coveredPoints;
};

const overlappingPoints = (coveredPoints: any) =>
  Object.values(coveredPoints).filter((x) => x >= 2);

export const parseInputForDay = (file: string) => {
  return getLines(file);
};

export const task1 = (input: string[]) => {
  const lines = parseLines(input);
  let linePoints = lines
    .filter((x) => !isDiagonal(x))
    .map(getCoveredPointsForLine)
    .flat()
    .map(pointKey);

  const overlaps = overlappingPoints(coverage(linePoints));
  return overlaps.length;
};

export const task2 = (input: string[]) => {
  const lines = parseLines(input);
  const linePoints = lines.map(getCoveredPointsForLine).flat().map(pointKey);

  const overlaps = overlappingPoints(coverage(linePoints));
  return overlaps.length;
};
