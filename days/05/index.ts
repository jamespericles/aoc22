// Prompt https://adventofcode.com/2022/day/5
/**
 * 
 * Starting Stacks: 
    [H]         [H]         [V]    
    [V]         [V] [J]     [F] [F]
    [S] [L]     [M] [B]     [L] [J]
    [C] [N] [B] [W] [D]     [D] [M]
[G] [L] [M] [S] [S] [C]     [T] [V]
[P] [B] [B] [P] [Q] [S] [L] [H] [B]
[N] [J] [D] [V] [C] [Q] [Q] [M] [P]
[R] [T] [T] [R] [G] [W] [F] [W] [L]
 1   2   3   4   5   6   7   8   9 

 */

const fs = require('fs')

let input: string[]
input = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n')

// Create stack class
interface StackInterface<T> {
  push(item: T): void
  pop(): T | undefined
  peek(): T | undefined
  size(): number
  init(inventory: T): void
}

// The bottom of the stack is the zeroth index
class Stack<T> implements StackInterface<T> {
  private storage: T[] = []

  constructor(private capacity: number = Infinity) {}

  push(item: T): void {
    if (this.size() === this.capacity) {
      throw Error('Stack has reached capacity')
    }
    this.storage.push(item)
  }

  pop(): T | undefined {
    return this.storage.pop()
  }

  peek(): T | undefined {
    return this.storage[this.size() - 1]
  }

  size(): number {
    return this.storage.length
  }

  init(inventory: T) {
    if (this.size() === 0) {
      // For the purpose of this puzzle, string is the only type we need to consider
      // We need to perform this check so we know that inventory actually has a property of .length
      if (typeof inventory === 'string') {
        for (let i: number = 0; i < inventory.length; i++) {
          this.push(inventory[i] as T)
        }
      }
    }
  }
}

const stacks: Stack<string>[] = []
// Initiate each of our stacks with the order given from our input
const stack1 = new Stack<string>()
stack1.init('RNPG')

const stack2 = new Stack<string>()
stack2.init('TJBLCSVH')

const stack3 = new Stack<string>()
stack3.init('TDBMNL')

const stack4 = new Stack<string>()
stack4.init('RVPSB')

const stack5 = new Stack<string>()
stack5.init('GCQSWMVH')

const stack6 = new Stack<string>()
stack6.init('WQSCDBJ')

const stack7 = new Stack<string>()
stack7.init('FQL')

const stack8 = new Stack<string>()
stack8.init('WMHTDLFV')

const stack9 = new Stack<string>()
stack9.init('LPBVMJF')

stacks.push(
  stack1,
  stack2,
  stack3,
  stack4,
  stack5,
  stack6,
  stack7,
  stack8,
  stack9
)

const moveRegex = /move (\d+) from (\d+) to (\d+)/

for (let i: number = 0; i < input.length; i++) {
  let quantity: number = 0
  let origin: number = 0
  let destination: number = 0

  // Extract the quantity, origin, and destination
  input[i]
    .trim()
    .split('\n')
    .map((a) => moveRegex.exec(a))
    .forEach((a) => {
      if (a) {
        quantity = parseInt(a[1])
        origin = parseInt(a[2])
        destination = parseInt(a[3])
      }
    })

  let j: number = quantity
  while (j) {
    // Our stacks array starts with an index of 0, so each stack is shifted down by one
    stacks[destination - 1]?.push(stacks[origin - 1]?.pop()!)
    j--
  }
}

let topStacks: string = ''

for (let col in stacks) {
  topStacks += stacks[col].peek()
}

console.log('topStacks', topStacks)
