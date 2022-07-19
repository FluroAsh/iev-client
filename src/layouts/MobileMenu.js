import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const MobileMenu = ({ setMenuOpen }) => {
  return (
    <motion.div
      className="mobile-menu"
      initial={{ x: '-100%' }}
      animate={{ x: '0px' }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.5 }}
    >
      {/* These change to link later */}
      <div className="mobile-links">
        <div>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Bookings
          </Link>
          <Link to="/search" onClick={() => setMenuOpen(false)}>
            List a Charger
          </Link>
          <Link to="/NotFound" onClick={() => setMenuOpen(false)}>
            Edit Vehicle
          </Link>
        </div>
        <div>
          <Link to="/NotFound" onClick={() => setMenuOpen(false)}>
            Log Out
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
