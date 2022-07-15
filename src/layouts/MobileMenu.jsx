import React from 'react';

export const MobileMenu = () => {
  return (
    <div className="mobile-menu">
      <ul>
        {/* These change to link later */}
        <li>Bookings</li>
        <li>List a Charger</li>
        <li>Edit Vehicle</li>
      </ul>
      <span>
        <a href="">Log Out</a>
      </span>
    </div>
  );
};
