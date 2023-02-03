import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
  UilEstate,
  UilAnalytics,
  UilUserCircle,
  UilCreateDashboard,
  UilHistoryAlt,
} from '@iconscout/react-unicons';

import authContext from '../contexts/AuthContext';

import './../styles/navStyle.scss';

/**
 * This component holds all the links ot various pages in the app
 * @returns
 */
const NavBar = () => {
  const authContxt = useContext(authContext);
  return (
    <div
      className={`nav__bar ${!authContxt.user && 'not-loggedIn'}`}
      style={{ display: `${!authContxt.navBarVisibiltyStatus ? 'none' : ''}` }}
    >
      <NavLink to="/">
        <UilEstate size="35" color="#1D2021" />
      </NavLink>

      {/* NOTE: CONDTIONAL RENDERING FOR THE STUDENTS ATTENDED LECTURES */}
      {authContxt.user &&
        (['student'].includes(authContxt.user.privilege) ? (
          <NavLink to="/attendedLectures">
            <UilHistoryAlt size="35" color="#1D2021" />
          </NavLink>
        ) : (
          ''
        ))}

      {/* NOTE: CONDTIONAL RENDERING FOT THE ONGOING ATTENDANCES LINK */}
      {authContxt.user &&
        (['professor', 'head_of_department'].includes(
          authContxt.user.privilege
        ) ? (
          <NavLink to="/attendances/ongoingAttendances">
            <UilHistoryAlt size="35" color="#1D2021" />
          </NavLink>
        ) : (
          ''
        ))}

      {/* NOTE: CONDTIONAL RENDERING FOT THE ONGOING ATTENDANCES LINK */}
      {authContxt.user &&
        (['professor', 'head_of_department'].includes(
          authContxt.user.privilege
        ) ? (
          <NavLink to="/attendance-scores">
            <UilAnalytics size="35" color="#1D2021" />
          </NavLink>
        ) : (
          ''
        ))}

      {/* NOTE: CONDITIONAL RENDERING FOR RESOURCE MANAGER LINK */}
      {authContxt.user &&
        (['admin', 'head_of_department'].includes(authContxt.user.privilege) ? (
          <NavLink to="/resourceManager">
            <UilCreateDashboard size="35" color="#1D2021" />
          </NavLink>
        ) : (
          ''
        ))}
      <NavLink to="/me">
        <UilUserCircle size="35" color="#1D2021" />
      </NavLink>
    </div>
  );
};

export default NavBar;
