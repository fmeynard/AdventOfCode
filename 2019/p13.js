const fs = require('fs');
const IntCodeComputer = require('./int-code-computer');

function part1(input) {
    return (new IntCodeComputer(input))
        .run()
        .reduce((c,v,i) => (v == 2 && (i+1)%3 == 0) ? c+1 : c, 0);
}

function part2(input) {
    input[0] = 2;

    let ball, paddle;
    let score = 0;

    let computer = new IntCodeComputer(input);
    while(!computer.terminated) {
        let [x,y,z] = computer.setInputs(paddle && ball ? [Math.max(-1, Math.min(ball.x - paddle.x, 1))] : [0]).run([], 3);

        if (x == -1 && y == 0) {
            score = z;
        } else if (z == 3) {
            paddle = { x, y };
        } else if (z == 4) {
            ball = { x, y };
        }
    }

    return score;
}

let input = fs.readFileSync('./inputs/p13.txt', 'utf-8').split(',').map(Number);

console.log({
    part1: part1([... input]),
    part2: part2([... input])
});
