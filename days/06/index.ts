// Prompt: https://adventofcode.com/2022/day/6

const fs = require('fs')

let input: string[]
input = fs.readFileSync('test.txt', { encoding: 'utf-8' }).split('')

for (let i: number = 0; i < input.length; i++) {
  let window: string[] = []
  window.push(input[i], input[i + 1], input[i + 2], input[i + 3])

  if (window.length === 4) {
    let compare: string = window.shift()!

    if (window.includes(compare)) {
    }
  }
}
