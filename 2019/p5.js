const fs = require('fs');

function process(input, programInput) {
    let x = 0;
    let output = [];
    while(input[x] != 99) {
        input[x] = input[x].toString().padStart(5, '0');

        let p1Index = Number(input[x].substr(-3,1)) == 0 ? input[x + 1] : x + 1;
        let p2Index = Number(input[x].substr(-4,1)) == 0 ? input[x + 2] : x + 2;
        let p3Index = Number(input[x].substr(-5,1)) == 0 ? input[x + 3] : x + 3;

        switch (Number(input[x].substr(-2))) {
            case 1:
                input[p3Index] = input[p1Index] + input[p2Index];
                x += 4;
                break;
            case 2:
                input[p3Index] = input[p1Index] * input[p2Index];
                x += 4;
                break;
            case 3:
                input[p1Index] = programInput;
                x += 2;
                break;
            case 4:
                output.push(input[p1Index]);
                x += 2;
                break;
            case 5:
                x = input[p1Index] != 0 ? input[p2Index] : x+3;
                break;
            case 6:
                x = input[p1Index] == 0 ? input[p2Index] : x+3;
                break;
            case 7:
                input[p3Index] = input[p1Index] < input[p2Index] ? 1 : 0;
                x += 4;
                break;
            case 8:
                input[p3Index] = input[p1Index] == input[p2Index] ? 1 : 0;
                x += 4;
                break;
        }
    }

    return output.join(' ');
}

let input = fs.readFileSync('./inputs/p5.txt', 'utf-8').split(',').map(val => parseInt(val));
console.log({
    part1: process([...input], 1),
    part2: process([...input], 5)
});