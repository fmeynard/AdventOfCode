const fs = require('fs');

function permutations(list) { // from random google
    if (list.length == 0) {
        return [[]];
    }

	let sequences = [];
	for (let i=0; i<list.length; i++) {
		let copy = [... list];

		// Cut one element from list
		let head = copy.splice(i, 1);
		
		// Permute rest of list
		permutations(copy).forEach(v => sequences.push(head.concat(v)));
	}
	
	return sequences;
}

function program(input, programInput, pointer = 0) {
    let x = pointer;
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
                //input[p1Index] = programInput.shift();
                input[input[x+1]] = programInput.shift();
                x += 2;
                break;
            case 4:
                x += 2;
                return { output: input[p1Index], pointer: x };
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

    return { output: 99, pointer: x }
}

function part1(memory, sequences) {
    return sequences.map(sequence => {
        let sequenceMemory = [...memory];
        let lastOutput = 0;

        return sequence.map(phase => lastOutput = program(sequenceMemory, [phase, lastOutput]).output).pop();
    }).sort((a,b) => b-a)[0]
}

function part2(memory, sequences) {
    return sequences.map(sequence => {
        let phases = {}, lastOutput = 0;
        
        while (true) {
            for (let phase of sequence) {       
                if (phases[phase] == undefined) {
                    phases[phase] = { memory: [...memory], params: [phase], pointer:0 };
                }
                phases[phase].params.push(lastOutput);

                let res = program(phases[phase].memory, phases[phase].params, phases[phase].pointer);
                phases[phase].pointer = res.pointer;
                if (phase == sequence[sequence.length - 1] && res.output == 99) {
                    return lastOutput;
                } 
                
                lastOutput = res.output != 99 ? res.output : lastOutput;
            }
        }
    }).sort((a,b) => b-a)[0];
}

// part1([3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0], [[4,3,2,1,0]]);
// part1([3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0], [[0,1,2,3,4]]);
// part1([3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0], [[1,0,4,3,2]]);
// part2([3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5], [[9,8,7,6,5]]);
// part2([3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10], [[9,7,8,5,6]]);


console.log({
    part1: part1(fs.readFileSync('./inputs/p7.txt', 'utf-8').split(',').map(Number), permutations([0,1,2,3,4])),
    part2: part2(fs.readFileSync('./inputs/p7.txt', 'utf-8').split(',').map(Number), permutations([5,6,7,8,9])),
})