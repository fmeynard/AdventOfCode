const fs = require('fs');

function part1() {
    let res = 0;

    let input = fs.readFileSync('./inputs/pX.txt', 'utf-8').split('\n');

    console.log({ part1: res });
}

function part2() {
    let res = 0;

    let input = fs.readFileSync('./inputs/pX.txt', 'utf-8').split('\n');

    console.log({ part2: res });
}

part1();
part2();