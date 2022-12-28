import React, { useContext, useEffect } from 'react';
import attendanceContext from '../contexts/AttendanceContext';
import './../styles/attendanceStyle.scss';

/**
 * This component is a container that holds all the signed attendances by students
 * @param {*} param0
 * @returns
 */
const SignedAttendances = ({ ongoingAttendanceId }) => {
  const attendanceContxt = useContext(attendanceContext);

  useEffect(() => {
    attendanceContxt.getSignedAttendances(ongoingAttendanceId);
  }, [attendanceContxt.signedAttendances]);

  return (
    <div className="ongoing__container">
      {attendanceContxt.signedAttendances &&
        (attendanceContxt.signedAttendances.length > 0
          ? attendanceContxt.signedAttendances.map((signedAttendance) => (
              <div
                className="signed__card"
                key={signedAttendance.signedAttendanceId}
              >
                <img src={`/img/users/${signedAttendance.photo}`} />
                <h2>
                  {signedAttendance.surName &&
                    signedAttendance.surName.concat(
                      ` ${signedAttendance.otherNames}`
                    )}
                </h2>
                <p>{signedAttendance.indexNumber}</p>
              </div>
            ))
          : 'No one has signed attendance yet,please come back later')}
    </div>
  );
};

export default SignedAttendances;
