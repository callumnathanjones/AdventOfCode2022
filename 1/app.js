const fs = require('fs').promises;

async function start() {
    const elfTotalCals = (await fs.readFile('./input.txt')).toString().split(`\r\n`).reduce((prev, cur, i) => {
        const num = parseInt(cur);
        if (isNaN(num)) {
            prev[prev.length - 1] = prev.at(-1).reduce((prev, cur) => prev + cur);
            prev.push([]);
        }
        else {
            prev.at(-1).push(num);
        }
        return prev;
    }, [[]]).sort((a, b) => b - a);

    console.log(`(Part 1) The elf carrying the most calories is carrying '${elfTotalCals[0]}' total calories.`);
    console.log(`(Part 2) The elves carrying the most calories are carrying '${elfTotalCals.slice(0, 3).reduce((prev, cur) => prev + cur)}' total calories.`);
};

start().catch(e => {
    console.error(e);
});