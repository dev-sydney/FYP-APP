import React, { useContext, useEffect } from 'react';
import attendanceContext from '../contexts/AttendanceContext';
// import './../styles/attendanceStyle.scss';
import './../styles/signedAttendanceStyle.scss';

const stat = 1;
/**
 * This component is a container that holds all the signed attendances by students
 * @param {*} param0
 * @returns
 */
const SignedAttendances = ({ ongoingAttendanceId }) => {
  const attendanceContxt = useContext(attendanceContext);

  useEffect(() => {
    attendanceContxt.getSignedAttendances(ongoingAttendanceId);
  }, [stat]);

  return (
    <div className="signed__container">
      {attendanceContxt.signedAttendances &&
        (attendanceContxt.signedAttendances.length > 0
          ? attendanceContxt.signedAttendances.map((signedAttendance) => (
              <div
                className="signed__card"
                key={signedAttendance.signedAttendanceId}
              >
                <img
                  src={`/img/users/${signedAttendance.photo}`}
                  style={{
                    maxHeight: '5em',
                    minHeight: '5em',
                    minWidth: '5em',
                    maxWidth: '5em',
                    borderRadius: '20px',
                    marginTop: '.1em',
                  }}
                />
                <div className="name__index">
                  <h2>
                    {signedAttendance.surName &&
                      signedAttendance.surName.concat(
                        ` ${signedAttendance.otherNames}`
                      )}
                  </h2>
                  <p>{signedAttendance.indexNumber}</p>
                </div>
              </div>
            ))
          : 'No one has signed attendance yet,please come back later')}
    </div>
  );
};

export default SignedAttendances;
