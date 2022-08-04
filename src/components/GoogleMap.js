import React from "react";
import {
  GoogleMap as GoogleMapContainer,
  useLoadScript,
} from "@react-google-maps/api";

export const GoogleMap = ({ coordinates }) => {
  // defines styles for the map container
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  // coordinates to center the map on
  const center = {
    lat: coordinates.lat,
    lng: coordinates.lng,
  };

  // disable default UI for minimal style
  const mapOptions = {
    disableDefaultUI: true,
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMapContainer
          mapContainerStyle={containerStyle}
          center={center || { lat: 0, lng: 0 }}
          zoom={13}
          options={mapOptions}
        ></GoogleMapContainer>
      ) : (
        <div className="map-loading">Loading...</div>
      )}
    </>
  );
};
