const fs = require('fs').promises;

const SHAPE = {
    ROCK : "ROCK",
    PAPER : "PAPER",
    SCISSORS : "SCISSORS"
}

const ACTION = {
    [SHAPE.ROCK]        :  { move : SHAPE.ROCK, losesTo : SHAPE.PAPER, beats : SHAPE.SCISSORS, score : 1 },
    [SHAPE.PAPER]       :  { move : SHAPE.PAPER, losesTo : SHAPE.SCISSORS, beats : SHAPE.ROCK, score : 2 },
    [SHAPE.SCISSORS]    :  { move : SHAPE.SCISSORS, losesTo : SHAPE.ROCK, beats : SHAPE.PAPER, score : 3 },
};

const DECODED_OPPONENT_ACTION = {
    A : ACTION.ROCK,
    B : ACTION.PAPER,
    C : ACTION.SCISSORS,
};

const GAME_RESULT = {
    WIN  : "win",
    DRAW : "draw",
    LOSE : "lose",
}

const DECODED_GAME_RESULT = {
    X : GAME_RESULT.LOSE,
    Y : GAME_RESULT.DRAW,
    Z : GAME_RESULT.WIN,
}

async function start() {
    const rpsScore = (await fs.readFile('./input.txt')).toString().split(`\r\n`).reduce((prev, cur, i) => {
        const chars = cur.split(' ');

        let winScoreResult = 0;
        if (chars.length >= 2) {
            const opponentAction = DECODED_OPPONENT_ACTION[chars[0]];
            const requiredResult = DECODED_GAME_RESULT[chars[1]];

            let playerAction = null;
            switch(requiredResult) {
                case GAME_RESULT.WIN:
                    playerAction = ACTION[opponentAction.losesTo];
                    break;

                case GAME_RESULT.DRAW:
                    playerAction = ACTION[opponentAction.move];
                    break;
                
                case GAME_RESULT.LOSE:
                    playerAction = ACTION[opponentAction.beats];
                    break;
            }

            if (opponentAction.move == playerAction.move) {
                winScoreResult = 3;
            }
            else if (opponentAction.losesTo == playerAction.move) {
                winScoreResult = 6;
            }

            return prev + playerAction.score + winScoreResult;
        }
        
        return prev;
    }, 0);

    console.log(`Following the Elf's instructions for the second column, our total Rock-Paper-Scissors score is "${rpsScore}".`);
};

start().catch(e => {
    console.error(e);
});