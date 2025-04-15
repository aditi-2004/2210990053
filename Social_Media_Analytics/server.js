const express = require('express');
const analyticsRoutes = require('./routes/analytics');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', analyticsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});