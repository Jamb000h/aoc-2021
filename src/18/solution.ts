import { StringMappingType } from "typescript";
import { getLines } from "../utils";

export const parseInputForDay = (file: string): string[] => {
  return getLines(file);
};

const add = (snailfish1: string, snailfish2: string): string => {
  if (snailfish1.length === 0) {
    return snailfish2;
  }
  let temp = snailfish1.slice(0);
  temp = "[" + temp + "," + snailfish2 + "]";
  return temp;
};

const explode = (snailfish: string): string => {
  let i = 0;
  let level = 0;
  while (i < snailfish.length) {
    const char = snailfish.charAt(i);
    if (char === "[") level++;

    if (char === "]") level--;

    if (level === 5) {
      let pairIndex = i;
      let pair = "";
      while (true) {
        const char = snailfish[pairIndex];
        pair += char;
        if (char === "]") {
          break;
        }
        pairIndex++;
      }
      const parts = pair.split(",");
      const leftNumber = parts[0].slice(1);
      const rightNumber = parts[1].slice(0, parts[1].length - 1);
      let leftSide = snailfish.substring(0, i);
      let rightSide = snailfish.substring(pairIndex + 1);
      let leftNumberIndex = leftSide.length - 1;
      while (leftNumberIndex > 0) {
        if (!isNaN(Number(leftSide.charAt(leftNumberIndex)))) {
          let leftToReplace = "";
          while (!isNaN(Number(leftSide.charAt(leftNumberIndex)))) {
            leftToReplace = leftSide.charAt(leftNumberIndex) + leftToReplace;
            leftNumberIndex--;
          }

          const newNumber = Number(leftNumber) + Number(leftToReplace);
          leftSide =
            leftSide.substring(0, leftNumberIndex + 1) +
            newNumber.toString() +
            leftSide.substring(leftNumberIndex + leftToReplace.length + 1);
          break;
        }
        leftNumberIndex--;
      }

      let rightNumberIndex = 0;
      while (rightNumberIndex < rightSide.length - 1) {
        if (!isNaN(Number(rightSide.charAt(rightNumberIndex)))) {
          let rightToReplace = "";
          while (!isNaN(Number(rightSide.charAt(rightNumberIndex)))) {
            rightToReplace =
              rightToReplace + rightSide.charAt(rightNumberIndex);
            rightNumberIndex++;
          }
          const newNumber = Number(rightNumber) + Number(rightToReplace);
          rightSide =
            rightSide.substring(0, rightNumberIndex - rightToReplace.length) +
            newNumber.toString() +
            rightSide.substring(rightNumberIndex);
          break;
        }
        rightNumberIndex++;
      }
      snailfish = leftSide + "0" + rightSide;
      break;
    }
    i++;
  }

  return snailfish;
};

const split = (snailfish: string): string => {
  let i = 0;
  while (i < snailfish.length - 1) {
    if (!isNaN(Number(snailfish.slice(i, i + 2)))) {
      const leftNumber = Math.floor(Number(snailfish.slice(i, i + 2)) / 2);
      const rightNumber = Math.ceil(Number(snailfish.slice(i, i + 2)) / 2);
      snailfish =
        snailfish.substring(0, i) +
        "[" +
        leftNumber.toString() +
        "," +
        rightNumber.toString() +
        "]" +
        snailfish.substring(i + 2);
      break;
    }
    i++;
  }

  return snailfish;
};

const magnitude = (input: string) => {
  while (input.match(/(\[\d+,\d+\])/)) {
    const match = input.match(/(\[\d+,\d+\])/);
    const index = match.index;
    const str = match[0];
    const numbers = str
      .slice(0, str.length - 1)
      .slice(1)
      .split(",")
      .map(Number);
    const multiplied = 3 * numbers[0] + 2 * numbers[1];
    input =
      input.substring(0, index) +
      multiplied.toString() +
      input.substring(index + str.length);
  }
  return input;
};

export const task1 = (input: string[]) => {
  let snailfish = "";
  while (input.length > 0) {
    const snailfish2 = input.shift();
    snailfish = add(snailfish, snailfish2);
    while (true) {
      const exploded = explode(snailfish);
      if (exploded !== snailfish) {
        snailfish = exploded;
        continue;
      }
      const splitSnailfish = split(snailfish);
      if (splitSnailfish !== snailfish) {
        snailfish = splitSnailfish;
        continue;
      }
      break;
    }
  }
  return magnitude(snailfish);
};

export const task2 = (input: string[]) => {
  let largest = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (i === j) continue;
      let snailfish = add(input[i], input[j]);
      while (true) {
        const exploded = explode(snailfish);
        if (exploded !== snailfish) {
          snailfish = exploded;
          continue;
        }
        const splitSnailfish = split(snailfish);
        if (splitSnailfish !== snailfish) {
          snailfish = splitSnailfish;
          continue;
        }
        break;
      }

      let m = Number(magnitude(snailfish));
      largest = m > largest ? m : largest;

      snailfish = add(input[j], input[i]);
      while (true) {
        const exploded = explode(snailfish);
        if (exploded !== snailfish) {
          snailfish = exploded;
          continue;
        }
        const splitSnailfish = split(snailfish);
        if (splitSnailfish !== snailfish) {
          snailfish = splitSnailfish;
          continue;
        }
        break;
      }

      m = Number(magnitude(snailfish));
      largest = m > largest ? m : largest;
    }
  }

  return largest;
};
