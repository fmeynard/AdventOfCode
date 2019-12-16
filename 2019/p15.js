const fs = require('fs');
const IntCodeComputer = require('./int-code-computer');

function run() {
    let initMemory = fs.readFileSync('./inputs/p15.txt', 'utf-8').split(',').map(Number);

    let directions = [1,2,3,4];
    let finish = false;
    let paths = [{ path: '', directions: [] }]; // { path: [1,1,..,3,4], directions: [1,2,3,4] }
    let currentPath = '', oxygenPath = '';
    let computers = {};

    const getReverseDir = function(dir) {
        switch (dir) {
            case 1: return 2;
            case 2: return 1;
            case 3: return 4;
            case 4: return 3;
        }
    }


    while (!finish) {
        let path = paths.find(p => p.path == currentPath);
        let nextInput = directions.filter(x => !path.directions.includes(x))[0];

        path.directions.push(nextInput);

        let computer = computers[currentPath]
            ? computers[currentPath].clone()
            : new IntCodeComputer([... initMemory], path.path.split('').map(Number));

        switch(out = computer.run([nextInput]).pop()) {
            case 2:
            case 1:
                currentPath += '' + nextInput.toString();
                computers[currentPath] = computer;
                paths.push({ path: currentPath, directions: [getReverseDir(nextInput)] });
                break;
            case 0:
                if (path.directions.length == directions.length) {
                    path = paths.find(p => p.directions.length != directions.length);
                    if (path) {
                        currentPath = path.path;
                    } else {
                        finish = true;
                    }
                }
                break;
        }

        if (out == 2) {
            oxygenPath = currentPath;
        }
    }

    paths.sort((a,b) => b.path.length - a.path.length);

    console.log({
        part1: oxygenPath.length,
        part2: paths.length - (2 * (oxygenPath.length-2)) + 1
    });
}

run();