import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpenReader,
  faScrewdriverWrench,
  faRightFromBracket,
  faPlugCirclePlus,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useGlobalState } from '../context/stateContext';
// TODO: Get loggedInUser and consume context to render Log Out/Log In

export const MobileMenu = ({ setMenuOpen }) => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;

  const logout = () => {
    console.log('logging out');
    sessionStorage.clear();
    dispatch({
      type: 'setLoggedInUser',
      data: null,
    });
    dispatch({
      type: 'setToken',
      data: null,
    });
    console.log('logged out');
  };

  return (
    <motion.div
      className="mobile-menu"
      initial={{ x: '-100%' }}
      animate={{ x: '0px' }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.5 }}
    >
      {/* These change to link later */}
      <div className="mobile-menu__links">
        {loggedInUser ? (
          <>
            <Link tabIndex={0} to="/" onClick={() => setMenuOpen(false)}>
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
          </>
        ) : (
          <>
            <Link to="/auth/signup" onClick={() => setMenuOpen(false)}>
              <FontAwesomeIcon icon={faUserPlus} />
              Register
            </Link>
            <Link to="/auth/signin" onClick={() => setMenuOpen(false)}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              Log In
            </Link>
            <Link
              to="/"
              onClick={() => {
                setMenuOpen(false);
                logout();
              }}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              Log Out
            </Link>
          </>
        )}
      </div>
      <footer style={{ textAlign: 'center' }}>Placeholder Footer</footer>
    </motion.div>
  );
};
