function process(start , end, callBack) {
    let count = 0;
    for (let i = start; i <= end; i++) {
        let values = i.toString().split('').sort();
        if (values.join('') == i.toString()) {
            let sizes = [... new Set(values)].map(int => { // [... new Set(values)] <=> array_unique
                return { int, val: i.toString().split(int).length - 1}
            });
    
            if (sizes.find(curr => curr.val >= 2) && (!callBack || callBack(sizes))) {
                count++;
            }
        }
    }

    return count;
}

console.table({ 
    part1: process(134792,675810),
    part2: process(134792,675810, (sizes) => !(sizes.find(curr => curr.val > 2) && !sizes.find(curr => curr.val == 2)))
});