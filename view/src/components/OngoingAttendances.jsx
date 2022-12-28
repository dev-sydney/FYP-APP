import React, { useContext, useEffect } from 'react';
import attendanceContext from './../contexts/AttendanceContext';
import { Link, useNavigate } from 'react-router-dom';
import './../styles/attendanceStyle.scss';

const OngoingAttendances = () => {
  const attendanceContxt = useContext(attendanceContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    attendanceContxt.getAttendancesStarted(navigateTo);
  }, []);

  const onCancelBtnClick = (ongoingAttendanceId) => () => {
    if (!attendanceContxt.ongoingAttendances) return;
    attendanceContxt.eraseOngoingAttendance(ongoingAttendanceId);
  };
  return (
    <div className="ongoing__container">
      {/* ----CONDITIONAL RENDERING FOR THE ONGOING ATTENDANCES---- */}
      {attendanceContxt.ongoingAttendances &&
        (attendanceContxt.ongoingAttendances.length > 0
          ? attendanceContxt.ongoingAttendances.map((attendance) => (
              <div
                className="ongoing__card"
                key={attendance.ongoingAttendanceId}
              >
                <Link
                  to={`/attendances/ongoingAttendances/${attendance.ongoingAttendanceId}/${attendance.courseId}`}
                >
                  <h2>{attendance.lectureRoom}</h2>
                  <p>Date: {new Date(attendance.createdAt).toDateString()}</p>
                  <p>
                    from: {new Date(attendance.createdAt).toLocaleTimeString()}
                  </p>

                  <p>to: {new Date(attendance.endsAt).toLocaleTimeString()}</p>
                </Link>
                <span
                  onClick={onCancelBtnClick(attendance.ongoingAttendanceId)}
                >
                  ❌
                </span>
              </div>
            ))
          : 'No attendances yet')}
    </div>
  );
};
export default OngoingAttendances;
