const fs = require('fs');

function getReceipts() {
    let receipts = {}
    for (let line of fs.readFileSync('./inputs/p14.txt', 'utf-8').split('\n')) {
        let [reactives, chemicalOutput] = line.split('=>').map(v => v.trim());
        let [qty, chemical] = chemicalOutput.split(' ');
        reactives = reactives.split(',').map(reactive => {
            let [rQty, rName] = reactive.trim().split(' ');

            return { qty: rQty, name: rName };
        })

        receipts[chemical] = { qty, reactives };
    }

    return receipts;
}

function reaction(receipts, n) {
    let inventory = {};

    const triggerReaction = function (chemical, qty) {
        let ore  = 0;
        let neededRatio = Math.ceil(qty / receipts[chemical].qty);
        receipts[chemical].reactives.forEach(reactive => {
            let newQty = reactive.qty * neededRatio;
            if (reactive.name == 'ORE') {
                ore += newQty;
            } else {
                inventory[reactive.name] = inventory[reactive.name] || 0;
                if (inventory[reactive.name] < newQty) {
                    ore += triggerReaction(reactive.name, newQty - inventory[reactive.name]);
                }

                inventory[reactive.name] = inventory[reactive.name] - newQty;
            }
        })

        inventory[chemical] = (inventory[chemical] || 0) + (neededRatio * receipts[chemical].qty);

        return ore;
    }

    return triggerReaction('FUEL', n);
}

function part2(receipts, startFuel = 1000000) {
    let ore = 0, previousOre = 0, fuel = startFuel, increment = startFuel;
    let targetOre = 1e12;

    while (true) {
        previousOre = ore;
        ore = reaction(receipts, fuel);

        if (previousOre >= targetOre && ore <= targetOre && increment == 1) {
            break;
        }

        if (ore < targetOre) {
            if (ore - previousOre > previousOre) {
                increment *= 2;
            }
            fuel += increment;
        } else {
            increment = Math.ceil(increment/2);
            fuel -= increment;
        }
    }

    return fuel;
}

let receipts = getReceipts();
console.log({
    part1: reaction(receipts, 1),
    part2: part2(receipts)
});

