// Prompt https://adventofcode.com/2022/day/1
const fs = require('fs')

let input: string[]
input = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n')

let accumulator: number = 0
let arrayOfCalories: number[] = []

for (let i: number = 0; i < input.length; i++) {
  // Each inventory of snacks is separated by an empty string
  if (input[i] !== '') {
    accumulator += Number(input[i])
  } else {
    // Store our totals to be sorted later
    arrayOfCalories.push(accumulator)
    accumulator = 0
  }
}

let sortedArray = arrayOfCalories.sort((a, b) => b - a)

console.log('Part 1', sortedArray[0], sortedArray[1], sortedArray[2])
console.log('Part 2', sortedArray[0] + sortedArray[1] + sortedArray[2])
