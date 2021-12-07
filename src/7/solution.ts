import * as path from "path";
import { readFile } from "../utils";

const task1 = (input: number[]) => {
  const max = Math.max(...input);
  const positions = new Array(max).fill(0);
  input.forEach((c) => {
    positions.forEach((_, i) => {
      positions[i] += Math.abs(c - i);
    });
  });
  return Math.min(...positions);
};

const task2 = (input: number[]) => {
  const max = Math.max(...input);
  const positions = new Array(max).fill(0);
  input.forEach((c) => {
    positions.forEach((_, i) => {
      const diff = Math.abs(c - i);
      positions[i] += (diff * (1 + diff)) / 2;
    });
  });
  return Math.min(...positions);
};

const input = readFile(path.join(__dirname, "input.txt"))
  .split(",")
  .map(Number);
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
