import * as path from "path";
import { readLinesToArray } from "../utils";

const mostCommonBits = (input: string[]): string[] => {
  // Initialize each bit sum to zero
  const bitSums = new Array(input[0].length).fill(0);

  // Calculate sums of bits
  input.forEach((byte) => {
    byte.split("").forEach((bit, i) => {
      bitSums[i] += Number(bit);
    });
  });

  return bitSums.map((bit) => {
    return Math.round(bit / input.length).toString();
  });
};

const invertBits = (input: string[]): string[] =>
  input.map((x) => (x == "0" ? "1" : "0"));

const binaryToInt = (byte: string): number =>
  parseInt(byte, 2);

const task1 = (input: string[]) => {
  const mostCommon = mostCommonBits(input);
  const leastCommon = invertBits(mostCommon);
  const gammaRate = binaryToInt(mostCommon.join(""));
  const epsilonRate = binaryToInt(leastCommon.join(""));

  return gammaRate * epsilonRate;
};

const task2 = (input: string[]) => {
  let i = 0;
  let ogr = [...input];
  let co2sr = [...input];

  while (i < input[i].length) {
    const ogrBits = mostCommonBits(ogr);
    const co2srBits = invertBits(mostCommonBits(co2sr));

    if (ogr.length > 1) {
      ogr = ogr.filter((o) => o[i] === ogrBits[i].toString());
    }

    if (co2sr.length > 1) {
      co2sr = co2sr.filter((c) => c[i] === co2srBits[i].toString());
    }

    i++;
  }

  const oxygenGeneratorRating = binaryToInt(ogr[0]);
  const co2ScrubberRating = binaryToInt(co2sr[0]);

  return oxygenGeneratorRating * co2ScrubberRating;
};

const input = readLinesToArray(path.join(__dirname, "input.txt"));
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
