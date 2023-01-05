import React, { useContext, useEffect } from 'react';
import { UilTimesCircle } from '@iconscout/react-unicons';
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
        (attendanceContxt.ongoingAttendances.length > 0
          ? attendanceContxt.ongoingAttendances.map((attendance) => (
              <div
                className="ongoing__card"
                key={attendance.ongoingAttendanceId}
              >
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

                  <p className="flex__2">
                    {new Date(attendance.createdAt).toDateString()}
                  </p>

                  <div className="flex__3">
                    <p>
                      {new Date(attendance.createdAt).toLocaleTimeString(
                        userLocale,
                        { timeStyle: 'short' }
                      )}{' '}
                      -{' '}
                      {new Date(attendance.endsAt).toLocaleTimeString(
                        userLocale,
                        {
                          timeStyle: 'short',
                        }
                      )}
                    </p>
                    <span
                      className={`attendance__status ${
                        new Date(attendance.endsAt).getTime() <= Date.now()
                          ? 'completed'
                          : 'ongoing'
                      }`}
                    >
                      {new Date(attendance.endsAt).getTime() <= Date.now()
                        ? 'Completed'
                        : 'Ongoing'}
                    </span>
                  </div>
                </Link>
              </div>
            ))
          : 'No attendances yet')}
    </div>
  );
};
export default OngoingAttendances;
