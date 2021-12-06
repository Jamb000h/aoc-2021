import * as path from "path";
import { readFile } from "../utils";

const iterate = (times: number, input: number[]): number => {
  const newFishesForDay = new Array(9).fill(0);
  let totalFishes = input.length;
  input.forEach((f) => (newFishesForDay[f] = newFishesForDay[f] + 1));
  for (let i = 0; i < times; i++) {
    const dailyFishes = newFishesForDay.shift();
    newFishesForDay.push(dailyFishes);
    newFishesForDay[6] = newFishesForDay[6] + dailyFishes;
    totalFishes += dailyFishes;
  }
  return totalFishes;
};

const task1 = (input: number[]) => iterate(80, input);

const task2 = (input: number[]) => iterate(256, input);

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
