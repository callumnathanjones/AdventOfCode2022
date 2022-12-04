import * as fs from 'fs/promises';

async function start() {
    const it = (await fs.readFile('./input.txt')).toString().matchAll(/(\d*)-(\d*),(\d*)-(\d*)/g);
    
    let resultP1 = 0;
    let resultP2 = 0;

    for (let result = it.next(); result && !result.done; result = it.next()) {
        const elfRanges = result.value.slice(1).map(str => parseInt(str));
        const min = Math.min(...elfRanges);
        const max = Math.max(...elfRanges);
        if (min === elfRanges[0] && max === elfRanges[1]) { // first elf contains second
            resultP1++;
        }
        else if (min === elfRanges[2] && max === elfRanges[3]) { // first elf contains second
            resultP1++;
        }

        if (elfRanges[0] <= elfRanges[3] && elfRanges[2] <= elfRanges[1]) {
            resultP2++;
        }
    }

    console.log(`(Part 1) Num fully contained pairs = ${resultP1}`);
    console.log(`(Part 2) Num overlaped pairs = ${resultP2}`);
};

start().catch(e => {
    console.error(e);
});