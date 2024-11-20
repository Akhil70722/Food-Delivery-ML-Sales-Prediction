import React, { useEffect, useState } from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import * as XLSX from 'xlsx';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ProductAnalysis = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    const loadFileData = async () => {
      try {
        const response = await fetch('../../public/sales_data.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const wb = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = wb.SheetNames[0];
        const ws = wb.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const headers = data.shift();
        const formattedData = data.map((row) => {
          const rowData = {};
          row.forEach((cell, idx) => {
            rowData[headers[idx]] = cell;
          });
          return rowData;
        });
        setFileData(formattedData);
      } catch (error) {
        console.error('Error loading the .xlsx file:', error);
      }
    };

    loadFileData();
  }, []);

  const handleProductChange = (product) => {
    setSelectedProduct(product);
    const filtered = fileData.filter(item => item['Item Name'] === product);
    setFilteredData(filtered);
  };

  const getRevenueBySeasonData = () => {
    const seasonality = [...new Set(filteredData.map(item => item['Seasonality']))];
    const revenue = seasonality.map(season =>
      filteredData.filter(item => item['Seasonality'] === season).reduce((sum, item) => sum + item['Sales Amount'], 0)
    );

    return {
      labels: seasonality,
      datasets: [
        {
          label: 'Revenue by Season',
          data: revenue,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 1
        }
      ]
    };
  };

  const getSalesByDayData = () => {
    const daysOfWeek = [...new Set(filteredData.map(item => item['Order Day of Week']))];
    const sales = daysOfWeek.map(day =>
      filteredData.filter(item => item['Order Day of Week'] === day).reduce((sum, item) => sum + item['Sales Amount'], 0)
    );

    return {
      labels: daysOfWeek,
      datasets: [
        {
          label: 'Sales by Day of Week',
          data: sales,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1
        }
      ]
    };
  };

  const getUnitsSoldData = () => {
    const itemNames = [...new Set(filteredData.map(item => item['Item Name']))];
    const unitsSold = itemNames.map(itemName =>
      filteredData.filter(item => item['Item Name'] === itemName).reduce((sum, item) => sum + item['Quantity Sold'], 0)
    );

    return {
      labels: itemNames,
      datasets: [
        {
          label: 'Units Sold',
          data: unitsSold,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }
      ]
    };
  };

  const getSalesAmountData = () => {
    const itemNames = [...new Set(filteredData.map(item => item['Item Name']))];
    const salesAmounts = itemNames.map(itemName =>
      filteredData.filter(item => item['Item Name'] === itemName).reduce((sum, item) => sum + item['Sales Amount'], 0)
    );

    return {
      labels: itemNames,
      datasets: [
        {
          data: salesAmounts,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 1
        }
      ]
    };
  };

  return (
    <div className="p-6 bg-gray-100 mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Product Analysis</h1>

      {fileData.length > 0 && (
        <select
          onChange={(e) => handleProductChange(e.target.value)}
          value={selectedProduct}
          className="block w-full max-w-md mx-auto mb-6 p-2 border rounded-md bg-white shadow"
        >
          <option value="" disabled>
            Select a Product
          </option>
          {[...new Set(fileData.map(item => item['Item Name']))].map((product, index) => (
            <option key={index} value={product}>
              {product}
            </option>
          ))}
        </select>
      )}

      {filteredData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-center mb-4">Revenue by Season</h2>
            <Bar data={getRevenueBySeasonData()} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-center mb-4">Revenue by Day of Week</h2>
            <Line data={getSalesByDayData()} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-center mb-4">Units Sold by Product</h2>
            <Doughnut data={getUnitsSoldData()} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-center mb-4">Sales Amount by Product</h2>
            <Pie data={getSalesAmountData()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAnalysis;
