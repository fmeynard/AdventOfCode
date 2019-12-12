const fs = require('fs');
const IntCodeComputer = require('./int-code-computer');

function process(input, noun, verb) {
    input[1] = noun;
    input[2] = verb;

    let program = new IntCodeComputer(input);
    program.run();

    return program.memory[0];
}

function part2(input) {
    let noun = 0, verb = 0;
    while (process(input, noun,verb) != 19690720) {
        noun++;
        if (noun > 99) {
            noun = 0;
            verb++;
        }
    }

    return 100 * noun + verb;
}

let input = fs.readFileSync('./inputs/p2.txt', 'utf-8').split(',').map(Number);

console.log({
    part1: process(input, 12, 2),
    part2: part2(input)
});