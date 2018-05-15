module.exports = range = (c) => {
    const odds = ~~(Math.random() * (100 - 0) + 0);
    // console.log('chance:', odds, '<', c);
    return odds < c;
};