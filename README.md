# AdventOfCode2022
Solutions for https://adventofcode.com/2022.
Written in Typescript using Node JS.

# How to run
- You must first install Node JS (https://nodejs.org/en/download/). These solutions were written using version 18.12.1.
- Once Node JS is installed, in a terminal navigate to a numbered directory e.g. `.../AdventOfCode2022/3`.
- In the terminal, run `npm install`, this will install package dependencies. Due to the scope of these puzzles, this is mainly used for the typescript dev dependency and types.
- Then run `npx tsc`, this will compile the Typescript code into Javascript code in the `./out` directory. 
- Finally, run `node out/app.js` to run the compiled code. The process will output the puzzle answer for that day.

Alternatively, open a numbered directory in VSCode e.g. `.../AdventOfCode2022/3`, then "Run and Debug". A `.vscode/launch.json` config is provided for each days puzzle.

# Why Typescript?
These puzzle solutions could very easily be written in only Javascript. If anything, the solutions are much more involved (need to compile code and install dependencies) than they would otherwise have to be if they were just regular .js files. However, I've not had chance to try Typescript yet 🐸