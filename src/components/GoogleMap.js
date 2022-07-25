import React from "react";
import {
  GoogleMap as GoogleMapContainer,
  LoadScript,
} from "@react-google-maps/api";

export const GoogleMap = ({ coordinates }) => {
  // defines styles for the map container
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

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
    <div
      className="search__map"
      style={{
        background: "#e0e0e0",
      }}
    >
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <GoogleMapContainer
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          options={mapOptions}
        ></GoogleMapContainer>
      </LoadScript>
    </div>
  );
};
