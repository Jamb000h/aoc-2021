import { getLines } from "../utils";

export const parseInputForDay = (file: string) => {
  const lines = getLines(file);
  const folds = lines.slice(lines.findIndex((line) => line.length === 0) + 1);
  const dots = lines.slice(
    0,
    lines.findIndex((line) => line.length === 0)
  );
  return [dots, folds];
};

type Fold = [string, number];
type Dots = {
  [key: string]: boolean;
};

const parseFold = (fold: string): Fold => {
  const parts = fold.split(" ")[2].split("=");
  return [parts[0], Number(parts[1])];
};

const foldY = (dots: Dots, foldY: number) => {
  Object.keys(dots).forEach((key) => {
    const [x, y] = key.split(",").map(Number);
    if (y > foldY) {
      const newY = foldY - (y - foldY);
      dots[`${x},${newY}`] = true;
      delete dots[key];
    }
  });
};

const foldX = (dots: Dots, foldX: number) => {
  Object.keys(dots).forEach((key) => {
    const [x, y] = key.split(",").map(Number);
    if (x > foldX) {
      const newX = foldX - (x - foldX);
      dots[`${newX},${y}`] = true;
      delete dots[key];
    }
  });
};

const fold = (dots: Dots, fold: Fold) => {
  if (fold[0] === "y") foldY(dots, fold[1]);
  else foldX(dots, fold[1]);
};

const getMax = (dots: Dots) => {
  let maxX = -Infinity;
  let maxY = -Infinity;

  Object.keys(dots).forEach((key) => {
    const [x, y] = key.split(",").map(Number);
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;
  });

  return [maxX, maxY];
};

export const task1 = (input: any) => {
  const [dots, folds] = input;
  const dotsO = dots.reduce((prev, cur) => ({ ...prev, [cur]: true }), {});
  const parsedFolds = folds.map(parseFold);
  const firstFold = parsedFolds[0];
  fold(dotsO, firstFold);
  return Object.keys(dotsO).length;
};

export const task2 = (input: any) => {
  const [dots, folds] = input;
  const dotsO = dots.reduce((prev, cur) => ({ ...prev, [cur]: true }), {});
  const parsedFolds = folds.map(parseFold);
  parsedFolds.forEach((parsedFold) => fold(dotsO, parsedFold));
  const [maxX, maxY] = getMax(dotsO);
  const output = [];
  for (let y = 0; y <= maxY; y++) {
    let row = "";
    for (let x = 0; x <= maxX; x++) {
      if (Object.keys(dotsO).some((key) => key === `${x},${y}`)) {
        row += "#";
      } else {
        row += " ";
      }
    }
    output.push(row);
  }
  return output;
};
