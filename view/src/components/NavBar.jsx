import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
  UilQrcodeScan,
  UilAnalytics,
  UilUserCircle,
  UilCreateDashboard,
  UilHistoryAlt,
  UilLightbulbAlt,
  UilChart,
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
      className={`nav__bar ${!authContxt?.user && 'not-loggedIn'}`}
      style={{ display: `${!authContxt.navBarVisibiltyStatus ? 'none' : ''}` }}
    >
      {/* NOTE: Conditional rendering of the link to the home page */}
      {authContxt.user &&
        (['student', 'head_of_department', 'professor'].includes(
          authContxt.user.privilege
        ) ? (
          <NavLink
            className="navlink"
            to="/"
            style={({ isActive }) => ({
              color: isActive ? '#284b63' : '#C5C5C5',
            })}
          >
            <UilQrcodeScan size="2.5em" style={{ width: '100%' }} />
            <p>scan</p>
          </NavLink>
        ) : (
          ''
        ))}

      {/* NOTE: CONDTIONAL RENDERING FOR THE STUDENTS ATTENDED LECTURES */}
      {authContxt.user &&
        (['student'].includes(authContxt.user.privilege) ? (
          <NavLink
            className="navlink"
            to="/attendedLectures"
            style={({ isActive }) => ({
              color: isActive ? '#284b63' : '#C5C5C5',
            })}
          >
            <UilHistoryAlt size="2.5em" style={{ width: '100%' }} />
            <p>history</p>
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
              color: isActive ? '#284b63' : '#C5C5C5',
            })}
          >
            <UilLightbulbAlt size="2.5em" style={{ width: '100%' }} />
            <p>ongoing</p>
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
              color: isActive ? '#284b63' : '#C5C5C5',
            })}
          >
            <UilChart size="2.5em" style={{ width: '100%' }} />
            <p>scores</p>
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
              color: isActive ? '#284b63' : '#C5C5C5',
            })}
          >
            <UilCreateDashboard size="2.5em" style={{ width: '100%' }} />
            <p>dashBoard</p>
          </NavLink>
        ) : (
          ''
        ))}
      <NavLink
        className={'navlink'}
        to="/account/overview"
        style={({ isActive }) => ({
          color: isActive ? '#284b63' : '#C5C5C5',
        })}
      >
        <UilUserCircle size="2.5em" style={{ width: '100%' }} />
        <p>profile</p>
      </NavLink>
    </div>
  );
};

export default NavBar;
