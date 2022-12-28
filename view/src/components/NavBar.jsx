import React from 'react';
import { NavLink } from 'react-router-dom';
const NavBar = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/attendances/ongoingAttendances">Ongoing</NavLink>
      <NavLink to="/me">Profile</NavLink>
      <NavLink to="/resourceManager">Resources</NavLink>
      <NavLink to="/attendance-scores">Scores</NavLink>
    </div>
  );
};

export default NavBar;
