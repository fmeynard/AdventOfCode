const fs = require('fs');
const IntCodeComputer = require('./int-code-computer');

const UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3;
const TURN_LEFT = 0; //, TURN_RIGHT = 1;
const BLACK = 0, WHITE = 1;

function getNextDirection(currentDirection, turn) {
    if (currentDirection == UP) {
        return (turn == TURN_LEFT) ? LEFT : RIGHT;
    } else if (currentDirection == RIGHT) {
        return (turn == TURN_LEFT) ? UP : DOWN;
    } else if (currentDirection == DOWN) {
        return (turn == TURN_LEFT) ? RIGHT : LEFT;
    } else if (currentDirection == LEFT) {
        return (turn == TURN_LEFT) ? DOWN : UP;
    }
}

function process(input, startingColor) {
    let x = 0, y = 0;
    let direction = UP;
    let painted = [];

    let bot = new IntCodeComputer(input);
    while (bot.terminated != true) {
        let point = painted.find(p => p.x == x && p.y == y);
        let defaultColor = (x == 0 && y == 0) ? startingColor : BLACK;

        let [color, turn] = bot.run(point ? point.color : defaultColor, 2).slice(-2);

        if (!point) {
            painted.push({ x, y, color })
        } else {
            point.color = color;
        }

        switch(direction = getNextDirection(direction, turn)) {
            case UP: y++; break;
            case DOWN: y--; break;
            case LEFT: x--; break;
            case RIGHT: x++; break;
        }
    }

    return painted;
}

function part1(input) { return process(input, 0); }

function part2(input) {
    let minY = 0, maxY = 0, minX = 0, maxX = 0;
    let points = process(input, WHITE);

    for (let point of points ) {
        maxY = point.y > maxY ? point.y : maxY;
        minY = point.y < minY ? point.y : minY;
        maxX = point.x > maxX ? point.x : maxX;
        minX = point.x < minX ? point.x : minX;
    }

    for (let y = maxY; y >= minY; y--) {
        let yPoints = points.filter(p => p.y == y);
        let output = [];

        for (let x = minX; x <= maxX ; x++) {
            output.push((yPoints.find(p => p.x == x) || { color: BLACK }).color == WHITE ? '|' : ' ')
        }

        console.log(output.join(''))
    }
}

let input = fs.readFileSync('./inputs/p11.txt', 'utf-8').split(',').map(Number);

console.log('---- Part 1 ----');
console.log(part1([...input]).length);
console.log('---- Part 2 ----');
part2([...input]);