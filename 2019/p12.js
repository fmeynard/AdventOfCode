const fs = require('fs');

function init(input) {
    let moons = input.map(current => {
        let position = {};
        current.substring(1, current.length -1).split(',').forEach(coord => {
            let [name , value] = coord.trim().split('=');

            position[name] = Number(value);
        });

        return { position, velocity: { x:0, y:0, z: 0 }};
    });

    return { moons, pairs: moons.flatMap((v, i) => moons.slice(i+1).map( w => [v, w] ))};
}

function run(moons, pairs, steps = 1) {
    for (let step = 0; step < steps; step++) {
        pairs.forEach(([p1, p2]) => {
            ['x', 'y', 'z'].forEach(key => {
                if (p1.position[key] > p2.position[key]) {
                    p1.velocity[key]--;
                    p2.velocity[key]++;
                } else if (p1.position[key] < p2.position[key]) {
                    p1.velocity[key]++;
                    p2.velocity[key]--;
                }
            });
        });

        moons.forEach(moon => ['x', 'y', 'z'].forEach(key => moon.position[key] += moon.velocity[key]));
    }

    return moons;
}

function part1(input) {
    let { moons, pairs } = init(input);

    return run(moons, pairs, 1000)
        .map(({position:p , velocity:v}) => (Math.abs(p.x) + Math.abs(p.y) + Math.abs(p.z)) * (Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z)))
        .reduce((acc, current) => acc += current, 0);
}

function part2(input) {
    let { moons, pairs } = init(input);

    const gcd = (a, b) => a ? gcd(b % a, a) : b;
    const lcm = (a, b) => a * b / gcd(a, b);

    let cycles = ['x', 'y', 'z'];
    let steps = 1;
    let res = [];
    while (cycles.length > 0) {
        run(moons, pairs);

        cycles.forEach((cycle) => {
            let toZero = 0;
            for (let m = 0; m < moons.length; m++) if (moons[m].velocity[cycle] == 0) {
                toZero++;
            }

            if (toZero == moons.length) {
                cycles = cycles.filter(c => c != cycle);
                res[cycle] = steps * 2;
            }
        });

        steps++;
    }

    return Object.values(res).reduce(lcm);
}

let input = fs.readFileSync('./inputs/p12.txt', 'utf-8').split('\n');
console.log({
    part1: part1(input),
    part2: part2(input)
});