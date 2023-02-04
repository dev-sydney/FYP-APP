import React from 'react';
import { UilCalender } from '@iconscout/react-unicons';
import './../styles/attendanceStyle.scss';

/**
 * This Page component renders information about all the signed attendances for a particular course
 * @returns
 */
const CourseLectures = () => {
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
      <section className="lists_section">
        <div
          className="lists__items"
          style={{
            outline: '1px solid gray',
            padding: '.3em .5em',
            borderRadius: '20px',
          }}
        >
          {[1, 2, 3, 4, 5].map((el) => (
            <div className="lecture__item">
              <div className="icon" key={el}>
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
                <h3>Operating System</h3>
                <p>{new Date('2022-11-25T23:21:15.000Z').toDateString()}</p>
              </div>
              <p className="time_passed">
                {getWeeksDiff('2022-11-25T23:21:15.000Z')}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CourseLectures;
