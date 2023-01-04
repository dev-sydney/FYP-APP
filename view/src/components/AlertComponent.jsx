import React, { useContext } from 'react';
import { UilExclamationCircle, UilCheckCircle } from '@iconscout/react-unicons';
import attendanceContext from '../contexts/AttendanceContext';
import './../styles/componentsStyles.scss';
/**
 * This component renders alerts throughout the application
 * @returns
 */
const AlertComponent = () => {
  const attendanceContxt = useContext(attendanceContext);

  return (
    <div
      className={`alert__container ${
        attendanceContxt.attendanceAlert ? 'show_alert' : 'hide_alert'
      }`}
    >
      {/* NOTE: CONDITIONAL RENDERING FOR THE ALERT ICON OF THE COMPONENT */}
      {attendanceContxt.attendanceAlert &&
        (attendanceContxt.attendanceAlert.type === 'success' ? (
          <UilCheckCircle size="50" color="#12A2F3" />
        ) : (
          <UilExclamationCircle size="50" color="#F31212" />
        ))}

      {/* NOTE: CONDITIONAL RENDERING FOR THE ALERT DETAILS */}
      {attendanceContxt.attendanceAlert && (
        <div className="alert__details">
          <h2
            style={{
              color: `${
                attendanceContxt.attendanceAlert.type === 'success'
                  ? '#12A2F3'
                  : '#F31212'
              }`,
            }}
          >
            {attendanceContxt.attendanceAlert.heading}
          </h2>
          <p>{attendanceContxt.attendanceAlert.detail}</p>
        </div>
      )}
    </div>
  );
};
/* #12A2F3-> SUCCESS COLOR */
export default AlertComponent;
