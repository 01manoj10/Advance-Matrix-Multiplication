import React, { useState } from 'react';
import './App.css';

function App() {
    const [matrixA, setMatrixA] = useState([]);
    const [matrixB, setMatrixB] = useState([]);
    const [result, setResult] = useState(null);

    const multiplyMatrices = async () => {
        try {
            const response = await fetch('http://localhost:5000/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ matrixA, matrixB }),
            });

            const data = await response.json();
            setResult(data.result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderMatrixInput = (matrix, setMatrix) => {
        return (
            <table>
                {matrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((value, colIndex) => (
                            <td key={colIndex}>
                                <input
                                    type="number"
                                    value={value}
                                    onChange={(e) => {
                                        const updatedMatrix = [...matrix];
                                        updatedMatrix[rowIndex][colIndex] = e.target.value;
                                        setMatrix(updatedMatrix);
                                    }}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </table>
        );
    };

    return (
        <div className="App">
            <h2>Matrix Multiplication Calculator</h2>

            <div>
                <h3>Matrix A:</h3>
                {renderMatrixInput(matrixA, setMatrixA)}

                <h3>Matrix B:</h3>
                {renderMatrixInput(matrixB, setMatrixB)}
            </div>

            <button onClick={multiplyMatrices}>Calculate</button>

            {result && (
                <div>
                    <h3>Result:</h3>
                    <div>
                        {/* Display the result matrices */}
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
