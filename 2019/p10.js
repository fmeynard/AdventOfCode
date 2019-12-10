const fs = require('fs');

function part1(input) {
    let asteroids = [];
    input.forEach((line, y) => {
        line.trim().split('').forEach((point, x) => {
            if (point == '#') {
                asteroids.push({ x, y });
            }
        });
    });

    return asteroids.map(asteroid => {
        let angles = [];
        asteroids.forEach(currentAsteroid => {
            if (currentAsteroid.x != asteroid.x || currentAsteroid.y != asteroid.y) {
                angles.push(Math.atan2(currentAsteroid.y - asteroid.y, currentAsteroid.x - asteroid.x));
            }
        });

        return { x: asteroid.x, y: asteroid.y, count: [... new Set(angles)].length };
    }).sort((a,b) => b.count - a.count)[0];
}

function part2(input, startX, startY) {
    let asteroids = [];
    input.forEach((line, y) => {
        line.trim().split('').forEach((point, x) => {
            if (point == '#' && (x != startX || y != startY)) {
                asteroids.push({ 
                    x, 
                    y,
                    angle : Math.atan2(y - startY, x - startX) * (180/ Math.PI),
                    distance: Math.hypot(startX - x, startY - y),
                });
            }
        });
    });
    let angles = [... new Set(asteroids.map(ast => ast.angle).sort((a,b) => a-b))];
    let nextAngleIndex = angles.findIndex(angle => angle == -90);
    let count = 0;
    while(asteroids.length != 0) {
        let target = asteroids
            .filter(ast => ast.angle == angles[nextAngleIndex]) 
            .sort((a,b) => a.distance - b.distance);

        if (target[0]) {
            asteroids = asteroids.filter(ast => ast.x != target[0].x || ast.y != target[0].y);
            
            count++;
            if (count == 200) {
                return target[0].x * 100 + target[0].y;
            }
        }
        
        nextAngleIndex = angles[nextAngleIndex+1] != undefined ? nextAngleIndex+1 :0;
    }
}

let input = fs.readFileSync('./inputs/p10.txt', 'utf-8').split('\n');
let res1 =  part1(input);

console.log({
    part1: res1.count,
    part2: part2(input, res1.x, res1.y)
});