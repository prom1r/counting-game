const checkLength = (variants) => {
    return variants.length % 2 == 0 || variants.length == 1;
}

const repeatСheck = (variants) => {
    return (new Set(variants)).size !== variants.length;
}
module.exports = {
    checkLength,
    repeatСheck,
}
