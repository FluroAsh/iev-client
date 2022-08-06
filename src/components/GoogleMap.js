import React from "react";
import {
  GoogleMap as GoogleMapContainer,
  useLoadScript,
} from "@react-google-maps/api";

export const GoogleMap = ({ coordinates }) => {
  // Style definition for GoogleMap component
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  // Load the Google Map JavaScript given .env Google API KEY
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  // Center map on given coordinates
  const center = {
    lat: coordinates.lat,
    lng: coordinates.lng,
  };

  // Disable default UI for minimal styling
  const mapOptions = {
    disableDefaultUI: true,
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMapContainer
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          options={mapOptions}
        ></GoogleMapContainer>
      ) : (
        <div className="map-loading">Loading...</div>
      )}
    </>
  );
};
