const fs = require('fs');

function program(input, programInput, pointer = 0, returnPointer = false) {
    let POSITION_MODE = 0, IMMEDIATE_MODE = 1, RELATIVE_MODE = 2;
    let ADD = 1, MULTIPLY = 2, RECEIVE = 3, SEND = 4, JUMP_IF_NOT_ZERO = 5, JUMP_IF_ZERO = 6, LOWER = 7, EQ = 8, CHANGE_RELATIVE_BASE = 9;

    let output = [];
    let relativeBase = 0;

    const getAddress = (paramNumber) => {
        let instruction = input[pointer].toString().padStart(5, '0');
        let pMode = Number(instruction.substr(-2 - paramNumber,1));

        let addr;
        switch (pMode) {
            case POSITION_MODE:
                    addr =  input[pointer + paramNumber];
                    break;
            case IMMEDIATE_MODE:
                    addr =  pointer + paramNumber;
                    break;
            case RELATIVE_MODE:
                    addr = input[pointer + paramNumber] + relativeBase;
                    break;
        }

        if (input[addr] == undefined) {
            for (let x = input.length; x <= addr; x++) {
                input.push(0);
            }
        }

        return addr;
    };

    while(input[pointer] != 99) {
        let opCode = Number(input[pointer].toString().substr(-2));
        switch (opCode) {
            case ADD:
                input[getAddress(3)] = input[getAddress(1)] + input[getAddress(2)];
                pointer += 4;
                break;
            case MULTIPLY:
                input[getAddress(3)] = input[getAddress(1)] * input[getAddress(2)];
                pointer += 4;
                break;
            case RECEIVE:
                input[getAddress(1)] = programInput.shift();
                pointer += 2;
                break;
            case SEND:
                output.push(input[getAddress(1)]);
                pointer += 2;
                break;
            case JUMP_IF_NOT_ZERO:
                pointer = input[getAddress(1)] != 0 ? input[getAddress(2)] : pointer+3;
                break;
            case JUMP_IF_ZERO:
                pointer = input[getAddress(1)] == 0 ? input[getAddress(2)] : pointer+3;
                break;
            case LOWER:
                input[getAddress(3)] = input[getAddress(1)] < input[getAddress(2)] ? 1 : 0;
                pointer += 4;
                break;
            case EQ:
                input[getAddress(3)] = input[getAddress(1)] == input[getAddress(2)] ? 1 : 0;
                pointer += 4;
                break;
            case CHANGE_RELATIVE_BASE:
                relativeBase += input[getAddress(1)]
                pointer += 2;
                break;
        }
    }

    if (!returnPointer) {
        return output;
    }

    return { output, pointer };
}

console.log({
    part1: program(fs.readFileSync('./inputs/p9.txt', 'utf-8').split(',').map(Number), [1]),
    part2: program(fs.readFileSync('./inputs/p9.txt', 'utf-8').split(',').map(Number), [2])
})