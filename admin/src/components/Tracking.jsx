import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibmlvLXN1cHJlbWUiLCJhIjoiY2xnOTdtaXU5MDB3MjNjcWx1bHVic3o5YiJ9.cU-7_eh35LyfMN4HrUtGEw';

const Tracking = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [72.8777, 19.076], // Example: Mumbai, India
      zoom: 10,
    });

    map.current.on('load', () => {
      map.current.resize();
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving', // Set default profile to driving
      controls: {
        inputs: true,
        instructions: false,
      }
    });

    // Add the directions control to the map
    map.current.addControl(directions, 'top-left');

    // Set source and destination locations
    directions.setOrigin([72.8777, 19.076]); // Example: Starting point
    directions.setDestination([72.8258, 18.9647]); // Example: Destination

    // Set the driving profile mode explicitly
    directions.on('route', () => {
      // Optionally, you can handle routing events here
    });

  }, []);

  return (
    <div className='w-'>
      <div ref={mapContainer} style={{ width: '70vw', height: '70vh' }} />
    </div>
  );
};

export default Tracking;
