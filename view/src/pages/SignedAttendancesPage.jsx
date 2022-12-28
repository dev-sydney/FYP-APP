import React, { Fragment, useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import attendanceContext from '../contexts/AttendanceContext';
import authContext from '../contexts/AuthContext';

import SignedAttendances from '../components/SignedAttendances';

import './../styles/componentsStyles.scss';
/**
 * This component renders all the signed attendances so far
 * as well as a separate little form for searching for other students
 * @returns
 */
const SignedAttendancesPage = () => {
  let { ongoingAttendanceId, courseId } = useParams();
  let navigateTo = useNavigate();

  const attendanceContxt = useContext(attendanceContext);
  const authContxt = useContext(authContext);
  useEffect(() => {
    //EDGE-CASE: IF THE USER ISN'T LOGGED IN
    if (!authContxt.user) {
      navigateTo('/');
    }
    //EDGE-CASE: IF THE USER ISN'T A PROFESSOR OR HEAD OF DEPT.
    if (
      !['professor', 'head_of_department'].includes(authContxt.user.privilege)
    )
      navigateTo('/');

    return () => {
      attendanceContxt.clearSomeContextState('CLEAR_STUDENT');
    };
  }, []);
  const [formData, setFormData] = useState({
    indexNumber: 0,
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    attendanceContxt.getStudent(formData);
  };
  const onAddBtnClick = () => {
    //EDGE-CASE: IF THERES NO CURRENTLY SEARCHED STUDENT
    if (!attendanceContxt.student) return;

    const { userId } = attendanceContxt.student;

    attendanceContxt.addStudentToAttendances(
      userId,
      ongoingAttendanceId,
      courseId
    );
  };
  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <input
          type={'number'}
          placeholder="search by index number"
          name={'indexNumber'}
          onChange={onChange}
        />
        <input type={'submit'} value="Search" />
      </form>
      {/* -----CONDITIONAL RENDERING FOR THE SEARCH RESULTS */}

      {attendanceContxt.student && (
        <div className="search__results">
          <img src={`/img/users/${attendanceContxt.student.photo}`} />
          <h3>
            {attendanceContxt.student.surName.concat(
              ` ${attendanceContxt.student.otherNames}`
            )}
          </h3>
          <p>{attendanceContxt.student.indexNumber}</p>

          <button onClick={onAddBtnClick}>Add</button>
        </div>
      )}

      <SignedAttendances ongoingAttendanceId={ongoingAttendanceId} />
    </Fragment>
  );
};
export default SignedAttendancesPage;
