import * as fs from 'fs/promises';

async function start() {
    const rawInputData = (await fs.readFile('./input.txt')).toString().split('\r\n\r\n');
    const rawStackData = rawInputData[0].split('\r\n');

    const header = rawStackData.splice(rawStackData.length - 1, 1)[0];
    if (!header) {
        throw new Error("no header");
    }

    let stacks : string[][] = Array([...header.matchAll(/\d/g)].length);
    for (const row of rawStackData) {
        const result = row.matchAll(/[A-Z]/g);
        for (let it = result.next(); it && it.done === false; it = result.next()) {
            if (typeof it.value.index === "number") {
                const i = (it.value.index - 1) / 4;
                stacks[i] = stacks[i] || []; 
                stacks[i].unshift(it.value[0]);
            }
        }
    }
    
    const arrangeRegexResult = rawInputData[1].matchAll(/move (\d*) from (\d*) to (\d*)/g);
    for (let it = arrangeRegexResult.next(); it && it.done === false; it = arrangeRegexResult.next()) {
        const fromIndex = parseInt(it.value[2]) - 1;
        const fromArr = stacks[fromIndex];

        const toIndex = parseInt(it.value[3]) - 1;
        const moveNum = Math.min(parseInt(it.value[1]), fromArr.length);
        if (moveNum <= 0) {
            continue;
        }

        // DEPRECATED - CrateMover 9000 (Part 1 🙂)
        // for (let i = 0; i < moveNum; i++) {
        //     if (stacks[fromIndex].length) {
        //         const popRes = stacks[fromIndex].pop();
        //         if (popRes) {
        //             stacks[toIndex].push(popRes);
        //         }
        //     }
        // }

        // CrateMover 9001
        for (const elemCopy of fromArr.splice(fromArr.length - moveNum, moveNum)) {
            stacks[toIndex].push(elemCopy);
        }
        //
    }

    console.log(stacks.map(elem => elem.at(-1)).join(''));
};

start().catch(e => {
    console.error(e);
});