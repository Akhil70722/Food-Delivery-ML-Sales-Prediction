// src/components/RevenueTracking/RevenueTracking.jsx
// import React from 'react';
import './RevenueTracking.css';
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

const RevenueTracking = () => {
  // Sample data for revenue tracking (in Rupees)
  const monthlyRevenue = [
    { month: 'January', amount: 50000 },
    { month: 'February', amount: 60000 },
    { month: 'March', amount: 75000 },
    { month: 'April', amount: 80000 },
    { month: 'May', amount: 95000 },
    { month: 'June', amount: 85000 },
    { month: 'July', amount: 90000 },
    { month: 'August', amount: 100000 },
    { month: 'September', amount: 110000 },
    { month: 'October', amount: 120000 },
    { month: 'November', amount: 115000 },
    { month: 'December', amount: 130000 },
  ];

  return (
    <div className="revenue-tracking flex gap-10 mx-auto px-20">
      <div>

        <h2>Monthly Revenue Tracking</h2>
        <table className="revenue-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Revenue (in ₹)</th>
            </tr>
          </thead>
          <tbody>
            {monthlyRevenue.map((data, index) => (
              <tr key={index}>
                <td>{data.month}</td>
                <td>₹ {data.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='h-[100%] border border-black/50 mx-10'></div>
      <RevenueTrackingCharts />
    </div>
  );
};

export default RevenueTracking;



// import React, { useState, useEffect } from 'react';
// import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  TimeScale
} from 'chart.js';

// Registering necessary components in Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  TimeScale
);

const RevenueTrackingCharts = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Simulating the fetching of sales data
      const response = await fetch('../../../public/sales_data.xlsx');
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch the file.');
      }

      const arrayBuffer = await response.arrayBuffer();
      // console.log(arrayBuffer)
      const data = new Uint8Array(arrayBuffer);
      // console.log(data)
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      // console.log(jsonData)
      const [headers, ...rows] = jsonData;
      const formattedData = rows.map((row) =>
        headers.reduce((acc, header, idx) => {
          acc[header] = row[idx];
          return acc;
        }, {})
      );

      setRevenueData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading revenue data:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("use")

    fetchData();
    // console.log(revenueData)
  }, []);

  // Convert the date from float to proper date format
  // console.log(revenueData)
  if (revenueData.length === 0) return <div>No data available for charts.</div>;

  const revenueByDate = revenueData.map(item => {
    const rawDate = item['Date'];
    const formattedDate = new Date(rawDate).toISOString(); // Convert date to ISO format
    const salesAmount = parseFloat(item['Sales Amount']) || 0; // Ensure valid number
    return {
      date: formattedDate,
      salesAmount,
    };
  });

  // Sort the revenue data by date
  revenueByDate.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate the time range (start and end dates)
  const startDate = new Date(revenueByDate[0].date);
  const endDate = new Date(revenueByDate[revenueByDate.length - 1].date);
  const totalTime = endDate - startDate;
  const categoryInterval = totalTime / 20; // Divide into 20 intervals

  // Group the sales data into 20 categories
  const categories = [];
  for (let i = 0; i < 20; i++) {
    const categoryStart = new Date(startDate.getTime() + i * categoryInterval);
    const categoryEnd = new Date(startDate.getTime() + (i + 1) * categoryInterval);

    // Filter the revenue data that falls within this category
    const filteredData = revenueByDate.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= categoryStart && itemDate < categoryEnd;
    });

    // Calculate the mean sales amount for this category
    const meanSales = filteredData.length > 0
      ? filteredData.reduce((acc, item) => acc + item.salesAmount, 0) / filteredData.length
      : 0; // Avoid division by zero

    categories.push({
      categoryStart: categoryStart.toISOString(),
      meanSales,
    });
  }

  const totalRevenueOverTimeData = {
    labels: categories.map(item => item.categoryStart),
    datasets: [
      {
        label: 'Revenue Over Time',
        data: categories.map(item => item.meanSales),
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4, // Optional: smoothens the line
      },
    ],
  };

  // Prepare the data for the chart

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Total Revenue Over Time (20 Categories)',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: (tooltipItems) => {
            const date = new Date(tooltipItems[0]?.label);
            return `Date: ${date.toLocaleDateString()}`;
          },
          label: (tooltipItem) => {
            const salesAmount = tooltipItem.raw;
            return `Mean Sales: $${salesAmount.toFixed(2)}`;
          },
        },
      },

    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day', // You can adjust the unit here ('minute', 'hour', 'day', etc.)
          tooltipFormat: 'll',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Average Revenue Amount',
        },
      },
    },
  };


  // Revenue by Customer Segment
  const revenueByCustomerSegment = revenueData.reduce((acc, item) => {
    const segment = item['Customer Segment'];
    const salesAmount = parseFloat(item['Sales Amount']);
    acc[segment] = (acc[segment] || 0) + salesAmount;
    return acc;
  }, {});
  const customerSegments = Object.keys(revenueByCustomerSegment);
  const revenueByCustomerSegmentData = {
    labels: customerSegments,
    datasets: [
      {
        label: 'Revenue by Customer Segment',
        data: customerSegments.map(segment => revenueByCustomerSegment[segment]),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  // Revenue by Item
  const revenueByItem = revenueData.reduce((acc, item) => {
    const product = item['Item Name'];
    const salesAmount = parseFloat(item['Sales Amount']);
    acc[product] = (acc[product] || 0) + salesAmount;
    return acc;
  }, {});
  const items = Object.keys(revenueByItem);
  const revenueByItemData = {
    labels: items,
    datasets: [
      {
        label: 'Revenue by Item',
        data: items.map(item => revenueByItem[item]),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
      },
    ],
  };

  // Revenue by Day of the Week
  const revenueByDay = revenueData.reduce((acc, item) => {
    const day = item['Order Day of Week'];
    const salesAmount = parseFloat(item['Sales Amount']);
    acc[day] = (acc[day] || 0) + salesAmount;
    return acc;
  }, {});
  const daysOfWeek = Object.keys(revenueByDay);
  const revenueByDayData = {
    labels: daysOfWeek,
    datasets: [
      {
        label: 'Revenue by Day of Week',
        data: daysOfWeek.map(day => revenueByDay[day]),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
      },
    ],
  };

  const revenueByLocation = revenueData.reduce((acc, item) => {
    const location = item['Geographical Location'];
    const salesAmount = parseFloat(item['Sales Amount']);
    acc[location] = (acc[location] || 0) + salesAmount;
    return acc;
  }, {});

  const locations = Object.keys(revenueByLocation);

  // Generate random colors for each location
  const generateRandomColor = () => {
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
    return randomColor;
  };

  const revenueByLocationData = {
    labels: locations,
    datasets: [
      {
        label: 'Revenue by Location',
        data: locations.map(location => revenueByLocation[location]),
        backgroundColor: locations.map(() => generateRandomColor()),
        borderColor: locations.map(() => 'rgba(0, 0, 0, 1)'), // Optional: black border around the segments
      },
    ],
  };
  if (loading) return <div>Loading charts...</div>;

  return (
    <div className='flex flex-col gap-10'>
      <h2>Revenue Tracking</h2>
      <h3>Total Revenue Over Time</h3>
      <Line data={totalRevenueOverTimeData} options={options} />;
      <h3>Revenue by Customer Segment</h3>
      <Bar data={revenueByCustomerSegmentData} />
      <h3>Revenue by Item</h3>
      <Bar data={revenueByItemData} />
      <h3>Revenue by Day of the Week</h3>
      <Bar data={revenueByDayData} />
      <h3>Revenue by Geographical Location</h3>
      <Pie data={revenueByLocationData} />
    </div>
  );
};
