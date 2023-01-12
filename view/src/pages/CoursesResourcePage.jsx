import React, { useContext, useEffect, useState } from 'react';
import {
  UilTimes,
  UilFileEditAlt,
  UilBookMedical,
} from '@iconscout/react-unicons';
import resourceContext from '../contexts/ResourceContext';
const stat = 1;

const CoursesResourcePage = () => {
  const resourceContxt = useContext(resourceContext);

  const [formData, setFormData] = useState({ facultyId: 0 });
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    resourceContxt.loadAllFaculties();
  }, [stat]);

  /**
   *The Faculties Select-Option Input:
   *This "onChange" event handler loads all the courses belonging to the selected faculty
   * @param {Object} e The event Object
   */
  const onFacultySelectChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    resourceContxt.loadAllCourses(e.target.value);
  };

  return (
    <div className="course_resource__container">
      <section className="heading_btn__section">
        <div className="icon">
          <UilBookMedical
            size="45"
            color="#8E18B9"
            style={{
              padding: '.5em',
              outline: '1px solid gray',
              borderRadius: '50%',
              background: '#8e18b930',
            }}
            onClick={() => {
              setIsModalActive(!isModalActive);
            }}
          />
        </div>
        <h1>
          Manage
          <br />
          Courses
        </h1>
        <form className="courses_control__form">
          <select
            id="faculty"
            name="facultyId"
            required
            onChange={onFacultySelectChange}
            className={`form__input`}
          >
            <option>Faculty</option>
            {/*EDGE-CASE: IF THERES NO FACULTIES LOADED YET RENDER "LOADING..."  */}
            {!resourceContxt.faculties ? (
              <option> loading... </option>
            ) : (
              resourceContxt.faculties.map((faculty) => (
                <option value={faculty.facultyId} key={faculty.facultyId}>
                  {faculty.facultyName}
                </option>
              ))
            )}
          </select>
        </form>
      </section>

      <section className="lists__section">
        {resourceContxt.courses &&
          (resourceContxt.courses.length > 0
            ? resourceContxt.courses.map((course) => (
                <div className="list__item" key={course.courseId}>
                  <div className="icon">
                    <UilTimes size="30" color="#CA1414" />
                  </div>
                  <div className="course__info">
                    <div className="coursename__code">
                      <h2 style={{ textAlign: 'left', margin: '.4em 0' }}>
                        {course.courseName}
                      </h2>
                      <p className="course_code">{course.courseCode}</p>
                    </div>
                    <div className="edit">
                      <UilFileEditAlt
                        size="30"
                        color="#1414B3"
                        style={{
                          display: 'inline',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            : 'No Courses Yet!')}
      </section>
    </div>
  );
};

export default CoursesResourcePage;
