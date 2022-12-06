import * as fs from 'fs/promises';

function createUniqueCharRegex(strLen : number) {
    let regexStr = "";

    for (let i = 0; i < strLen; i++) {
        regexStr += "([a-z])";
        if (i != strLen - 1) {
            for (let j = 0; j < i + 1; j++) {
                regexStr += `(?!\\${j + 1})`;
            }
        }
    }

    return new RegExp(regexStr, 'g');
}

async function start() {
    const input = (await fs.readFile('./input.txt')).toString();

    const regexP1 = createUniqueCharRegex(4);
    console.log(`(Part 1) ${(input.matchAll(regexP1)?.next()?.value?.index || 0) + 4}`);

    const regexP2 = createUniqueCharRegex(14);
    console.log(`(Part 2) ${(input.matchAll(regexP2)?.next()?.value?.index || 0) + 14}`);
};

start().catch(e => {
    console.error(e);
});