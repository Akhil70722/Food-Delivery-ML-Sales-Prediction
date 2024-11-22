// src/components/ProfitAnalysis/ProfitAnalysis.jsx

import React, { useState, useEffect } from 'react';
import './ProfitAnalysis.css';
import * as XLSX from 'xlsx';
import {
  Line,
  Bar,
  Pie,
  Scatter,
  Radar,
} from 'react-chartjs-2';

// const ProfitAnalysis = () => {
//     const profitData = [
//         { month: 'January', profit: 50000 },
//         { month: 'February', profit: 60000 },
//         { month: 'March', profit: 70000 },
//         { month: 'April', profit: 80000 },
//         { month: 'May', profit: 90000 },
//         { month: 'June', profit: 100000 },
//         { month: 'July', profit: 110000 },
//         { month: 'August', profit: 120000 },
//         { month: 'September', profit: 130000 },
//         { month: 'October', profit: 140000 },
//         { month: 'November', profit: 150000 },
//         { month: 'December', profit: 160000 },
//     ];

//     return (
//         <div className="profit-analysis flex gap-10 mx-auto">
//             <div>
//                 <h2>Profit Analysis</h2>
//                 <table className="profit-table">
//                     <thead>
//                         <tr>
//                             <th>Month</th>
//                             <th>Profit (in ₹)</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {profitData.map((data, index) => (
//                             <tr key={index}>
//                                 <td>{data.month}</td>
//                                 <td>₹{data.profit.toLocaleString()}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div className='h-[100%] border border-black/50 mx-10'></div>
//             <div>
//                 <ProfitAnalysis />
//             </div>
//         </div>
//     );
// };

  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Tooltip,
    Legend,
  } from 'chart.js';

  // Register the components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Tooltip,
    Legend
  );

const ProfitAnalysis = () => {
    const [data, setData] = useState([]);

    // Load data from XLSX file
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('../../../sales_data.xlsx'); // Replace with your file path
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
      };

      fetchData();
    }, []);

    if (data.length === 0) return <div>Loading...</div>;

    // Process data for graphs
  const profitOverTime = data.map(item => ({
    date: new Date(item['Date']),
    profit: parseFloat(item['Sales Amount']) - parseFloat(item['Discount Amount']),
  }));

  // Calculate start and end date
  const startDate = profitOverTime.reduce((min, item) => (item.date < min ? item.date : min), profitOverTime[0].date);
  const endDate = profitOverTime.reduce((max, item) => (item.date > max ? item.date : max), profitOverTime[0].date);
  const totalTime = endDate - startDate;
  const interval = totalTime / 20; // Divide into 20 intervals

  // Group data into 20 intervals and calculate mean profit for each
  const categories = [];
  for (let i = 0; i < 20; i++) {
    const intervalStart = new Date(startDate.getTime() + i * interval);
    const intervalEnd = new Date(startDate.getTime() + (i + 1) * interval);

    const filteredData = profitOverTime.filter(item => item.date >= intervalStart && item.date < intervalEnd);
    const meanProfit = filteredData.reduce((sum, item) => sum + item.profit, 0) / filteredData.length || 0;

    categories.push({
      intervalStart: intervalStart.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      meanProfit,
    });
  }

    // Monthly sales profile data
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthlySales = months.map(month => ({
      month,
      profit: profitOverTime.filter(item => item.date.getMonth() === months.indexOf(month)).reduce((sum, item) => sum + item.profit, 0),
    }));

    const quantityByItem = data.reduce((acc, item) => {
      acc[item['Item Name']] = (acc[item['Item Name']] || 0) + parseInt(item['Quantity Sold'], 10);
      return acc;
    }, {});

    const profitBySegment = data.reduce((acc, item) => {
      const profit = parseFloat(item['Sales Amount']) - parseFloat(item['Discount Amount']);
      acc[item['Customer Segment']] = (acc[item['Customer Segment']] || 0) + profit;
      return acc;
    }, {});

    const discountImpact = data.map(item => ({
      discount: parseFloat(item['Discount Amount']),
      sales: parseFloat(item['Sales Amount']),
    }));

    const seasonalProfit = data.reduce((acc, item) => {
      const profit = parseFloat(item['Sales Amount']) - parseFloat(item['Discount Amount']);
      acc[item['Seasonality']] = (acc[item['Seasonality']] || 0) + profit;
      return acc;
    }, {});

    const profitOverTimeConfig = {
        labels: categories.map(item => item.intervalStart),
        datasets: [
          {
            label: 'Mean Profit Over Time',
            data: categories.map(item => item.meanProfit),
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.4)',
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.4,
          },
        ],
      };

    const quantityByItemConfig = {
      labels: Object.keys(quantityByItem),
      datasets: [
        {
          label: 'Quantity Sold',
          data: Object.values(quantityByItem),
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
        },
      ],
    };

    const profitBySegmentConfig = {
      labels: Object.keys(profitBySegment),
      datasets: [
        {
          label: 'Profit by Segment',
          data: Object.values(profitBySegment),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
          ],
        },
      ],
    };

    const discountImpactConfig = {
      datasets: [
        {
          label: 'Discount Impact on Sales',
          data: discountImpact.map(item => ({ x: item.discount, y: item.sales })),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

    const seasonalProfitConfig = {
      labels: Object.keys(seasonalProfit),
      datasets: [
        {
          label: 'Seasonal Profit',
          data: Object.values(seasonalProfit),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
          ],
        },
      ],
    };

    return (
      <div className="profit-analysis flex gap-10 mx-auto">
            <div>
                <h2>Profit Analysis</h2>
                <table className="profit-table">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Profit (in ₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthlySales.map((data, index) => (
                            <tr key={index}>
                                <td>{data.month}</td>
                                <td>₹{data.profit.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='h-[100%] border border-black/50 mx-10'></div>
            <div>
              <div>
                <h2>Profit Analysis</h2>
                <div>
                  <h3>Profit Over Time</h3>
                  <Line data={profitOverTimeConfig} />
                </div>
                <div>
                  <h3>Quantity Sold by Item</h3>
                  <Bar data={quantityByItemConfig} />
                </div>
                <div>
                  <h3>Profit by Customer Segment</h3>
                  <Pie data={profitBySegmentConfig} />
                </div>
                <div>
                  <h3>Discount Impact on Sales</h3>
                  <Scatter data={discountImpactConfig} />
                </div>
                <div>
                  <h3>Seasonal Profit Analysis</h3>
                  <Radar data={seasonalProfitConfig} />
                </div>
              </div>
            </div>
        </div>
    );
  };

export default ProfitAnalysis;
