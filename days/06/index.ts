// Prompt: https://adventofcode.com/2022/day/6

const fs = require('fs')

let input: string
input = fs.readFileSync('test.txt', { encoding: 'utf-8' })

for (let i: number = 0; i < input.length; i++) {
  let window = ''

  // Because strings are immutable, TypeScript doesn't allow us to iterate through the characters of the string
  // Can this be improved?
  window += input.charAt(i)
  window += input.charAt(i + 1)
  window += input.charAt(i + 2)
  window += input.charAt(i + 3)

  if (window.length === 4) {
    if (!window.substring(1).includes(window.charAt(0))) {
      console.log(window)
    }
  }
}

// convert input to array of strings since arrays can be more easily mutated
// retain sliding window solution
