module.exports = (str, len, chr=" ") => {
    str = str.toString();
    const pad = (input) => {
        if(input.length < len) {
            input+=chr;
            return pad(input);
        } else {
            return input;
        }
    }
    return pad(str);
};