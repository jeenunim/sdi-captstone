import React, { useContext, useEffect, useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import AppContext from "../AppContext";
import loadjs from "loadjs";
import MemberInfo from "./MemberInfo";

export default function GoogleMap() {
  const [apiKey, setApiKey] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const mapRef = useRef(null);
  const defaultZoom = 4.5;
  const markers = useRef([]);
  const { renderList } = useContext(AppContext);
  const [selectedMember, setSelectedMember] = useState(null);

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

          //Add a click event listener to open the modal when a marker is clicked
          newMarker.addListener("click", () => {
            setSelectedMember(member);
          });
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

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

  // Use an empty dependency array to ensure this effect runs only once during the initial render
  useEffect(() => {
    if (isLoaded && apiKey) {
      generateMarkers();
    }
  }, [isLoaded, apiKey]);

  // Update markers whenever the renderList changes
  useEffect(() => {
    if (isLoaded && apiKey) {
      generateMarkers();
    }
  }, [renderList]);

  const generateMarkers = () => {
    // Clear existing markers
    markers.current.forEach((markerData) => {
      markerData.marker.setMap(null);
    });
    markers.current = [];

    renderList.forEach((member) => {
      const location = member.address;
      if (location) {
        codeAddress(location, member);
      }
    });
  };

  // Check if there was an error loading the Google Maps API
  if (loadError) {
    return <div>Error loading Google Maps. Please try again later.</div>;
  }

  return (
    <main>
      <div style={{ position: 'relative', height: "45vh", width: "100vw", marginTop: '-5vh' }}>
        {isLoaded && apiKey && (
          <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey }}
            defaultCenter={{ lat: 39.0902, lng: -95.7129 }}
            defaultZoom={defaultZoom}
            options={{
              mapTypeId: "hybrid",
            }}
            onGoogleApiLoaded={({ map }) => (mapRef.current = map)}
          />
        )}
      </div>

      {selectedMember && (
        <div className="modal" style={{ display: "block", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.5)", zIndex: 999 }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "#fff", padding: "20px", borderRadius: "5px", maxWidth: "500px" }}>
            <MemberInfo memberId={selectedMember.id} />
            {/* <button onClick={() => setSelectedMember(null)}></button> */}
          </div>
        </div>
      )}
    </main>
  );
}
