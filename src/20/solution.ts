import { getLines, neighbors2D, sumOf } from "../utils";

export const parseInputForDay = (file: string) => {
  const lines = getLines(file);
  const algo = lines[0];
  const map = lines.slice(2);
  return { map, algo };
};

const padMap = (map: string[][], time: number): string[][] => {
  const padChar = time % 2 === 0 ? "#" : ".";
  const paddedMap = map.map((row) => [
    padChar,
    padChar,
    ...row,
    padChar,
    padChar,
  ]);
  paddedMap.push(new Array(paddedMap[0].length).fill(padChar));
  paddedMap.push(new Array(paddedMap[0].length).fill(padChar));
  paddedMap.unshift(new Array(paddedMap[0].length).fill(padChar));
  paddedMap.unshift(new Array(paddedMap[0].length).fill(padChar));
  return paddedMap;
};

const enhance = (map: string[][], algo: string, time: number): string[][] => {
  const paddedMap = padMap(map, time);
  const newMap = [];
  for (let y = 1; y < paddedMap.length - 1; y++) {
    newMap.push([]);
    for (let x = 1; x < paddedMap[y].length - 1; x++) {
      const str = neighbors2D(y, x, paddedMap, true, 1, true);
      const binary = str
        .map((n) => paddedMap[n[0]][n[1]])
        .map((n) => (n === "#" ? 1 : 0))
        .join("");
      const decimal = parseInt(binary, 2);
      newMap[y - 1].push(algo.charAt(decimal));
    }
  }
  return newMap;
};

export const task1 = (input: any) => {
  const { map, algo } = input;
  const enhancedTwice = enhance(enhance(map, algo, 1), algo, 2);
  return sumOf(enhancedTwice.flat().map((x) => (x === "#" ? 1 : 0)));
};

export const task2 = (input: any) => {
  const { map, algo } = input;
  let theMap = JSON.parse(JSON.stringify(map));
  for (let i = 1; i < 51; i++) {
    theMap = enhance(theMap, algo, i);
  }
  return sumOf(theMap.flat().map((x) => (x === "#" ? 1 : 0)));
};
