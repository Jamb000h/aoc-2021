import { sumOf } from "../utils";

const iterate = (times: number, input: number[]): number => {
  const newFishesForDay = new Array(9).fill(0);
  input.forEach((f) => (newFishesForDay[f] += 1));
  for (let i = 0; i < times; i++) {
    const dailyFishes = newFishesForDay.shift();
    newFishesForDay[6] += dailyFishes; // Existing
    newFishesForDay.push(dailyFishes); // Newborn
  }
  return sumOf(newFishesForDay);
};

export const parseInputForDay = (file: string) => {
  return file.split(",").map(Number);
};

export const task1 = (input: number[]) => iterate(80, input);

export const task2 = (input: number[]) => iterate(256, input);
