function process(start , end, validationFunction) {
    let count = 0;
    for (let i = start; i <= end; i++) {
        let values = i.toString().split('');
        let lowerThan = false;
        let sizes = [];
        for (let j = 0; j < values.length - 1; j++) {
            if (values[j] > values[j+1]) {
                lowerThan = true;
                break;
            }
            sizes.push({ int: values[j], val: i.split(values[j]).length - 1});
        }

        if (!lowerThan && validationFunction(sizes)) {
            count++;
        }
    }

    return count;
}

console.log({ 
    part1: process(134792,675810, (sizes) => sizes.find(curr => curr.val >= 2)),
    part2: process(134792,675810, (sizes) => {
        return sizes.find(curr => curr.val >= 2) && !(sizes.find(curr => curr.val > 2) && !sizes.find(curr => curr.val == 2));
    }) 
});