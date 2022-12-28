import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import resourceContext from '../contexts/ResourceContext';
import attendanceContext from '../contexts/AttendanceContext';
import authContext from '../contexts/AuthContext';
import './../styles/profileStyle.scss';

const stat = 1;
/**
 * This page component renders the table of attendance scores, as well as a form that controls the
 * data that is got.
 * @returns
 */
const AttendanceScoresPage = () => {
  const resourceContxt = useContext(resourceContext);
  const attendanceContxt = useContext(attendanceContext);
  const authContxt = useContext(authContext);

  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  });
  const [courseId, setCourseId] = useState(0);

  useEffect(() => {
    //EDGE-CASE: IF THE USER ISN'T LOGGED IN
    if (!authContxt.user) navigateTo('/login');

    //EDGE-CASE: IF THERES ANY UNAUTHORIZED VISIT
    if (
      !['professor', 'head_of_department'].includes(authContxt.user.privilege)
    )
      navigateTo('/');
    resourceContxt.loadAllFaculties(navigateTo);
  }, [stat]);

  /* -------THE SELECT OPTIONS ONCHANGE EVENT HANDLERS------- */

  /**
   *The Faculties Select-Option Input:
   *This "onChange" event handler loads all the courses belonging to the selected faculty
   * @param {Object} e The event Object
   */
  const onFacultySelectChange = (e) => {
    resourceContxt.loadAllCourses(e.target.value);
  };

  /**
   *The Date Select-Option Input:
   *This "onChange" event handler is responsible for changing the date input values
   * @param {*} e The event Object
   */
  const onDateInputsChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * The courses Select-Option Input:
   * This "onChange" event handler is responsible for changing the courses selct-option input values
   * @param {*} e The event Object
   */
  const onCourseSelectChange = (e) => {
    setCourseId(e.target.value);
  };

  /* -------THE FORM ONSUBMIT EVEVNT HANDLERS------- */
  const onsubmit = (e) => {
    e.preventDefault();
    //EDGE-CASE: IF THERES NO SELECTED FACULTY AND COURSE
    if (courseId === 0) return;
    attendanceContxt.loadAttendanceScores(formData, courseId);
  };
  const onDownloadBtnClick = () => {
    //TODO: create a new jsPDF instance
    const pdf = new jsPDF();
    pdf.autoTable({ html: '#attendanceTable' });
    pdf.save(`attendanceScores.pdf`);
  };
  return (
    <Fragment>
      <h2>Get Attendance Scores</h2>
      <div>
        <form onSubmit={onsubmit}>
          <div className="form-group">
            <label>From: </label>
            <input
              required
              name="startDate"
              type={'datetime-local'}
              value={formData.startDate}
              onChange={onDateInputsChange}
            />
          </div>

          <div className="form-group">
            <label>To: </label>
            <input
              required
              name="endDate"
              type={'datetime-local'}
              value={formData.endDate}
              onChange={onDateInputsChange}
            />
          </div>

          <div className="form-group">
            <label>Filter by: </label>
            <select onChange={onFacultySelectChange}>
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

            <select onChange={onCourseSelectChange}>
              <option>course</option>
              {/*EDGE-CASE: IF THERES NO COURSES LOADED YET, RENDER "NO RESULTS FOUND..."  */}
              {!resourceContxt.courses ||
              resourceContxt.courses.length === 0 ? (
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
          <input type={'submit'} />
        </form>
      </div>
      {attendanceContxt.attendanceScores &&
        (attendanceContxt.attendanceScores.length > 0 ? (
          <button onClick={onDownloadBtnClick}>
            DOWNLOAD ATTENDANCE SCORES
          </button>
        ) : (
          ''
        ))}
      {/* ---- CONDITIONAL RENDERING FOR THE ATTENDACNCE SCORES TABLE ---- */}
      {attendanceContxt.attendanceScores &&
        (attendanceContxt.attendanceScores.length === 0 ? (
          <p>No results found</p>
        ) : (
          <table id="attendanceTable">
            <thead>
              <tr>
                <th>#</th>
                <th>STUDENT</th>
                <th>INDEX NO</th>
                <th>SCORES</th>
              </tr>
            </thead>

            <tbody>
              {attendanceContxt.attendanceScores.map((score, i) => (
                <tr key={score.indexNumber}>
                  <td>{i + 1}</td>
                  <td style={{ border: '1px solid black' }}>
                    <div>
                      <img
                        src={`/img/users/${score.photo}`}
                        className="form__user-photo"
                      />
                      <span
                        style={{ border: '1px solid red' }}
                      >{`${score.surName} ${score.otherNames}`}</span>
                    </div>
                  </td>
                  <td>{score.indexNumber}</td>
                  <td>{+score.Total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
    </Fragment>
  );
};

export default AttendanceScoresPage;
