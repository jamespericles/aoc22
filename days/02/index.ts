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
  X = 'ROCK',
  B = 'PAPER',
  Y = 'PAPER',
  C = 'SCISSORS',
  Z = 'SCISSORS',
}

type OpponentAction = 'A' | 'B' | 'C'
type PlayerAction = 'X' | 'Y' | 'Z'

enum Score {
  W = 6,
  D = 3,
  L = 0,
}

const valueMap: Map<Action, number> = new Map([
  [Action.A && Action.X, 1],
  [Action.B && Action.Y, 2],
  [Action.C && Action.Z, 3],
])

const determineOutcome = (
  opponentAction: OpponentAction,
  playerAction: PlayerAction
): Score => {
  // Draw
  if (Action[playerAction] === Action[opponentAction]) {
    return Score.D
  } else if (Action[playerAction] !== Action[opponentAction]) {
    // Win
    if (
      (playerAction === 'X' && opponentAction === 'C') ||
      (playerAction === 'Y' && opponentAction === 'A') ||
      (playerAction === 'Z' && opponentAction === 'B')
    ) {
      return Score.W
    }
  }
  return Score.L
}

let score: number = 0
input.forEach((match) => {
  let opponentAction: OpponentAction = match[0] as OpponentAction
  let playerAction: PlayerAction = match[match.length - 1] as PlayerAction

  score += determineOutcome(opponentAction, playerAction)
  score += valueMap.get(Action[playerAction])! // Maps in TypeScript can possibly be undefined, for a script this simple though, it's safe to use a bang to insist that valueMap will have the numbers set as expected
})

console.log(score)
