import { getLines } from "../utils";

export const parseInputForDay = (file: string) => {
  return getLines(file).map(Number);
};

export const task1 = (input: number[]) =>
  input.filter((v, i) => {
    if (i == 0) return false;
    if (v > input[i - 1]) return true;
    return false;
  }).length;

export const task2 = (input: number[]) =>
  task1(
    input.reduce((prev, cur, i) => {
      if (i < 2) return [];
      const w = input[i - 2] + input[i - 1] + cur;
      return [...prev, w];
    }, [])
  );
