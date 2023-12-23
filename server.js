const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/calculate', (req, res) => {
    try {
        const { matrixA, matrixB } = req.body;
        const result = multiplyMatrices(matrixA, matrixB);
        res.json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

function multiplyMatrices(matrixA, matrixB) {
    // Implement matrix multiplication logic here
    // For simplicity, I'm just returning the matrices for now
    return { matrixA, matrixB };
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
