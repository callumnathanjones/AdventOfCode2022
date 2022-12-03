import * as fs from 'fs/promises';

function asciiToPriority(charCode : number) {
    return charCode > 90 ? charCode - 96 : charCode - 64 + 26; // super epic hardcoding mode 💪
}

async function start() {
    const elfRucksacks = (await fs.readFile('./input.txt')).toString().split(`\r\n`);

    const resultP1 = elfRucksacks.reduce((acc : number, cur : string) => {
        const halfLength = Math.floor(cur.length / 2);
        let matchingScore = 0;

        for (let i = 0; i < halfLength; i++) {
            const testChar = cur[i];
            if (cur.indexOf(testChar, halfLength) >= 0) {
                matchingScore = asciiToPriority(testChar.charCodeAt(0));
                break;
            }
        }

        return acc + matchingScore;
    }, 0);

    console.log(`(Part 1) Total priority sum is ${resultP1}`);

    let resultP2 = 0;
    for (let i = 0; i < elfRucksacks.length; i += 3) {
        for (const testChar of elfRucksacks[i]) {
            if (elfRucksacks[i + 1].indexOf(testChar) >= 0 && elfRucksacks[i + 2].indexOf(testChar) >= 0) {
                resultP2 += asciiToPriority(testChar.charCodeAt(0));
                break;
            }
        }
    }

    console.log(`(Part 2) Total group badge priority sum is ${resultP2}`);
};

start().catch(e => {
    console.error(e);
});