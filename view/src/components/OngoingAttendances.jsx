import React, { useContext, useEffect } from 'react';
import { UilEllipsisH } from '@iconscout/react-unicons';
import { Link, useNavigate } from 'react-router-dom';
import attendanceContext from './../contexts/AttendanceContext';
import './../styles/attendanceStyle.scss';
const stat = 1;
const OngoingAttendances = () => {
  const attendanceContxt = useContext(attendanceContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    attendanceContxt.getAttendancesStarted(navigateTo);
  }, [stat]);

  const onCancelBtnClick = (ongoingAttendanceId) => () => {
    if (!attendanceContxt.ongoingAttendances) return;
    attendanceContxt.eraseOngoingAttendance(ongoingAttendanceId);
  };

  const userLocale =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;
  return (
    <div className="ongoing__container">
      {/* ----CONDITIONAL RENDERING FOR THE ONGOING ATTENDANCES---- */}
      {attendanceContxt.ongoingAttendances &&
        attendanceContxt.ongoingAttendances.length > 0 &&
        attendanceContxt.ongoingAttendances.map((attendance) => (
          <div className="ongoing__card" key={attendance.ongoingAttendanceId}>
            <Link
              to={`/attendances/ongoingAttendances/${attendance.ongoingAttendanceId}/${attendance.courseId}`}
            >
              <div className="flex__1">
                <h2>{attendance.lectureRoom}</h2>
                <span
                  onClick={onCancelBtnClick(attendance.ongoingAttendanceId)}
                  className="more"
                >
                  <UilEllipsisH color="#656464" size="20" />
                </span>
              </div>

              <p className="flex__2" style={{ color: '#284b63' }}>
                {new Date(attendance.createdAt).toDateString()}
              </p>

              <div className="flex__3">
                <p>
                  {new Date(attendance.createdAt).toLocaleTimeString(
                    userLocale,
                    { timeStyle: 'short' }
                  )}{' '}
                  -{' '}
                  {new Date(attendance.endsAt).toLocaleTimeString(userLocale, {
                    timeStyle: 'short',
                  })}
                </p>
                <div
                  className={`attendance__status ${
                    new Date(attendance.endsAt).getTime() <= Date.now()
                      ? 'completed'
                      : 'ongoing'
                  }`}
                >
                  {new Date(attendance.endsAt).getTime() <= Date.now()
                    ? 'Completed'
                    : 'Ongoing'}
                </div>
              </div>
            </Link>
          </div>
        ))}
      {/* NOTE: CONDITONAL RENDERING FOR WHEN THERE ARE NO ONGOING ATTENDANCES */}
      {!attendanceContxt.ongoingAttendances ||
      attendanceContxt.ongoingAttendances.length <= 0 ? (
        <div className="no__attendances__container">
          <img
            src="/img/empty-box.png"
            width={'100%'}
            className="empty__box__illustration"
          />
          <h2>No Attendances</h2>
          <p>Let's get started, shall we ?</p>
          <Link to="/">Start Attendance</Link>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
export default OngoingAttendances;
