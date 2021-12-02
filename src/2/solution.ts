import { readLinesToArray } from "../utils"

const task1 = (input: string[]) => {
  let [horizontalPosition, depth] = [0, 0]
  input.forEach((cmd) => {
    const parts = cmd.split(" ")
    const value = Number(parts[1])
    switch(parts[0]) {
      case "forward":
        horizontalPosition += value
        break;
      case "down":
        depth += value
        break;
      case "up":
        depth -= value
        break;
    }
  })
  return horizontalPosition * depth
}

const task2 = (input: string[]) => {
  let [horizontalPosition, depth, aim] = [0, 0, 0]
  input.forEach((cmd) => {
    const parts = cmd.split(" ")
    const value = Number(parts[1])
    switch(parts[0]) {
      case "forward":
        horizontalPosition += value
        depth += (aim * value)
        break;
      case "down":
        aim += value
        break;
      case "up":
        aim -= value
        break;
    }
  })
  return horizontalPosition * depth
}

const input = readLinesToArray("src/2/input.txt")
const start1 = performance.now()
const result1 = task1(input)
const finish1 = performance.now() - start1

const start2 = performance.now()
const result2 = task2(input)
const finish2 = performance.now() - start2

console.log("Task 1 time: ", finish1)
console.log("Task 1 result: ", result1)
console.log("Task 2 time: ", finish2)
console.log("Task 2 result: ", result2)