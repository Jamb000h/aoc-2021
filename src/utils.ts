export const getLines = (file: string): string[] => file.split("\r\n");

export const sumOf = (numbers: number[]) => {
  return numbers.reduce((x, y) => x + y, 0);
};

export const productOf = (numbers: number[]) => {
  return numbers.reduce((x, y) => x * y, 1);
};

export const averageOf = (numbers: number[], floor = false) => {
  const avg = numbers.reduce((prev, cur) => prev + cur, 0) / numbers.length;
  return floor ? Math.floor(avg) : Math.round(avg);
};
