const fs = require('fs');

function getCoords(instructions) {
    let x = 0, y = 0, steps = 0;
    let coords = [];
    instructions.split(',').forEach(instruction => {
        let value = parseInt(instruction.substring(1));

        for (let i = 0; i<=value; i++, steps++) {
            coords.push({x,y, steps});

            if (i == value) {
                break;
            }

            switch (instruction.substring(0,1)) {
                case 'U': y++; break;
                case 'D': y--; break;
                case 'R': x++; break;
                case 'L': x--; break;
            }
        }
    });

    return coords;
}

function part1() {
    let wires = fs.readFileSync('./inputs/p3.txt', 'utf-8').split('\n').map(getCoords);

    let res = wires[0]
        .filter(value => wires[1].findIndex(current => (current.x == value.x && current.y == value.y)) > 0)
        .map(value => {
            value.distance = Math.abs(0 - value.x) + Math.abs(0 - value.y);

            return value;
        })
        .sort((a,b) =>  a.distance > b.distance ? 1 : -1);

    console.table(res[0]);
}

function part2() {
    let wires = fs.readFileSync('./inputs/p3.txt', 'utf-8').split('\n').map(getCoords);

    const findCoord = (a,b) => a.x == b.x && a.y == b.y ;
    let res = wires[0]
        .filter(value => wires[1].findIndex(v => findCoord(v, value)) > 0)
        .map(value => {
            return {
                x: value.x,
                y: value.y,
                steps: wires[0].find(v => findCoord(v, value)).steps + wires[1].find(v => findCoord(v, value)).steps
            };
        })
        .sort((a,b) =>  a.steps > b.steps ? 1 : -1);


    console.table(res[0]);
}

part1();
part2();