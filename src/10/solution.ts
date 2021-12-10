import { getLines, sumOf } from "../utils";

type Opener = "(" | "[" | "{" | "<";
type Closer = ")" | "]" | "}" | ">";

export const parseInputForDay = (file: string) => {
  return getLines(file);
};

const isOpener = (character: string): boolean => {
  return "([{<".includes(character);
};

const openerValue = (character: Closer) => {
  switch (character) {
    case ")":
      return 3;
    case "]":
      return 57;
    case "}":
      return 1197;
    case ">":
      return 25137;
    default:
      return 0;
  }
};

const getCloser = (opener: Opener): Closer => {
  switch (opener) {
    case "(":
      return ")";
    case "[":
      return "]";
    case "{":
      return "}";
    case "<":
      return ">";
  }
};

const closerValue = (closer: Closer) => {
  switch (closer) {
    case ")":
      return 1;
    case "]":
      return 2;
    case "}":
      return 3;
    case ">":
      return 4;
    default:
      return 0;
  }
};

const getTails = (openers: Opener[][]) => {
  return openers.map((opener) => {
    return opener.map((x) => closerValue(getCloser(x)));
  });
};

export const task1 = (input: string[]) => {
  const illegals = [];
  for (const line of input) {
    const chunks = line.split("");
    const openStack = [];
    for (const chunk of chunks) {
      if (isOpener(chunk)) {
        openStack.push(chunk);
        continue;
      }
      const latestOpener = openStack.pop();
      if (getCloser(latestOpener) === chunk) {
        continue;
      } else {
        illegals.push(chunk);
        break;
      }
    }
  }
  return sumOf(illegals.map(openerValue));
};

export const task2 = (input: string[]) => {
  const incomplete: Opener[][] = [];
  for (const line of input) {
    const chunks = line.split("");
    const openStack = [];
    let corrupt = false;
    for (const chunk of chunks) {
      if (isOpener(chunk)) {
        openStack.push(chunk);
        continue;
      }
      const latestOpener = openStack.pop();
      if (getCloser(latestOpener) === chunk) {
        continue;
      } else {
        corrupt = true;
        break;
      }
    }
    if (!corrupt) {
      incomplete.push(openStack);
    }
  }

  const tailScores = getTails(incomplete);
  const calculatedScores = tailScores
    .map((tail) => {
      return tail.reverse().reduce((prev, cur) => 5 * prev + cur, 0);
    })
    .sortAscending();
  return calculatedScores[Math.floor(calculatedScores.length / 2)];
};
