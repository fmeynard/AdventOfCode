const fs = require('fs');
const IntCodeComputer = require('./int-code-computer');

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

function part1(input, sequences) {
    return sequences.map(sequence => {
        let lastOutput = 0;

        return sequence.map(phase => lastOutput = (new IntCodeComputer(input, [phase, lastOutput])).run().pop()).pop();
    }).sort((a,b) => b-a)[0];
}

function part2(input, sequences) {
    return sequences.map(sequence => {
        let programs = sequence.map((phase) => new IntCodeComputer(input, [phase]));
        let lastOutput = 0, nextAmp = 0;

        while(programs[sequence.length -1].terminated != true) {
            lastOutput =  programs[nextAmp].run([lastOutput], 1).pop() || lastOutput;

            nextAmp = (nextAmp >= sequence.length-1) ? 0 : nextAmp+1;
        }

        return lastOutput;
    }).sort((a,b) => b-a)[0];
}

let input = fs.readFileSync('./inputs/p7.txt', 'utf-8').split(',').map(Number);
console.log({
    part1: part1(input, permutations([0,1,2,3,4])),
    part2: part2(input, [[9,8,7,6,5]])
});