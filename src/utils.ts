import { readFileSync } from "fs";

export const readLinesToArray = (filename: string) => {
  return readFileSync(filename, "utf-8").trim().split("\r\n");
};

export const readFile = (filename: string) => {
  return readFileSync(filename, "utf-8").trim();
};

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
