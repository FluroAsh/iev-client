import React from 'react';


// TODO: need to make sure the links have the below so when it's clicked the MobileMenu is collapsed
// const [openDrawer, setOpenDrawer] = useState(false);
{/* <ListItem onClick={() => setOpenDrawer(false)}> */}


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
        <a href="/">Log Out</a>
      </span>
    </div>
  );
};
