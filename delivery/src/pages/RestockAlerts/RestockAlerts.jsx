// src/components/RestockAlerts/RestockAlerts.jsx

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './RestockAlerts.css';

const RestockAlerts = () => {
    const [data, setData] = useState({
        productName: '',
        alertQuantity: '',
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        const response = await axios.post('/api/restock-alerts/add', data);
        if (response.data.success) {
            toast.success(response.data.message);
            setData({
                productName: '',
                alertQuantity: '',
            });
        } else {
            toast.error(response.data.message);
        }
    };

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className='restock-alerts'>
            <h2>Add Restock Alert</h2>
            <form onSubmit={onSubmitHandler}>
                <input
                    name='productName'
                    onChange={onChangeHandler}
                    value={data.productName}
                    type='text'
                    placeholder='Product Name'
                    required
                />
                <input
                    name='alertQuantity'
                    onChange={onChangeHandler}
                    value={data.alertQuantity}
                    type='number'
                    placeholder='Alert Quantity'
                    required
                />
                <button type='submit'>Add Restock Alert</button>
            </form>
        </div>
    );
};

export default RestockAlerts;
