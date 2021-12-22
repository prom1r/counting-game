const output = process.stdout;
const input = process.stdin;
const readline = require('readline');
const rl = readline.createInterface({ input, output });
const { printInfo, printRules, printGameResult } = require('./menu');
const { getHmac, getToken } = require('./hmac');
const myExamination = require('./validation');
const { getSecureRandom } = require("./hmac");

const inputData = process.argv.slice(2);
const key = getToken();

const validateAndStart = (variants) => {
    if (myExamination.checkLength(variants)) {
        console.log('Please enter an odd number of values, there must be more than one value.');
        rl.close();
    } else if (myExamination.repeatСheck(variants)) {
        console.log('The value should not be repeated, please check the entered data.');
        rl.close();
    } else {
        startGame(variants);
    }


}

const startGame = (variants) => {
    const computerMove = getComputerMove(variants);
    const hmac = getHmac(computerMove, key);
    console.log(`HMAC:${hmac}`);

    printInfo(variants);
    waitUserMove(variants, computerMove);
}

const getComputerMove = (variants) => {
    return variants[getSecureRandom(0, variants.length - 1)];
}

const processUserMove = (userMove, variants, computerMove) => {
    if (userMove === '0') {
        rl.close();
    } else if (userMove === '?') {
        printRules(variants);
    } else if (userMove - 1 >= variants.length) {
        console.log(`Please enter a number from 1 to ${variants.length}`);
    } else if (userMove - 1 < variants.length) {
        printGameResult(variants, userMove, computerMove, key);
        rl.close();
    }
};

const waitUserMove = (variants, computerMove) => {
    rl.on('line', (input) => {
        if (!input) {
            console.log('Please make your move.');
            return;
        }

        processUserMove(input, variants, computerMove);
    });
}

validateAndStart(inputData);
