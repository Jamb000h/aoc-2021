import { getLines } from "../utils";

export const parseInputForDay = (file: string) => {
  return getLines(file);
};

export const task1 = (input: string[]) => {
  let [horizontalPosition, depth] = [0, 0];
  input.forEach((cmd) => {
    const parts = cmd.split(" ");
    const value = Number(parts[1]);
    switch (parts[0]) {
      case "forward":
        horizontalPosition += value;
        break;
      case "down":
        depth += value;
        break;
      case "up":
        depth -= value;
        break;
    }
  });
  return horizontalPosition * depth;
};

export const task2 = (input: string[]) => {
  let [horizontalPosition, depth, aim] = [0, 0, 0];
  input.forEach((cmd) => {
    const parts = cmd.split(" ");
    const value = Number(parts[1]);
    switch (parts[0]) {
      case "forward":
        horizontalPosition += value;
        depth += aim * value;
        break;
      case "down":
        aim += value;
        break;
      case "up":
        aim -= value;
        break;
    }
  });
  return horizontalPosition * depth;
};
