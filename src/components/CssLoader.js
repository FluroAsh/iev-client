import React from "react";

// CSS spinner rendered when loading state is === true in parent component
export const CssLoader = () => {
  return (
    <div className="loader-container">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
