import React, { useState, useContext, useEffect } from 'react';

import attendanceContext from '../contexts/AttendanceContext';
import resourceContext from '../contexts/ResourceContext';

const stat = 1;
/**
 * The component is the form that the lecturer will use to create start an ongoing attendance
 * @param {*} param0
 * @returns
 */
const AttendanceForm = ({
  setIsAttendanceModalActive,
  isAttendanceModalActive,
  QRcodeData,
}) => {
  const attendanceContxt = useContext(attendanceContext);
  const resourceContxt = useContext(resourceContext);

  useEffect(() => {
    //LOADS ALL THE FACULTIIES
    resourceContxt.loadAllFaculties();
  }, [stat]);

  const [formData, setFormData] = useState({
    facultyId: 0,
    courseId: 0,
    duration: 5,
  });

  /* -------THE SELECT OPTIONS ONCHANGE EVENT HANDLERS------- */

  /**
   *The Faculties Select-Option Input:
   *This "onChange" event handler loads all the courses belonging to the selected faculty
   * @param {Object} e The event Object
   */
  const onFacultySelectChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    resourceContxt.loadAllCourses(e.target.value);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    attendanceContxt.startOngoingAttendance(formData, QRcodeData);
  };

  return (
    <div className="test_styling">
      <h2>Start an attendance for {formData.duration}</h2>{' '}
      <span
        onClick={() => {
          setIsAttendanceModalActive(!isAttendanceModalActive);
        }}
      >
        ❌
      </span>
      <form onSubmit={onSubmit}>
        <div className="form_group">
          <label htmlFor="faculty">Filter by: </label>
          <select
            id="faculty"
            name="facultyId"
            required
            onChange={onFacultySelectChange}
          >
            <option>faculty</option>
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

          <label htmlFor="course">Course: </label>
          <select id="course" name="courseId" required onChange={onChange}>
            <option>--Please select the course--</option>
            {/*EDGE-CASE: IF THERES NO COURSES LOADED YET, RENDER "NO RESULTS FOUND..."  */}

            {!resourceContxt.courses || resourceContxt.courses.length === 0 ? (
              <option> No results found </option>
            ) : (
              resourceContxt.courses.map((course) => (
                <option value={course.courseId} key={course.courseId}>
                  {course.courseName}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="form_group">
          <label>Minutes: </label>
          <input
            type={'range'}
            name="duration"
            max="20"
            min="5"
            step={5}
            required
            onChange={onChange}
            value={formData.duration}
          />
        </div>
        <input type={'submit'} value="Start" />
      </form>
    </div>
  );
};

export default AttendanceForm;
