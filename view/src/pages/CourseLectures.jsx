import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UilCalender } from '@iconscout/react-unicons';

import attendanceContext from '../contexts/AttendanceContext';
import LoadingResourcesComponent from '../components/loadingComponents/LoadingResourcesComponent';

import './../styles/attendanceStyle.scss';
const stat = 1;
/**
 * This Page component renders information about all the signed attendances for a particular course
 * @returns
 */
const CourseLectures = () => {
  const attendanceContxt = useContext(attendanceContext);
  const { courseId } = useParams();

  useEffect(() => {
    attendanceContxt.getCoursesSignedAttendances(courseId);
    return () => {
      if (attendanceContxt.attendedLectures.length > 0) {
        attendanceContxt.clearSomeContextState('CLEAR_ATTENDED_LECTURES');
      }
    };
  }, [stat]);
  /**
   * This function gets the number of weeks passed between the current date & the signed attendance date
   * @param {String} startDate The date string
   * @returns The number of weeks passed as a string
   */
  const getWeeksDiff = (startDate) => {
    const weeksInMs = 1000 * 60 * 60 * 24 * 7;

    const todayInMs = new Date().getTime();
    const startDateInMs = new Date(startDate).getTime();

    let numWeeks = Math.round(Math.abs(todayInMs - startDateInMs) / weeksInMs);

    return `${numWeeks >= 1 ? `${numWeeks}w ago` : 'recent'}`;
  };

  return (
    <div className="courselectures__container">
      <section>
        <h1 style={{ textAlign: 'left', margin: '1em 0' }}>Records</h1>
      </section>
      <section className="lists_section">
        {attendanceContxt.isLoading ? (
          <LoadingResourcesComponent showControls={true} />
        ) : (
          <div
            className="lists__items"
            style={{
              outline: '1px solid gray',
              padding: '.3em .5em',
              borderRadius: '20px',
            }}
          >
            {attendanceContxt.attendedLectures &&
              (attendanceContxt.attendedLectures.length > 0
                ? attendanceContxt.attendedLectures.map((el) => (
                    <div className="lecture__item">
                      <div className="icon" key={el.signedAttendanceId}>
                        <UilCalender
                          size="45"
                          color="#1D6D1D"
                          style={{
                            padding: '.5em',
                            borderRadius: '50%',
                            background: '#1d6d1d1f',
                          }}
                        />
                      </div>
                      <div className="title_time">
                        <h3>{attendanceContxt.currentCourseName}</h3>
                        <p>{new Date(el.createdAt).toDateString()}</p>
                      </div>
                      <p className="time_passed">
                        {getWeeksDiff(el.createdAt)}
                      </p>
                    </div>
                  ))
                : 'No Results Found')}
          </div>
        )}
      </section>
    </div>
  );
};

export default CourseLectures;
