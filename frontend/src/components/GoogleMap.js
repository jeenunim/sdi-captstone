import React, { useState, useEffect, useRef, useContext } from "react";
import GoogleMapReact from "google-map-react";
import MemberData from "./MemberData";
import loadjs from "loadjs";
import AppContext from "../AppContext";

export default function GoogleMap() {
  const [apiKey, setApiKey] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const mapRef = useRef(null);
  const defaultZoom = 4.5;
  const markers = useRef([]);

  const [isLoading, setIsLoading] = useState(true);


  const {
    membersList,
    locationsList,
    mergedList,
  } = useContext(AppContext);

  useEffect(() => {
    // Fetch your API key from an environment variable or any other method you prefer.
    const apiKeyFromEnv = process.env.REACT_APP_API_KEY;
    setApiKey(apiKeyFromEnv);
    if (apiKeyFromEnv) {
      loadjs(
        `https://maps.googleapis.com/maps/api/js?key=${apiKeyFromEnv}&libraries=places`,
        {
          success: () => {
            setIsLoaded(true);
            console.log("Google Maps API loaded successfully!");
          },
          error: () => {
            setLoadError(true);
            console.error("Failed to load Google Maps API");
          },
        }
      );
    }
  }, []);

  const codeAddress = (address, member) => {
    // Check if the geocoder and mapRef are available
    if (!window.google || !window.google.maps || !mapRef.current) {
      return;
    }

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address }, function (results, status) {
      if (status === window.google.maps.GeocoderStatus.OK) {
        // Get the updated map center
        const updatedCenter = results[0].geometry.location;

        // Check if marker for this address already exists
        const markerIndex = markers.current.findIndex(
          (marker) => marker.address === address
        );

        if (markerIndex !== -1) {
          // If marker exists, update its position
          markers.current[markerIndex].marker.setPosition(updatedCenter);
        } else {
          const image = `/${member.status}Marker.png`;
          const name = `${member.first_name} ${member.last_name}`
          // If marker doesn't exist, create a new marker
          const newMarker = new window.google.maps.Marker({
            map: mapRef.current,
            position: updatedCenter,
            title: name,
            icon: image,
          });

          // Add the marker to the markers array
          markers.current.push({ address, marker: newMarker });
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  // Check if there was an error loading the Google Maps API
  if (loadError) {
    return <div>Error loading Google Maps. Please try again later.</div>;
  }


  const generateMarkers = () => {
    mergedList.forEach(member => {
      console.log(member)
      const location = member.location
      codeAddress(location, member);
    })
  }

  return (
    <main>
      <div style={{ height: "40vh", width: "100%" }}>
        {isLoaded && apiKey && (
          <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey }}
            defaultCenter={{ lat: 39.0902, lng: -95.7129 }}
            defaultZoom={defaultZoom}
            options={{
              mapTypeId: "hybrid",
            }}
            onGoogleApiLoaded={({ map }) => (mapRef.current = map)}
            onChange={({ center }) => {
              generateMarkers();
            }}
          />
        )}
      </div>
      <MemberData />
    </main>
  );
}
