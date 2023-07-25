import React, { useState, useEffect, useRef } from "react";
import GoogleMapReact from 'google-map-react';
import MemberData from "./MemberData";
import loadjs from 'loadjs';

export default function GoogleMap() {
  const [apiKey, setApiKey] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const mapRef = useRef(null);
  const defaultZoom = 4.5;
  const markers = useRef([]);

  useEffect(() => {
    // Fetch your API key from an environment variable or any other method you prefer.
    const apiKeyFromEnv = 'APIKEY';
    setApiKey(apiKeyFromEnv);
    if (apiKeyFromEnv) {
      loadjs(`https://maps.googleapis.com/maps/api/js?key=${apiKeyFromEnv}&libraries=places`, {
        success: () => {
          setIsLoaded(true);
          console.log('Google Maps API loaded successfully!');
        },
        error: () => {
          setLoadError(true);
          console.error('Failed to load Google Maps API');
        },
      });
    }
    fetch('http://localhost:8080/user')
    .then(res => res.json)
    .then(data => {
      console.log('user data')
      console.log(data);
    })
  }, []);

  const codeAddress = (address) => {
    // Check if the geocoder and mapRef are available
    if (!window.google || !window.google.maps || !mapRef.current) {
      return;
    }

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status === window.google.maps.GeocoderStatus.OK) {
        // Get the updated map center
        const updatedCenter = results[0].geometry.location;

        // Check if marker for this address already exists
        const markerIndex = markers.current.findIndex(marker => marker.address === address);

        if (markerIndex !== -1) {
          // If marker exists, update its position
          markers.current[markerIndex].marker.setPosition(updatedCenter);
        } else {
          const image = '/LeaveMarker.png'
          // If marker doesn't exist, create a new marker
          const newMarker = new window.google.maps.Marker({
            map: mapRef.current,
            position: updatedCenter,
            title: address,
            icon: image
          });

          // Add the marker to the markers array
          markers.current.push({ address, marker: newMarker });
        }
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  // Check if there was an error loading the Google Maps API
  if (loadError) {
    return <div>Error loading Google Maps. Please try again later.</div>;
  }

  return (
    <main>
    <div style={{ height: '40vh', width: '100%' }}>
      {isLoaded && apiKey && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={{ lat: 39.0902, lng: -95.7129 }}
          defaultZoom={defaultZoom}
          options={{
            mapTypeId: 'hybrid'
          }}
          onGoogleApiLoaded={({ map }) => (mapRef.current = map)}
          onChange={({ center }) => {
            codeAddress('Vandenberg SFB');
            codeAddress('Peterson SFB');
          }}
        />
      )}
    </div>
    <MemberData/>
    </main>
  );
}
