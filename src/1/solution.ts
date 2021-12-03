import * as path from "path"
import { readLinesToArray } from "../utils"

const task1 = (input: number[]) => input.filter((v, i) => {
  if(i == 0) return false
  if(v > input[i - 1]) return true
  return false
}).length

const task2 = (input: number[]) => input.reduce((prev, cur, i) => {
  if (i < 2) return []
  const w = input[i - 2] + input[i - 1] + cur
  return [...prev, w]
}, [])

const input = readLinesToArray(path.join(__dirname, "input.txt")).map(Number);
const start1 = performance.now()
const result1 = task1(input)
const finish1 = performance.now() - start1

const start2 = performance.now()
const result2 = task1(task2(input))
const finish2 = performance.now() - start2

console.log("Task 1 time: ", finish1)
console.log("Task 1 result: ", result1)
console.log("Task 2 time: ", finish2)
console.log("Task 2 result: ", result2)