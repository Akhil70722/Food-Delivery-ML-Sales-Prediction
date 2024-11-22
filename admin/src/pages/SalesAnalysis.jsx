import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SalesAnalysis.css';
import * as tf from '@tensorflow/tfjs';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesAnalysis = () => {
  // State for user inputs
  const [productName, setProductName] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [weather, setWeather] = useState('');
  const [season, setSeason] = useState('');
  const [timeOfSale, setTimeOfSale] = useState('');
  const [currentStock, setCurrentStock] = useState('');
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Load the model when the component mounts
    const loadModel = async () => {
      try {
        // Load the pre-trained model (you can train a model on your server and use it here)
        const model = await tf.loadLayersModel('model.json'); // Replace with the path to your model
        setModel(model);
      } catch (error) {
        console.error('Error loading the model:', error);
      }
    };
    
    loadModel();
  }, []);

  // Function to handle the form submission and make predictions
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const inputData = [
      parseInt(month),
      parseInt(year),
      weather === 'sunny' ? 1 : 0, // Example: encode weather as binary
      season === 'summer' ? 1 : 0, // Example: encode season as binary
      parseInt(timeOfSale),
      parseInt(currentStock),
    ];

    try {
      // Predict using the model
      const tensorInput = tf.tensor([inputData]); // Convert input to tensor
      const prediction = model.predict(tensorInput); // Get model prediction

      // Assuming the output has the predicted sales
      const predictedSales = prediction.dataSync()[0]; 
      const stockSufficient = predictedSales <= currentStock ? 'Yes' : 'No';

      // Prepare chart data (example graph showing predictions over time)
      setChartData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Example months
        datasets: [
          {
            label: 'Predicted Sales',
            data: [10, 20, 30, 40, 50, predictedSales], // Replace with actual prediction data
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      });

      setResult({ predictedSales, stockSufficient });

    } catch (error) {
      console.error('Error during prediction:', error);
    }
  };

  // Render the form and the prediction results
  return (
    <div className="sales-analysis">
      <h2>Sales Analysis</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Month:</label>
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            min="1"
            max="12"
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Weather Condition:</label>
          <input
            type="text"
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Season:</label>
          <input
            type="text"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time of Sale (24-hour format):</label>
          <input
            type="number"
            value={timeOfSale}
            onChange={(e) => setTimeOfSale(e.target.value)}
            min="0"
            max="23"
            required
          />
        </div>
        <div>
          <label>Current Stock:</label>
          <input
            type="number"
            value={currentStock}
            onChange={(e) => setCurrentStock(e.target.value)}
            required
          />
        </div>
        <button type="submit">Predict Sales</button>
      </form>

      {result && (
        <div className="prediction-result">
          <p>Predicted Sales: {result.predictedSales}</p>
          <p>Stock Sufficient: {result.stockSufficient}</p>
        </div>
      )}

      {chartData && (
        <div className="sales-chart">
          <h3>Predicted Sales Over Time</h3>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default SalesAnalysis;
