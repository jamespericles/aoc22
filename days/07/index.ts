// Prompt: https://adventofcode.com/2022/day/7

const fs = require('fs')

let input: string[]
input = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n')

const maxSize: number = 100000

class Files {
  name: string
  size: number

  constructor(name: string, size: number) {
    this.name = name
    this.size = size
  }
}

class Dir {
  name: string
  directories: Dir[]
  files: Files[]
  parent?: Dir

  constructor(directories: Dir[], files: Files[], name: string, parent?: Dir) {
    this.directories = directories
    this.files = files
    this.name = name
    this.parent = parent
  }

  getAllDirs = (): Dir[] => {
    let dirs: Dir[] = []
    for (const dir of this.directories) {
      dirs = dirs.concat(dir.getAllDirs())
    }

    return dirs.concat(this.directories)
  }

  getDir = (name: string) => {
    return this.directories.filter((dir) => dir.name == name)[0]
  }

  addFile = (file: Files) => {
    this.files.push(file)
  }

  addDir = (dir: Dir) => {
    this.directories.push(dir)
    dir.parent = this
  }

  size = (): number => {
    let sum = 0

    for (const dir of this.directories) {
      sum += dir.size()
    }

    for (const file of this.files) {
      sum += file.size
    }

    return sum
  }
}

// Establish our root directory before parsing our input
const rootDir = new Dir([], [], '/')
let currentDir: Dir = rootDir

for (let line of input) {
  const a = line.split(' ')

  // Each line of the input represents either a command, a directory, or a file. Each start with a $, a dir, or a number representing the size of the file, respectively
  if (a[0] == '$') {
    // There isn't anything for us to do with an ls command
    if (a[1] == 'ls') {
      continue
    } else if (a[1] == 'cd') {
      const command = a[2]
      // Move up the file system
      if (command == '..') {
        currentDir = currentDir.parent!
      } else if (command == '/') {
        // return to the root dir
        currentDir = rootDir
      } else {
        currentDir = currentDir.getDir(command)
      }
    }
  } else {
    if (a[0] == 'dir') {
      currentDir.addDir(new Dir([], [], a[1], currentDir))
    } else {
      currentDir.addFile(new Files(a[1], +a[0]))
    }
  }
}

let sum = 0

const usedSpace = rootDir.size()
const spaceNeeded = 30000000 - (70000000 - usedSpace)
const possibleDirs: Dir[] = []

for (const dir of rootDir.getAllDirs()) {
  if (dir.size() <= 100000) {
    sum += dir.size()
  }
  if (dir.size() >= spaceNeeded) {
    possibleDirs.push(dir)
  }
}

console.log(sum)
console.log(possibleDirs.sort((a, b) => a.size() - b.size())[0].size())
