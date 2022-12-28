import React, { useContext, useEffect } from 'react';
import authContext from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';

import './../styles/navStyle.scss';

/**
 * This component holds all the links ot various pages in the app
 * @returns
 */
const NavBar = () => {
  const authContxt = useContext(authContext);
  return (
    <div className={`${!authContxt.user && 'not-loggedIn'}`}>
      <NavLink to="/">Home</NavLink>
      {/* NOTE: CONDITTIONAL RENDERING FOR PRIVILEGE-SPECIFIC LINKS (for professors and heads of dept.) */}
      {authContxt.user &&
        (['professor', 'head_of_department'].includes(
          authContxt.user.privilege
        ) ? (
          <span>
            <NavLink to="/attendances/ongoingAttendances">Ongoing</NavLink>
            <NavLink to="/attendance-scores">Scores</NavLink>
          </span>
        ) : (
          ''
        ))}

      <NavLink to="/me">Profile</NavLink>
      {authContxt.user &&
        (['admin', 'head_of_department'].includes(authContxt.user.privilege) ? (
          <NavLink to="/resourceManager">Resources</NavLink>
        ) : (
          ''
        ))}
    </div>
  );
};

export default NavBar;
