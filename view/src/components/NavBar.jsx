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
      <NavLink
        className="navlink"
        to="/"
        style={({ isActive }) => ({
          color: isActive ? 'black' : 'gray',
        })}
      >
        <UilEstate size="35" style={{ width: '100%' }} />
        <p>Home</p>
      </NavLink>

      {/* NOTE: CONDTIONAL RENDERING FOR THE STUDENTS ATTENDED LECTURES */}
      {authContxt.user &&
        (['student'].includes(authContxt.user.privilege) ? (
          <NavLink
            className="navlink"
            to="/attendedLectures"
            style={({ isActive }) => ({
              color: isActive ? 'black' : 'gray',
            })}
          >
            <UilHistoryAlt size="35" style={{ width: '100%' }} />
            <p>History</p>
          </NavLink>
        ) : (
          ''
        ))}

      {/* NOTE: CONDTIONAL RENDERING FOT THE ONGOING ATTENDANCES LINK */}
      {authContxt.user &&
        (['professor', 'head_of_department'].includes(
          authContxt.user.privilege
        ) ? (
          <NavLink
            className="navlink"
            to="/attendances/ongoingAttendances"
            style={({ isActive }) => ({
              color: isActive ? 'black' : 'gray',
            })}
          >
            <UilHistoryAlt size="35" style={{ width: '100%' }} />
            <p>Ongoing</p>
          </NavLink>
        ) : (
          ''
        ))}

      {/* NOTE: CONDTIONAL RENDERING FOT THE ONGOING ATTENDANCES LINK */}
      {authContxt.user &&
        (['professor', 'head_of_department'].includes(
          authContxt.user.privilege
        ) ? (
          <NavLink
            className="navlink"
            to="/attendance-scores"
            style={({ isActive }) => ({
              color: isActive ? 'black' : 'gray',
            })}
          >
            <UilAnalytics size="35" style={{ width: '100%' }} />
            <p>Scores</p>
          </NavLink>
        ) : (
          ''
        ))}

      {/* NOTE: CONDITIONAL RENDERING FOR RESOURCE MANAGER LINK */}
      {authContxt.user &&
        (['admin', 'head_of_department'].includes(authContxt.user.privilege) ? (
          <NavLink
            className="navlink"
            to="/resourceManager"
            style={({ isActive }) => ({
              color: isActive ? 'black' : 'gray',
            })}
          >
            <UilCreateDashboard size="35" style={{ width: '100%' }} />
            <p>DashBoard</p>
          </NavLink>
        ) : (
          ''
        ))}
      <NavLink
        className={'navlink'}
        to="/me"
        style={({ isActive }) => ({
          color: isActive ? 'black' : 'gray',
        })}
      >
        <UilUserCircle size="35" style={{ width: '100%' }} />
        <p>Me</p>
      </NavLink>
    </div>
  );
};

export default NavBar;
