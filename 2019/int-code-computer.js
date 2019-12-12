class IntCodeComputer {
    POSITION_MODE = 0;
    IMMEDIATE_MODE = 1;
    RELATIVE_MODE = 2;

    ADD = 1;
    MULTIPLY = 2;
    RECEIVE = 3;
    SEND = 4;
    JUMP_IF_NOT_ZERO = 5;
    JUMP_IF_ZERO = 6;
    LOWER = 7;
    EQ = 8;
    CHANGE_RELATIVE_BASE = 9;

    constructor(memory, inputs = []) {
        this.memory = [... memory];
        this.inputs = inputs;
        this.pointer = 0;
        this.relativeBase = 0;
    }

    getAddress(paramId) {
        let instruction = this.memory[this.pointer].toString().padStart(5, '0');
        let pMode = Number(instruction.substr(-2 - paramId,1));

        let addr;
        switch (pMode) {
            case this.POSITION_MODE:
                addr = this.memory[this.pointer + paramId];
                break;
            case this.IMMEDIATE_MODE:
                addr = this.pointer + paramId;
                break;
            case this.RELATIVE_MODE:
                addr = this.memory[this.pointer + paramId] + this.relativeBase;
                break;
        }

        if (this.memory[addr] == undefined) {
            for (let x = this.memory.length; x <= addr; x++) {
                this.memory.push(0);
            }
        }

        return addr;
    }

    run(newInputs = [], breakAfter = 0) {
        this.inputs = this.inputs.concat(newInputs);

        this.output = [];
        this.terminated = false;

        while(this.terminated != true) {
            if (this.memory[this.pointer] == 99) {
                this.terminated = true;
                break;
            }

            switch (Number(this.memory[this.pointer].toString().substr(-2))) {
                case this.ADD:
                    this.memory[this.getAddress(3)] = this.memory[this.getAddress(1)] + this.memory[this.getAddress(2)];
                    this.pointer += 4;
                    break;
                case this.MULTIPLY:
                    this.memory[this.getAddress(3)] = this.memory[this.getAddress(1)] * this.memory[this.getAddress(2)];
                    this.pointer += 4;
                    break;
                case this.RECEIVE:
                    this.memory[this.getAddress(1)] = this.inputs.shift();
                    this.pointer += 2;
                    break;
                case this.SEND:
                    this.output.push(this.memory[this.getAddress(1)]);
                    this.pointer += 2;
                    break;
                case this.JUMP_IF_NOT_ZERO:
                    this.pointer = this.memory[this.getAddress(1)] != 0 ? this.memory[this.getAddress(2)] : this.pointer+3;
                    break;
                case this.JUMP_IF_ZERO:
                    this.pointer = this.memory[this.getAddress(1)] == 0 ? this.memory[this.getAddress(2)] : this.pointer+3;
                    break;
                case this.LOWER:
                    this.memory[this.getAddress(3)] = this.memory[this.getAddress(1)] < this.memory[this.getAddress(2)] ? 1 : 0;
                    this.pointer += 4;
                    break;
                case this.EQ:
                    this.memory[this.getAddress(3)] = this.memory[this.getAddress(1)] == this.memory[this.getAddress(2)] ? 1 : 0;
                    this.pointer += 4;
                    break;
                case this.CHANGE_RELATIVE_BASE:
                    this.relativeBase += this.memory[this.getAddress(1)]
                    this.pointer += 2;
                    break;
            }

            if (breakAfter > 0 && this.output.length > 0 && this.output.length % breakAfter == 0) {
                break;
            }
        }

        return this;
    }
}

module.exports = IntCodeComputer;