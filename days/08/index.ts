// Prompt: https://adventofcode.com/2022/day/8

/**
 * This could be solved in a number of ways. First that comes to mind is traversing a 
 * Given a matrix of numbers, where numbers 0...9 correspond to a single trees height, count the total number of trees that visible.
 * Visible in this case means that the trees surrounding it are shorter than it.
 * 
 * All trees on the border are considered visible, as they are exposed from at least one direction *from itself to the border*
 * 
 * Example:
 * In this case, the only trees that need to be considered are the 9 internal trees, all bordering trees are considered visible
    30373
    25512 -- 1 is the only tree considered invisible, 1 is surrounded by 7, 2, 3, and 5, all of which are taller than it
    65332 -- The center 3 is considered invisible, note that it having an eastern neighbor of the same height counts as it being obscured
    33549 -- The second 3 (not the border) is considered invisible, as well as the 4 (the 7 obscures it from the north, otherwise its immediate most neighbors are taller)
    35390

    total: 16 on the edge + 5 interior = 21 total VISIBLE trees
 */

const fs = require('fs')

// Create a 2D array of numbers
let input: number[][]
input = fs
  .readFileSync('test.txt', { encoding: 'utf-8' })
  .split('\n')
  .map((row: string) => row.split('').map((num: string) => parseInt(num)))

type Direction = 'north' | 'south' | 'east' | 'west'

// Create a 2D array class
class Matrix {
  private matrix: number[][]
  public length: number
  public height: number

  constructor(matrix: number[][]) {
    this.matrix = matrix
    this.length = matrix.length
    this.height = matrix[0].length
  }

  // Travel in a given direction, returning the first tree of greater height or null
  travel(x: number, y: number, direction: Direction): number | null {
    let currentX = x
    let currentY = y
    switch (direction) {
      case 'north':
        currentY--
        break
      case 'south':
        currentY++
        break
      case 'east':
        currentX++
        break
      case 'west':
        currentX--
        break
    }

    if (
      currentX < 0 ||
      currentY < 0 ||
      currentX >= this.matrix[0].length ||
      currentY >= this.matrix.length
    ) {
      return null
    }

    if (this.matrix[currentY][currentX] > this.matrix[y][x]) {
      return this.matrix[currentY][currentX]
    }

    return this.travel(currentX, currentY, direction)
  }

  // Travel in all directions, returning true if the tree is visible
  isVisible(x: number, y: number): boolean {
    return (
      this.travel(x, y, 'north') === null ||
      this.travel(x, y, 'south') === null ||
      this.travel(x, y, 'east') === null ||
      this.travel(x, y, 'west') === null
    )
  }
}

const matrix = new Matrix(input)
let counter = 0
for (let r: number = 0; r < matrix.length; r++) {
  for (let c: number = 0; c < matrix.height; c++) {
    if (matrix.isVisible(r, c)) {
      counter++
    }
  }
}

console.log(counter)
