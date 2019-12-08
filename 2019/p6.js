const fs = require('fs');

function process() {
    let count = 0, orbits = {}, path = [];
    fs.readFileSync('./inputs/p6.txt', 'utf-8').split('\n').forEach(line => {
        let obj = line.split(')');
        orbits[obj[1]] = obj[0]; // obj[1] is unique
    });

    Object.keys(orbits).forEach(obj => {
        let next = orbits[obj];
        let jumps = 1;
        while (next) {
            if (!path[obj]) path[obj] = [];
            path[obj][next] = jumps;
            jumps++;

            next = orbits[next];
            count++;
        }
    });

    let closestObject = Object.keys(path[orbits['YOU']])
        .filter(x => Object.keys(path[orbits['SAN']]).includes(x))
        .sort((a,b) => path[orbits['YOU']][a] - path[orbits['YOU']][b])[0];

    return [count, path[orbits['YOU']][closestObject] + path[orbits['SAN']][closestObject]];
}

let [part1, part2] = process();
console.log({ part1, part2 });
