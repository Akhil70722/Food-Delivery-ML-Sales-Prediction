// src/components/ProfitAnalysis/ProfitAnalysis.jsx

import React from 'react';
import './ProfitAnalysis.css';

const ProfitAnalysis = () => {
    const profitData = [
        { month: 'January', profit: 50000 },
        { month: 'February', profit: 60000 },
        { month: 'March', profit: 70000 },
        { month: 'April', profit: 80000 },
        { month: 'May', profit: 90000 },
        { month: 'June', profit: 100000 },
        { month: 'July', profit: 110000 },
        { month: 'August', profit: 120000 },
        { month: 'September', profit: 130000 },
        { month: 'October', profit: 140000 },
        { month: 'November', profit: 150000 },
        { month: 'December', profit: 160000 },
    ];

    return (
        <div className="profit-analysis">
            <h2>Profit Analysis</h2>
            <table className="profit-table">
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Profit (in ₹)</th>
                    </tr>
                </thead>
                <tbody>
                    {profitData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.month}</td>
                            <td>₹{data.profit.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProfitAnalysis;
