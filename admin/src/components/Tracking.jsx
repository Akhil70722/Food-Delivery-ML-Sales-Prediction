import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibmlvLXN1cHJlbWUiLCJhIjoiY2xnOTdtaXU5MDB3MjNjcWx1bHVic3o5YiJ9.cU-7_eh35LyfMN4HrUtGEw';

const Tracking = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [deliveryLocation, setDeliveryLocation] = useState([84.9551, 24.7526]); // Example: Delivery location (change as needed)

  useEffect(() => {
    if (map.current) return; // Initialize the map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [84.9912, 24.6935], // Fixed: IIM Bodh Gaya Canteen coordinates
      zoom: 14,
    });

    map.current.on('load', () => {
      map.current.resize();
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      controls: {
        inputs: true,
        instructions: false,
      }
    });

    // Add the directions control to the map
    map.current.addControl(directions, 'top-left');

    // Set fixed origin (IIM Bodh Gaya Canteen) and dynamic destination (Delivery Partner's Location)
    directions.setOrigin([84.9912, 24.6935]); // Fixed: IIM Bodh Gaya Canteen coordinates
    directions.setDestination(deliveryLocation); // Dynamic: Delivery Partner's current location

    directions.on('route', () => {
      // Handle routing event (e.g., logging or any specific actions on route completion)
    });

  }, [deliveryLocation]); // Re-run useEffect if deliveryLocation changes

  return (
    <div className='tracking-container'>
      <div ref={mapContainer} style={{ width: '70vw', height: '70vh' }} />
      {/* Add functionality to update deliveryLocation dynamically */}
      <button onClick={() => setDeliveryLocation([84.9915, 24.6930])}>Update Delivery Location</button> {/* Example button */}
    </div>
  );
};

export default Tracking;
