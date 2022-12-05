// Prompt https://adventofcode.com/2022/day/3
/**
 * One rucksack has two compartments, the first and it's contents are represented by the first half of the string, the second compartment is the last half.
 * Each rucksack should only contain one of each item in either compartment.
 *
 * Each item is represented by a letter, `a` and `A` represent different items (casing matters).
 * Items are assigned a priority, a...z have priorities 1 through 26, A...Z -> 27...52.
 *
 * Example
 * vJrwpWtwJgWrhcsFMMfFFhFp --> p occurs twice. p:16
 * jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL4 --> L:38
 * PmmdzqPrVvPwwTWBwg --> P:22
 * wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn --> v:22
 * ttgJtRGJQctTZtZT --> t:20
 * CrZsJsPPZsGzwwsLwLmpwMDw --> s:19
 *
 * Total: 157
 */

const fs = require('fs')

let input: string[]
input = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n')

// Create a map so we can more easily determine the value of the misplaced item
const alph = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const priorities = new Map<string, number>([])

for (let i: number = 0; i < alph.length; i++) {
  priorities.set(alph[i], i + 1)
}

const findRepeat = (
  str1: string,
  str2: string,
  str3: string | null
): string => {
  const set1 = new Set(str1.split(''))
  const set2 = new Set(str2.split(''))
  const set3 = str3 ? new Set(str3.split('')) : null
  let common: string = ''

  // Handle part 1
  if (!str3) {
    for (let char of set1.values()) {
      if (set2.has(char)) {
        common = char
      }
    }
  }

  // Handle part 2
  if (str3) {
    for (let char of set1.values()) {
      if (set2.has(char) && set3?.has(char)) {
        common = char
      }
    }
  }

  return common
}

const part1 = (input: string[]): number => {
  let accumulator: number = 0
  for (let i: number = 0; i < input.length; i++) {
    let middle: number = input[i].length / 2
    let firstHalf: string = input[i].substring(0, middle)
    let secondHalf: string = input[i].substring(middle, input[i].length)

    accumulator += priorities.get(findRepeat(firstHalf, secondHalf, null))!
  }

  console.log('Part 1', accumulator)
  return accumulator
}

part1(input)

const part2 = (input: string[]): number => {
  let accumulator: number = 0

  for (let i: number = 0; i < input.length; i += 3) {
    let firstElf: string = input[i]
    let secondElf: string = input[i + 1]
    let thirdElf: string = input[i + 2]

    accumulator += priorities.get(findRepeat(firstElf, secondElf, thirdElf))!
  }

  console.log('Part 2', accumulator)
  return accumulator
}

part2(input)
