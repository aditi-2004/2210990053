const axios = require('axios');

const WINDOW_SIZE = 10;
let window = [];

async function fetchNumbers(numberId) {
    const baseUrl = 'http://20.244.56.144/evaluation-service';
    let url;
    switch (numberId) {
        case 'p': url = `${baseUrl}/primes`; break;
        case 'f': url = `${baseUrl}/fibonacci`; break;
        case 'e': url = `${baseUrl}/even`; break;
        case 'r': url = `${baseUrl}/random`; break;
        default: return [];
    }

    const startTime = Date.now();
    try {
        const response = await axios.get(url);
        const numbers = response.data.numbers || [];
        const endTime = Date.now();
        if (endTime - startTime > 500) {
            return [];
        }
        return numbers.map(num => Number(num)); // Ensure numbers are parsed
    } catch (error) {
        return [];
    }
}

function updateWindow(newNumbers) {
    const prevState = [...window];
    const uniqueNumbers = newNumbers.filter(num => !window.includes(num));
    window = [...window, ...uniqueNumbers].slice(-WINDOW_SIZE); // Keep last 10
    const currState = [...window];
    const avg = window.length > 0 ? (window.reduce((a, b) => a + b, 0) / window.length).toFixed(2) : 0.00;
    return { prevState, currState, numbers: uniqueNumbers, avg };
}

exports.getNumbers = async (req, res) => {
    const { numberId } = req.params;
    const numbers = await fetchNumbers(numberId);
    const result = updateWindow(numbers);
    res.json({
        windowPrevState: result.prevState,
        windowCurrState: result.currState,
        numbers: result.numbers,
        avg: result.avg
    });
};

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