const AsciiTable = require('ascii-table');
const getRules = require('./rules');
const security = require("./hmac");

const printInfo = (variants) => {
    console.log('Available moves:');
    for (let i = 0; i < variants.length; i++) {
        console.log(`${i + 1} - ${variants[i]}`);
    }
    console.log('0 - exit');
    console.log('? - help');
}

const printRules = (variants) => {
    let table = new AsciiTable('HELP');
    table.setHeading('', ...variants);
    for (let i = 0;i < variants.length; i++){
        table.addRow(variants[i],...getRules(variants)[i]);
    }
    console.log(table.toString());
}

const printGameResult = (variants, userMove, computerMove, key) => {
    const indexUser = variants.indexOf(variants[Number(userMove) - 1]);
    const indexComputer = variants.indexOf(computerMove);

    console.log(`Your move:${variants[Number(userMove) - 1]}`);
    console.log(`Computer move: ${computerMove}`);
    console.log(getRules(variants)[indexComputer][indexUser]);
    console.log(`HMAC key:${security.getToken()}`);
}

module.exports = { printRules, printInfo, printGameResult };
