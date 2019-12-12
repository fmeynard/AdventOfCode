const fs = require('fs');
const IntCodeComputer = require('./int-code-computer');

let input = fs.readFileSync('./inputs/p9.txt', 'utf-8').split(',').map(Number);
console.log({
    part1: (new IntCodeComputer(input, [1])).run().pop(),
    part2: (new IntCodeComputer(input, [2])).run().pop()
});