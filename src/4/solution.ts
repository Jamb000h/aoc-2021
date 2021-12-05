import * as path from "path";
import { readLinesToArray, sumOf } from "../utils";

type Row = number[];
type Card = Row[];
type Cards = Card[];

const parseBingoBoard = (input: string[]): [number[], Cards] => {
  const normalizedInput = input.map((r) => r.replace(/\s\s+/g, " "));
  const n = normalizedInput[0].split(",").map(Number);
  const cards = [];
  let card = [];
  normalizedInput.slice(2).forEach((r) => {
    if (r.trim().length > 0) {
      card.push(r.trim().split(" ").map(Number));
      return;
    }
    cards.push(card);
    card = [];
  });
  cards.push(card);

  return [n, cards];
};

const update = (n: number, cards: Cards) => {
  for (let card of cards) {
    for (let row of card) {
      for (let i = 0; i < row.length; i++) {
        row[i] = row[i] === n ? 0 : row[i];
      }
    }
  }
};

const checkRows = (card: Card) => {
  const rowValues = card.reduce((prev, cur) => [...prev, sumOf(cur)], []);

  for (let i = 0; i < rowValues.length; i++) {
    if (rowValues[i] === 0) return i;
  }

  return -1;
};

const checkColumns = (card: Card) => {
  const columnValues = new Array(5).fill(0);
  card.forEach((row) => {
    row.forEach((c, i) => {
      columnValues[i] += c;
    });
  });

  for (let i = 0; i < columnValues.length; i++) {
    if (columnValues[i] === 0) return i;
  }

  return -1;
};

const check = (cards: Cards) => {
  for (let c = 0; c < cards.length; c++) {
    const rowsResult = checkRows(cards[c]);
    const columnsResult = checkColumns(cards[c]);

    if (rowsResult > -1 || columnsResult > -1) {
      return c;
    }
  }

  return -1;
};

const getResult = (card: Card) => {
  return card.flat().reduce((prev, cur) => prev + cur, 0);
};

const getWinningCard = (n: number[], cards: Cards): [number, number] => {
  for (let i = 0; i < n.length; i++) {
    update(n[i], cards);
    const winningCard = check(cards);
    if (winningCard > -1) {
      return [n[i], winningCard];
    }
  }

  return [-1, -1];
};

const task1 = (input: string[]) => {
  const [n, cards] = parseBingoBoard(input);
  const [finalN, winningCard] = getWinningCard(n, cards);

  const result = getResult(cards[winningCard]);
  return result * finalN;
};

const task2 = (input: string[]) => {
  const [n, cards] = parseBingoBoard(input);
  while (cards.length > 0) {
    const [finalN, winningCard] = getWinningCard(n, cards);
    if (cards.length === 1) {
      const result = getResult(cards[winningCard]);
      return result * finalN;
    }
    cards.splice(winningCard, 1);
  }
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
