import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrashAlt } from 'react-icons/fa';

const AddDeliveryPartner = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: ''
    });
    const [deliveryPartners, setDeliveryPartners] = useState([]); // Initialize as an empty array

    useEffect(() => {
        const fetchDeliveryPartners = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/delivery-partner', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response)
                // Ensure response data is an array
                setDeliveryPartners(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to fetch delivery partners');
            }
        };

        fetchDeliveryPartners();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/delivery-partner', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 201) {
                toast.success('Delivery partner created successfully!');
                setFormData({ name: '', phone: '' });
                setDeliveryPartners(prevPartners => [...prevPartners, response.data]);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create delivery partner');
        }
    };

    const handleDelete = async (name, phone) => {
        // Find the delivery partner by name and phone
        const partner = deliveryPartners.find(partner => partner.name === name && partner.phone === phone);
        console.log(partner)
        if (!partner) {
            toast.error("Delivery partner not found");
            return;
        }

        try {
            // Send delete request using the found partner's id
            const response = await axios.delete(`http://localhost:4000/api/delivery-partner/${partner._id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                toast.success('Delivery partner deleted successfully!');
                setDeliveryPartners(deliveryPartners.filter(p => p.id !== partner.id));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete delivery partner');
        }
    };


    return (
        <div className="max-w-lg mt-5 w-[60vw] mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Add Delivery Partner</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Partner
                </button>
            </form>

            <h2 className="text-xl font-semibold mt-8 mb-4">Delivery Partners</h2>
            <ul>
                {deliveryPartners.map(partner => (
                    <li key={partner.id} className="flex justify-between items-center p-4 border-b border-gray-200">
                        <span>{partner.name} - {partner.phone}</span>
                        <button
                            onClick={() => handleDelete(partner.name, partner.phone)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <FaTrashAlt />
                        </button>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddDeliveryPartner;
