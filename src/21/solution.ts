import { getLines } from "../utils";

export const parseInputForDay = (file: string) => {
  return getLines(file)
    .map((x) => x.split(": ")[1])
    .map(Number);
};

export const task1 = (input: any) => {
  let die1 = 1;
  let die2 = 2;
  let die3 = 3;
  let p1Sum = 0;
  let p2Sum = 0;
  let p1Pos = input[0];
  let p2Pos = input[1];
  let turn = 0;
  let throws = 0;
  while (p1Sum < 1000 && p2Sum < 1000) {
    turn++;
    throws += 3;
    if (turn % 2 === 1) {
      p1Pos += die1 + die2 + die3;
      p1Pos = ((p1Pos - 1) % 10) + 1;
      p1Sum += p1Pos;
    } else {
      p2Pos += die1 + die2 + die3;
      p2Pos = ((p2Pos - 1) % 10) + 1;
      p2Sum += p2Pos;
    }
    die1 += 3;
    die2 += 3;
    die3 += 3;
    die1 = ((die1 - 1) % 100) + 1;
    die2 = ((die2 - 1) % 100) + 1;
    die3 = ((die3 - 1) % 100) + 1;
  }
  const losingScore = p1Sum < p2Sum ? p1Sum : p2Sum;
  return losingScore * throws;
};

export const task2 = (input: any) => {
  const initialP1Pos = input[0];
  const initialP2Pos = input[1];

  const states = {};

  const step = (p1Pos, p2Pos, p1Sum, p2Sum, throws) => {
    // Yay we won
    if (p1Sum >= 21) return [1, 0];
    if (p2Sum >= 21) return [0, 1];

    // Return memoized state value if found
    const stateKey =
      p1Pos + "-" + p2Pos + "-" + p1Sum + "-" + p2Sum + "-" + (throws % 2);
    if (states[stateKey] !== undefined) return states[stateKey];

    // Unvisited state
    let wins = [0, 0];
    // d3 has 3 faces (1,2,3) and we throw three times, so nest nest nest I guess
    // Took me long enough to grasp this...
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        for (let k = 1; k <= 3; k++) {
          if (throws % 2 === 1) {
            const newP1Pos = ((p1Pos + (i + j + k) - 1) % 10) + 1;
            const newP1Sum = p1Sum + newP1Pos;
            const newWins = step(newP1Pos, p2Pos, newP1Sum, p2Sum, throws + 1);
            wins[0] += newWins[0];
            wins[1] += newWins[1];
          } else {
            const newP2Pos = ((p2Pos + (i + j + k) - 1) % 10) + 1;
            const newP2Sum = p2Sum + newP2Pos;
            const newWins = step(p1Pos, newP2Pos, p1Sum, newP2Sum, throws + 1);
            wins[0] += newWins[0];
            wins[1] += newWins[1];
          }
        }
      }
    }
    states[stateKey] = wins;
    return wins;
  };
  const result = step(initialP1Pos, initialP2Pos, 0, 0, 1);
  console.log(Object.keys(states).length);
  return result;
};
