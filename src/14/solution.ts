import { getLines } from "../utils";

export const parseInputForDay = (file: string): [string, any] => {
  const lines = getLines(file);
  const start = lines[0];
  const steps = {};
  lines.slice(2).forEach((step) => {
    const parts = step.split(" -> ");
    steps[parts[0]] = parts[1];
  });
  return [start, steps];
};

type PairMappings = {
  [key: string]: {
    n: number;
    pairs: string[];
  };
};

const stringToPairs = (str: string): string[] => {
  const pairs = [];

  for (let i = 0; i < str.length - 1; i++) {
    pairs.push(str.substring(i, i + 2));
  }

  return pairs;
};

const getPairMappings = (steps: any): PairMappings =>
  Object.keys(steps).reduce((prev, cur) => {
    const pairsForPair = [
      cur.slice(0, 1) + steps[cur],
      steps[cur] + cur.slice(1),
    ];
    return { ...prev, [cur]: { n: 0, pairs: pairsForPair } };
  }, {});

const iterate = (times: number, input: [string, any]) => {
  const [start, steps] = input;
  let pairMappings = getPairMappings(steps);
  stringToPairs(start).forEach((pair) => (pairMappings[pair].n += 1));
  const occurrences = {};
  start.split("").forEach((c) => (occurrences[c] = (occurrences[c] || 0) + 1));
  for (let i = 0; i < times; i++) {
    const newMappings = getPairMappings(steps);
    Object.keys(pairMappings).forEach((key) => {
      occurrences[steps[key]] =
        (occurrences[steps[key]] || 0) + pairMappings[key].n;
      pairMappings[key].pairs.forEach(
        (pair) => (newMappings[pair].n += pairMappings[key].n)
      );
    });
    pairMappings = newMappings;
  }

  const min = Math.min(...Object.values(occurrences).map(Number));
  const max = Math.max(...Object.values(occurrences).map(Number));
  return max - min;
};

export const task1 = (input: [string, any]) => {
  return iterate(10, input);
};

export const task2 = (input: any) => {
  return iterate(40, input);
};
