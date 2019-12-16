const fs = require('fs');

function getRepeatingPattern(position) {
    const basePattern = [0, 1, 0, -1];
    let pattern = [];

    basePattern.forEach(v => {
        for (let x = 0; x < position; x++) pattern.push(v)
    });

    return pattern;
}

function part1(inputArray, phase = 100) {
    let nextInput = [...inputArray];

    for (let p = 1; p<= phase; p++) {
        nextInput = nextInput.map((v,i) => {
            let repeatingPattern = getRepeatingPattern(i+1);
            let rpIndex = 1;

            let currentV = 0;
            nextInput.forEach(v2 => {
                currentV += v2 * repeatingPattern[rpIndex];
                rpIndex = repeatingPattern[rpIndex+1] != undefined ? rpIndex+1 : 0;
            });

            return Math.abs(currentV) % 10;
        });
    }

    return Number(nextInput.join('').slice(0,8));
}

function part2(inputInit, p = 100, r = 10000, offset = 7) {
    let input = [...inputInit];
    for (let i = 1; i < r; i++) {
        input.push(...inputInit);
    }

    let shiftBY = Number(input.slice(0, offset).join(''));

    for (let phase = 1; phase <= p; phase++) {
        for (let i = input.length - 1; i >= shiftBY; i--) {
            let prev = input[i + 1] || 0;

            input[i] = Math.abs(prev + input[i]) % 10;
        }
    }

    return Number(input.slice(shiftBY, shiftBY+8).join(''));
}

let input = fs.readFileSync('./inputs/p16.txt', 'utf-8').split('').map(Number)

console.log({
    part1: part1(input),
    part2: part2(input)
})