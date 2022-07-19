import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpenReader,
  faScrewdriverWrench,
  faRightFromBracket,
  faPlugCirclePlus,
} from '@fortawesome/free-solid-svg-icons';

// TODO: Get loggedInUser and consume context to render Log Out/Log In

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
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <FontAwesomeIcon icon={faBookOpenReader} />
          Bookings
        </Link>

        <Link to="/search" onClick={() => setMenuOpen(false)}>
          <FontAwesomeIcon icon={faPlugCirclePlus} />
          List a Charger
        </Link>

        <Link to="/NotFound" onClick={() => setMenuOpen(false)}>
          <FontAwesomeIcon icon={faScrewdriverWrench} />
          Edit Vehicle
        </Link>
        <hr></hr>
        <Link to="/NotFound" onClick={() => setMenuOpen(false)}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          Log Out
        </Link>
      </div>
      <footer style={{ textAlign: 'center', marginBottom: '10px' }}>
        Placeholder Footer
      </footer>
    </motion.div>
  );
};
