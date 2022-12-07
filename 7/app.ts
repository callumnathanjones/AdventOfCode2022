import * as fs from 'fs/promises';

interface DirTree {
    totalSize : number,
    dirs : {
        [key: string]: DirTree
    },
    files : {
        [key: string]: number
    }
}

async function start() {
    const input = (await fs.readFile('./input.txt')).toString();

    const regexP1 = /(?:dir (?<dir>[a-z]+))|(?:\$ cd (?<cd>[a-z\.]+))|(?:(?<fileSize>\d+) (?<file>[a-z\.]+))/g; // haha this looks mental
    const dirTree : DirTree = { dirs : {}, files : {}, totalSize : 0 };
    
    const regexP1Result = input.matchAll(regexP1);

    let workingDirs : DirTree[] = [dirTree];
    for (let it = regexP1Result.next(); it?.done === false; it = regexP1Result.next()) {
        const wd = workingDirs.at(-1);
        if (!wd) {
            break;
        }

        if (typeof it.value.groups?.dir === "string") {
            wd.dirs[it.value.groups?.dir] = { dirs : {}, files : {}, totalSize : 0 };
        }
        else if (typeof it.value.groups?.cd === "string") {
            const dest =  it.value.groups?.cd;
            if (dest === "..") {
                workingDirs.splice(workingDirs.length - 1, 1);
            } 
            else if (wd.dirs[dest]) {
                workingDirs.push(wd.dirs[dest]);
            }
        }
        else if (typeof it.value.groups?.fileSize === "string" && typeof it.value.groups?.file === "string") {
            const file = it.value.groups?.file;
            const fileSize = parseInt(it.value.groups?.fileSize);
            wd.files[file] = fileSize;

            for (const dir of workingDirs) {
                dir.totalSize += fileSize;
            }
        }
    }

    let p1Result = 0;
    let p2Result = Number.POSITIVE_INFINITY;

    const freeSpace = 70000000 - dirTree.totalSize;
    const p2RequiredFreeSpace = 30000000 - freeSpace;

    function ScanDir(dir : DirTree) {
        if (dir.totalSize <= 100000) {
            p1Result += dir.totalSize;
        }

        if (dir.totalSize > p2RequiredFreeSpace && dir.totalSize < p2Result) {
            p2Result = dir.totalSize;
        }

        for (const key in dir.dirs) {
            ScanDir(dir.dirs[key]);
        }
    }
    ScanDir(dirTree);

    console.log(`(Part 1) Total size of directories smaller than 100000 = ${p1Result}`);
    console.log(`(Part 2) Total size of smallest directory with enough space for the update = ${p2Result}`);
};

start().catch(e => {
    console.error(e);
});