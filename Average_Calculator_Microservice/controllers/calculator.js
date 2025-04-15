
exports.calculateAverage = (req, res) => {
    const { numbers } = req.body;

    if (!Array.isArray(numbers) || numbers.length === 0) {
        return res.status(400).json({ error: "Invalid input. Provide an array of numbers." });
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;

    res.json({ average });
};

exports.healthCheck = (req, res) => {
    res.json({ status: "OK" });
};