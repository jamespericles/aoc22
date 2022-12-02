// Prompt https://adventofcode.com/2022/day/2
/**
 * Letter | Action | Score Value
 * A, X  -> Rock   -> 1
 * B, Y  -> Paper  -> 2
 * C, Z  -> Scissors-> 3
 *
 * Win = 6 Points
 * Draw = 3 Points
 * Loss = 0 Points
 *
 * Example
 * Letter | Outcome | Score
 * A, Y   -> Win    -> 8 = (2 + 6)
 * B, X   -> Loss   -> 1 = (1 + 0)
 * C, Z   -> Draw   -> 6 = (3 + 3)
 * -------------------------------
 * Total = 15
 */

const fs = require('fs')

let input: string[]
input = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n')

enum Action {
  A = 'ROCK',
  B = 'PAPER',
  C = 'SCISSORS',
}

type OpponentAction = 'A' | 'B' | 'C'

enum Score {
  W = 6,
  D = 3,
  L = 0,
}

const valueMap: Map<Action, number> = new Map([
  [Action.A, 1],
  [Action.B, 2],
  [Action.C, 3],
])

let score: number = 0
input.forEach((match) => {
  let opponentAction: OpponentAction = match[0] as OpponentAction
  let result: string = match[match.length - 1]

  if (result === 'Y') {
    score += valueMap.get(Action[opponentAction])!
    score += Score.D
  } else if (result === 'X') {
    if (opponentAction === 'A') score += valueMap.get(Action['C'])!
    if (opponentAction === 'B') score += valueMap.get(Action['A'])!
    if (opponentAction === 'C') score += valueMap.get(Action['B'])!
  } else if (result === 'Z') {
    if (opponentAction === 'A') {
      score += valueMap.get(Action['B'])!
      score += Score.W
    }
    if (opponentAction === 'B') {
      score += valueMap.get(Action['C'])!
      score += Score.W
    }
    if (opponentAction === 'C') {
      score += valueMap.get(Action['A'])!
      score += Score.W
    }
  }
})

console.log(score)
