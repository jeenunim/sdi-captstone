import React, { useContext, useEffect, useRef } from "react";
import GoogleMapReact from "google-map-react";
import AppContext from "../AppContext";
import loadjs from "loadjs";

export default function GoogleMap() {
  const [apiKey, setApiKey] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [loadError, setLoadError] = React.useState(false);
  const mapRef = useRef(null);
  const defaultZoom = 4.5;
  const markers = useRef([]);
  const { renderList } = useContext(AppContext);

  useEffect(() => {
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
          let image;
          member.status ? (image = `/${member.status}Marker.png`) : (image = '/PresentMarker.png');
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
    console.log(renderList);
    // Clear existing markers when renderList changes
    markers.current.forEach((markerData) => {
      markerData.marker.setMap(null);
    });
    markers.current = [];

    renderList.forEach(member => {
      console.log(member)
      const location = member.address
      console.log('member location:', location)
      if (location) {
        codeAddress(location, member);
      }
    })
  }
  
  if (renderList) {
    return (
      <main>
        <div style={{position: 'relative', height: "40vh", width: "100vw", marginTop: '-5vh' }}>
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
      </main>
    );
  }
  return null;
}
