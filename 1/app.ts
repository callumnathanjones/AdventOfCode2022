import * as fs from 'fs/promises';

async function start() {
    const elfInventoryTotals : number[] = [];

    (await fs.readFile('./input.txt')).toString().split(`\r\n`).reduce((acc : number, cur : string) => {
        const num = parseInt(cur);
        if (isNaN(num)) {
            elfInventoryTotals.push(acc);
            acc = 0;
        }
        else {
            acc += num;
        }
        return acc;
    }, 0);

    elfInventoryTotals.sort((a, b) => b - a);

    console.log(`(Part 1) The elf carrying the most calories is carrying '${elfInventoryTotals[0]}' total calories.`);
    console.log(`(Part 2) The 3 elves carrying the most calories are carrying '${elfInventoryTotals.slice(0, 3).reduce((prev, cur) => prev + cur)}' total calories.`);
};

start().catch(e => {
    console.error(e);
});