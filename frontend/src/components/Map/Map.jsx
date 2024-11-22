// src/components/Map/Map.jsx

import { APIProvider, AdvancedMarker, Pin, Map as _Map } from '@vis.gl/react-google-maps';
import PropTypes from 'prop-types';
import React from 'react';

const Map = (props) => {
  const { location, className } = props;

  const mapContainerStyle = {
    width: '100%',
    height: '400px', // Adjust height as needed
  };

  // Set initial center position for the map
  const center = {
    lat: location.lat,
    lng: location.lng,
  };

  return (
    <APIProvider
    solutionChannel="google-maps"
    apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
  >
    <_Map
      id='map'
      mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
      style={mapContainerStyle}
      className={className}
      defaultZoom={8}
      defaultCenter={center}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      mapType={'roadmap'}
    >
      <AdvancedMarker position={center}>
        <Pin
          background={"#FBBC04"}
          glyphColor={"#000"}
          borderColor={"#000"}
        />
      </AdvancedMarker>
    </_Map>
  </APIProvider>
  );
};

Map.propTypes = {
  className: PropTypes.string,
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};

export default Map;
