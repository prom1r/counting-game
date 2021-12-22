const getRules = (arr) => {
    const rules = Array(arr.length);
    const middle = (arr.length - 1) / 2;
    for (let i = 0; i < arr.length; i++) {
        rules[i] = Array(arr.length);
        rules[i][i] = 'draw';
        for (let j = 0; j < arr.length - 1; j++) {
            let next = (i + j + 1) % arr.length;
            if (j < middle) {
                rules[i][next] = "You lose."
            } else {
                rules[i][next] = "You win!"
            }
        }
    }
    return rules;
}

module.exports = getRules;
