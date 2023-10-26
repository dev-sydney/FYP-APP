import React, { Fragment, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* --------------------CONTEXTS IMPORT--------------------*/
import authContext from '../contexts/AuthContext';

/* --------------------COMPONENTS IMPORT--------------------*/
import OngoingAttendances from '../components/OngoingAttendances';

import './../styles/attendanceStyle.scss';

/**
 * This Page Component renders all Ongoing attendances started by the user
 * @returns
 */
const OngoingAttendancePage = () => {
  const authContxt = useContext(authContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    //EDGE-CASE: IF THE USER ISN'T LOGGED IN
    if (!authContxt.user) {
      navigateTo('/login');
    }
  }, []);
  return (
    <div className="ongoing__page">
      <h1
        style={{ textAlign: 'left', padding: '.5em .85em', color: '#3E3A3A' }}
      >
        Attendances Started,
        <br /> By You
      </h1>
      <OngoingAttendances />
    </div>
  );
};

export default OngoingAttendancePage;
