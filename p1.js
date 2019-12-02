const fs = require('fs');

function part1() {
    let sum = 0;
    fs.readFileSync('./inputs/p1.txt', 'utf-8').split('\n').forEach(value => sum += Math.floor(parseInt(value.trim()) / 3) - 2);

    console.log({ part1: sum });
}

function part2() {
    let sum = 0;
    fs.readFileSync('./inputs/p1.txt', 'utf-8').split('\n').forEach(mass => {
        let currentFuel = Math.floor(mass / 3) - 2;
        sum += currentFuel;

        while (currentFuel > 0) {
            currentFuel = Math.floor(currentFuel / 3) - 2;
            sum += currentFuel > 0 ? currentFuel : 0;
        }
    });

    console.log({ part2: sum });
}

part1();
part2();
