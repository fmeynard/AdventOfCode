const fs = require('fs');

function toLayers(input, width, height) {
    let layers = [];
    for (let x=0; x < input.length; x = x + ( height * width)) {
        layers.push(input.slice(x, x + ( height * width)));
    }

    return layers;
}

function part1(input, width, height) {
    let res = toLayers(input, width, height).map(layer => {
        return {
            layer,
            count0: layer.filter(value => value == 0).length,
            count1: layer.filter(value => value == 1).length,
            count2: layer.filter(value => value == 2).length
        }
    })
    .sort((a,b) => a.count0 - b.count0)[0];

    return res.count1 * res.count2;
}

function part2(input, width, height) {
    let layers = toLayers(input, width, height);
    let points = [];
    for (let x = 0; x < height * width; x++) {
        for (let color of layers.map(layer => layer[x])) {
            if (color != 2) {
                points.push(color == 0 ? ' ' : '|')
                break;
            }
        }
    }

    let currentLine = '';
    points.forEach(point => {
        currentLine = currentLine + point;
        if (currentLine.length == width) {
            console.log(currentLine);
            currentLine = '';
        }
    });
}

console.log(part1(fs.readFileSync('./inputs/p8.txt', 'utf-8').split('').map(Number), 25 ,6));
part2(fs.readFileSync('./inputs/p8.txt', 'utf-8').split('').map(Number), 25 ,6);