// Prompt: https://adventofcode.com/2022/day/6

const fs = require('fs')

let input: string[]
input = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('')

let slidingWindow: string[] = []
let marker: number = 0

// Helper function to determine if there exists any duplicate elements
// Sets cannot contain duplicates, so this function will return true if the newly created Set and the array it was passed do not have the same length
const hasDuplicates = (arr: string[]) =>
  arr.length !== new Set<string>(arr).size

for (let i: number = 0; i < input.length; i++) {
  // Populate our window
  if (slidingWindow.length !== 4) {
    slidingWindow.push(input[i])
    marker++
  }

  if (hasDuplicates(slidingWindow)) {
    // This slides our window down the array once more and increments our marker
    // The marker will stop incrementing once we stop finding duplicates, which will represent the first instance of four unique elements in our input array
    slidingWindow.shift()
  }
}

console.log(marker)
