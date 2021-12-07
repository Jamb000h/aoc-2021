export const parseInputForDay = (file: string) => {
  return file.split(",").map(Number);
};

export const task1 = (input: number[]) => {
  const max = Math.max(...input);
  const positions = new Array(max).fill(0);
  input.forEach((c) => {
    positions.forEach((_, i) => {
      positions[i] += Math.abs(c - i);
    });
  });
  return Math.min(...positions);
};

export const task2 = (input: number[]) => {
  const max = Math.max(...input);
  const positions = new Array(max).fill(0);
  input.forEach((c) => {
    positions.forEach((_, i) => {
      const diff = Math.abs(c - i);
      positions[i] += (diff * (1 + diff)) / 2;
    });
  });
  return Math.min(...positions);
};
