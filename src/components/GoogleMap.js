import React from "react";
import {
  GoogleMap as GoogleMapContainer,
  useLoadScript,
} from "@react-google-maps/api";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <div
        className="search__map"
        style={{
          background: "#e0e0e0",
        }}
      >
        {isLoaded ? (
          <GoogleMapContainer
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, duration: 0.5 }}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            options={mapOptions}
          ></GoogleMapContainer>
        ) : (
          <div className="map-loading">Loading...</div>
        )}
      </div>
    </AnimatePresence>
  );
};
