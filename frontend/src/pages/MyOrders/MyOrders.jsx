import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import Map from '../../components/Map/Map';
import './MyOrders.css';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [mapVisible, setMapVisible] = useState({}); // Track map visibility for each order
  const { url, token, currency } = useContext(StoreContext);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
      console.log(data);
    }
  }, [token]);

  // Toggle map visibility for a specific order
  const toggleMapVisibility = (orderId, location) => {
    setMapVisible((prevMapVisible) => ({
      ...prevMapVisible,
      [orderId]: !prevMapVisible[orderId],
    }));

    // Initialize map when toggling
    if (!mapVisible[orderId]) {
      // initMap(location, orderId); // Pass orderId to differentiate map containers
    }
  };

  // Initialize Google Map
  const initMap = (location, orderId) => {
    const mapContainer = document.getElementById(`map-${orderId}`); // Use unique ID for each map
    const map = new window.google.maps.Map(mapContainer, {
      center: location,
      zoom: 14,
    });
    new window.google.maps.Marker({
      position: location,
      map: map,
    });
  };

  // Handle Track Order button click
  const handleTrackOrderClick = (order) => {
    // Redirect to TrackOrder page with orderId as a query parameter or via route parameter
    navigate(`/track-order/${order._id}`, { state: { order } }); // Assuming the TrackOrder page accepts orderId as a parameter
  };

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className='container'>
        {data?.length > 0 ? (
          data.map((order, index) => (
            <div key={index}>
              <div className='my-orders-order'>
                <img src={assets.parcel_icon} alt='Parcel Icon' />
                <p>
                  {order.items.map((item, idx) =>
                    idx === order.items.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity}, `
                  )}
                </p>
                <p>
                  {currency}
                  {order.amount}.00
                </p>
                <p>Items: {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span> <b>{order.status}</b>
                </p>
                <p>
                  {/* Add the handleTrackOrderClick function to the button */}
                  <button onClick={() => handleTrackOrderClick(order)} style={{ padding: '2px' }}>
                    Track Order
                  </button>
                </p>

                {/* Toggle map visibility on button click */}
                {/* {order.address && (
                  <div>
                    <button onClick={() => toggleMapVisibility(order._id, { lat: order.latitude, lng: order.longitude })}  style={{ padding: '2px' }}>
                      {mapVisible[order._id] ? 'Hide Map' : 'View Map'}
                    </button>
                  </div>
                )} */}
              </div>
                {/* {order.address && (
                  <div className='delivery-location'>
                    {mapVisible[order._id] && (
                      <div style={{ width: '100%', marginTop: '10px' }}>
                        <Map location={{ lat: 1, lng: 1 }} />
                      </div>
                    )}
                  </div>
                )} */}
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
