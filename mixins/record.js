module.exports = (self) => ({
    record: (data) => {
        self.records.push(data);
    }
});