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

interface Moves {
  quantity: number | null
  origin: number | null
  destination: number | null
}

// The bottom of the stack is the zeroth index
// repeat count?
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

// Initiate each of our stacks with the order given from our input
const stack1 = new Stack<string>()
stack1.init('RNPG')

const stack2 = new Stack<string>()
stack2.init('TJBLCSVH')

const stack3 = new Stack<string>()
stack2.init('TDBMNL')

const stack4 = new Stack<string>()
stack2.init('RVPSB')

const stack5 = new Stack<string>()
stack2.init('GCQSWMVH')

const stack6 = new Stack<string>()
stack2.init('WQSCDBJ')

const stack7 = new Stack<string>()
stack2.init('FQL')

const stack8 = new Stack<string>()
stack2.init('WMHTDLFV')

const stack9 = new Stack<string>()
stack2.init('LPBVMJF')

const moveRegex = /move (\d+) from (\d+) to (\d+)/

for (let i: number = 0; i < input.length; i++) {
  let moves: Moves = {
    quantity: null,
    origin: null,
    destination: null,
  }

  // Extract the quantity, origin, destination
  input[i]
    .trim()
    .split('\n')
    .map((a) => moveRegex.exec(a))
    .forEach((a) => {
      if (a) {
        moves.quantity = parseInt(a[1])
        moves.origin = parseInt(a[2])
        moves.destination = parseInt(a[3])
      }
    })
}

// Loop through stacks
// push top most crate to a string
// return final answer, string of each crate on top of the stacks
