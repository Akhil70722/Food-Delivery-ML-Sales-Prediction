import axios from 'axios';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import './SalesAnalysis.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesAnalysis = () => {
  // State for user inputs
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [totalSales, setTotalSales] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [canteen, setCanteen] = useState('');
  const [productId, setProductId] = useState('');
  const [weather, setWeather] = useState('');
  const [season, setSeason] = useState('');
  const [academicCalendar, setAcademicCalendar] = useState('');
  const [timeOfSale, setTimeOfSale] = useState('');
  const [productName, setProductName] = useState('');
  const [currentStock, setCurrentStock] = useState(0);
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);

  // Function to handle the form submission and make predictions
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const inputData = [
      parseInt(month),
      parseInt(year),
      parseFloat(totalSales),
      parseFloat(price),
      parseFloat(cost),
      canteen,
      productId,
      weather,
      season,
      academicCalendar,
      timeOfSale,
      productName,
    ];

    try {
      // Make a POST request to the model server
      const response = await axios.post('http://localhost:5000/predict', {data: inputData});

      const predictedSales = response.data.predicted_sales;
      const stockSufficient = predictedSales <= currentStock ? 'Yes' : 'No';

      // Prepare chart data (example graph showing predictions over time)
      setChartData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
          <label>Month (1-12):</label>
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
          <label>Year (e.g., 2023):</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Weather Condition (e.g., Sunny, Rainy, Snowy, Cloudy):</label>
          <input
            type="text"
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Season (e.g., Winter, Summer, Rainy):</label>
          <input
            type="text"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time of Sale (e.g., Morning, Afternoon, Evening):</label>
          <input
            type="text"
            value={timeOfSale}
            onChange={(e) => setTimeOfSale(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Academic Calendar (e.g., Exam, Holiday, Break, Fall, Summer, Spring, Winter):</label>
          <input
            type="text"
            value={academicCalendar}
            onChange={(e) => setAcademicCalendar(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Total Sales:</label>
          <input
            type="number"
            value={totalSales}
            onChange={(e) => setTotalSales(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cost:</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Canteen (A, B, C, D, E):</label>
          <input
            type="text"
            value={canteen}
            onChange={(e) => setCanteen(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product ID:</label>
          <input
            type="number"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
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
