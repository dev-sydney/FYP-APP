import React, { useContext, useEffect, useState } from 'react';
import { UilTrashAlt, UilPen, UilBookMedical } from '@iconscout/react-unicons';
import resourceContext from '../contexts/ResourceContext';

import ModalBackground from '../components/ModalBackground';
import AddCourseForm from './../components/AddCourseForm';
import LoadingResourcesComponent from '../components/loadingComponents/LoadingResourcesComponent';
import AlertComponent from '../components/AlertComponent';

import './../styles/resourceStyle.scss';

const stat = 1;
const CoursesResourcePage = () => {
  const resourceContxt = useContext(resourceContext);

  const [formData, setFormData] = useState({ facultyId: 0 });
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    resourceContxt.loadAllFaculties();
  }, [stat]);

  const onDeleteClick = (courseId) => () => {
    resourceContxt.deleteCourse(courseId);
  };
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
      <AlertComponent />
      {/* NOTE: CONDTIONAL RENDERING FOR THE MODAL BACKGROUND & FORM */}
      {isModalActive ? (
        <ModalBackground
          children={
            <AddCourseForm
              isModalActive={isModalActive}
              setIsModalActive={setIsModalActive}
            />
          }
        />
      ) : (
        ''
      )}
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
        {resourceContxt.isResourceLoading ? (
          <LoadingResourcesComponent />
        ) : (
          <div className="list__items">
            {resourceContxt.courses &&
              (resourceContxt.courses.length > 0
                ? resourceContxt.courses.map((course) => (
                    <div className="faculty_item" key={course.courseId}>
                      <div className="coursename__code">
                        <h2 style={{ textAlign: 'left', margin: '0' }}>
                          {course.courseName}
                        </h2>
                        <p className="course_code">{course.courseCode}</p>
                      </div>

                      <div
                        className="list_controls"
                        style={{ display: 'flex', marginLeft: 'auto' }}
                      >
                        <div className="edit" style={{ marginRight: '.4em' }}>
                          <UilPen
                            size="30"
                            color="#efa92f"
                            style={{
                              margin: '.5em 0',
                            }}
                          />
                        </div>
                        <div
                          className="icon"
                          onClick={onDeleteClick(course.courseId)}
                        >
                          <UilTrashAlt
                            size="30"
                            color="#CA1414"
                            style={{
                              margin: '.5em 0',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                : 'No Courses Yet!')}
          </div>
        )}
      </section>
    </div>
  );
};

export default CoursesResourcePage;
