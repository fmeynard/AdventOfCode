const fs = require('fs');

function process(input, noun, verb) {
    input[1] = noun;
    input[2] = verb;

    let x = 0;
    while(input[x] != 99) {
        if (input[x] == 1) {
            input[input[x + 3]] = input[input[x + 1]] + input[input[x + 2]];
        } else if (input[x] == 2) {
            input[input[x + 3]] = input[input[x + 1]] * input[input[x + 2]];
        }
        x += 4;
    }

    return input[0];
}

function part1() {
    console.log({ part1: process(fs.readFileSync('./inputs/p2.txt', 'utf-8').split(',').map(val => parseInt(val)), 12, 2)});
}

function part2() {
    let input = fs.readFileSync('./inputs/p2.txt', 'utf-8').split(',').map(val => parseInt(val));

    let noun = 0, verb = 0;
    while (process([...input], noun,verb) != 19690720) {
        noun++;
        if (noun > 99) {
            noun = 0;
            verb++;
        }
    }
    
    console.log({ part2: 100 * noun + verb });
}

part1();
part2();