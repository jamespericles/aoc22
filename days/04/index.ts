// Prompt: https://adventofcode.com/2022/day/4
/**
 * Each elf has been assigned a different section of the camp they are responsible to clean.
 * Each elf has paired up to compare what sections they are expected to clean in order to reduce the redundancies in cleaning.
 *
 * The sections are represented by numbers, where the first number is the section to start with, and the last number is the end of the range in which the elf is responsible for cleaning.
 * 2-4 means that sections 2, 3, and 4 are expected to be cleaned.
 *
 * The elves are trying to determine in how many assignment pairs does one range fully contain the other
 *
 * Example
 * 2-4,6-8        .234.....   2-4
 *                .....678.   6-8
 *
 * 2-3,4-5        .23......   2-3
 *                ...45....   4-5
 *
 * 5-7,7-9    ->  ....567..
 *                ......789
 *
 * 2-8,3-7        .2345678.   2-8 fully contains 3-7
 *                ..34567..
 *
 * 6-6,4-6        .....6...
 *                ...456...   4-6 fully contains 6 (important to note the minimum and maximum of the range can equal one another)
 *
 * 2-6,4-8        .23456...
 *                ...45678.
 */

const fs = require('fs')

let input: string[]
input = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n')

interface Scope {
  min: number
  max: number
  difference: number
}

const parseRange = (range: string): Scope => {
  const scope: Scope = {
    min: parseInt(range.substring(0, range.indexOf('-'))),
    max: parseInt(range.substring(range.indexOf('-') + 1)),
    difference: 0,
  }
  scope.difference = scope.max - scope.min
  return scope
}

let overlapCount: number = 0

for (let i: number = 0; i < input.length; i++) {
  // Create two objects representing the ranges in the given pair
  let range1 = parseRange(input[i].substring(0, input[i].indexOf(',')))
  let range2 = parseRange(input[i].substring(input[i].indexOf(',') + 1))

  if (range1.difference !== 0 && range2.difference !== 0) {
    if (
      (range1.min >= range2.min && range1.max <= range2.max) ||
      (range2.min >= range1.min && range2.max <= range1.max)
    ) {
      console.log('case 1', range1, range2)
      overlapCount++
    }
  } else if (range1.difference === 0) {
    if (range1.min >= range2.min && range1.min <= range2.max) {
      console.log('case 2', range1, range2)
      overlapCount++
    }
  } else if (range2.difference === 0) {
    if (range2.min >= range1.min && range2.min <= range1.max) {
      console.log('case 3', range1, range2)
      overlapCount++
    }
  }
}
console.log(overlapCount)