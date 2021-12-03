import { readLinesToArray } from "../utils";

const mostCommonBits = (input: string[]): number[] => {
  // Initialize each bit sum to zero
  const bitSums = new Array(input[0].length).fill(0);

  // Calculate sums of bits
  input.forEach((byte) => {
    byte.split("").forEach((bit, i) => {
      bitSums[i] += Number(bit);
    });
  });

  return bitSums.map((bit) => {
    return Math.round(bit / input.length);
  });
};

const invertBits = (input: number[]): number[] =>
  input.map((x) => (x == 0 ? 1 : 0));

const byteToInt = (byte: number[] |string[]): number => parseInt(byte.join(""), 2);

const task1 = (input: string[]) => {
  const mostCommon = mostCommonBits(input);
  const leastCommon = invertBits(mostCommon);
  const gammaRate = byteToInt(mostCommon);
  const epsilonRate = byteToInt(leastCommon);

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
      if (ogr.length === 2) {
        ogr.filter((o) =>  o[i] === "1");
      }
      ogr = ogr.filter((o) =>  o[i] === ogrBits[i].toString());
    }

    if (co2sr.length > 1) {
      if (co2sr.length === 2) {
        co2sr = co2sr.filter((c) =>  c[i] === "0");
      }
      co2sr = co2sr.filter((c) => c[i] === co2srBits[i].toString());
    }
    
    i++;
  }
  
  const oxygenGeneratorRating = byteToInt(ogr[0].split(""))
  const co2ScrubberRating = byteToInt(co2sr[0].split(""))

  return oxygenGeneratorRating * co2ScrubberRating
};

const input = readLinesToArray("src/3/input.txt");
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
