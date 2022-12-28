import React, { Fragment, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* --------------------CONTEXTS IMPORT--------------------*/
import authContext from '../contexts/AuthContext';

/* --------------------COMPONENTS IMPORT--------------------*/
import OngoingAttendances from '../components/OngoingAttendances';

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
    <Fragment>
      <h1>Attendances Started By You</h1>
      <OngoingAttendances />
    </Fragment>
  );
};

export default OngoingAttendancePage;
