// src/components/Map/Map.jsx

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px', // Adjust height as needed
  };

  // Set initial center position for the map
  const center = {
    lat: 40.7128, // Example: New York City
    lng: -74.0060,
  };

  return (
    <LoadScript googleMapsApiKey={ProcessingInstruction.env.AIzaSyCJbxH9d9Yyr3eM9WKhI_fJpiD6jftaK3I}> 
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12} // Adjust zoom level as needed
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
