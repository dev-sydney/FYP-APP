import React, { useContext, useEffect } from 'react';
import authContext from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';

import './../styles/navStyle.scss';

const stat = 1;
/**
 * This component holds all the links ot various pages in the app
 * @returns
 */
const NavBar = () => {
  const authContxt = useContext(authContext);
  return (
    <div className={`${!authContxt.user && 'not-loggedIn'}`}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/attendances/ongoingAttendances">Ongoing</NavLink>
      <NavLink to="/me">Profile</NavLink>
      <NavLink to="/resourceManager">Resources</NavLink>
      <NavLink to="/attendance-scores">Scores</NavLink>
    </div>
  );
};

export default NavBar;
