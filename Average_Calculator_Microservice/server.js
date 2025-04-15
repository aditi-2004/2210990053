const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to calculate the average
app.post('/calculate-average', (req, res) => {
    const { numbers } = req.body;

    if (!Array.isArray(numbers) || numbers.length === 0) {
        return res.status(400).json({ error: 'Invalid input. Please provide an array of numbers.' });
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;

    res.json({ average });
});


const calculatorRoutes = require('./routes/calculator_routes');
app.use('/api', calculatorRoutes);

// for prime , fibbonacci , even and random numbers



// Start the server
app.listen(port, () => {
    console.log(`Average Calculator Microservice is running at http://localhost:${port}`);
});