const express = require('express');
const app = express();
const port = 9876; // Match test case port

app.use(express.json());
app.use('/api', require('./routes/calculator_routes'));

app.listen(port, () => {
    console.log(`Average Calculator Microservice is running at http://localhost:${port}`);
});