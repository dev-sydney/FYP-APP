import React, { useState, useContext, useEffect } from 'react';
import CountUp from 'react-countup';
import { useParams, useNavigate } from 'react-router-dom';
import {
  UilPlus,
  UilSearch,
  UilUserPlus,
  UilSpinnerAlt,
} from '@iconscout/react-unicons';

import attendanceContext from '../contexts/AttendanceContext';
import authContext from '../contexts/AuthContext';

import LoadingResourcesComponent from '../components/loadingComponents/LoadingResourcesComponent';
import LoadingStudentSearch from '../components/loadingComponents/LoadingStudentSearch';

import './../styles/componentsStyles.scss';
import './../styles/signedAttendanceStyle.scss';
const stat = 1;
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

    attendanceContxt.getSignedAttendances(ongoingAttendanceId);
    return () => {
      attendanceContxt.clearSomeContextState('CLEAR_STUDENT');
    };
  }, [stat]);
  const [formData, setFormData] = useState({
    indexNumber: 0,
  });
  const [didSearchBtnClicked, setDidSearchBtnClicked] = useState(false);

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
    <div className={`signed__page`}>
      <div className="number__present_container">
        <span className="flex__1">
          {didSearchBtnClicked ? (
            <form onSubmit={onSubmit} className={`add__student__form`}>
              <span className="input__search">
                <span>
                  <UilSearch color="#5F5E5E" size="25" />
                </span>
                <input
                  type={'number'}
                  placeholder="search by index number"
                  name={'indexNumber'}
                  onChange={onChange}
                  className={`form__input`}
                />
              </span>
              <input
                type={'button'}
                value="cancel"
                className="cancel__btn"
                onClick={() => {
                  setDidSearchBtnClicked(!didSearchBtnClicked);
                  attendanceContxt.clearSomeContextState('CLEAR_STUDENT');
                }}
              />
            </form>
          ) : (
            <div
              className="add_user__icon"
              onClick={() => {
                setDidSearchBtnClicked(!didSearchBtnClicked);
              }}
            >
              <UilUserPlus color="#5F5E5E" size="30" />
            </div>
          )}
        </span>

        <h1 className="flex__2">
          {!attendanceContxt.signedAttendances ? (
            0
          ) : (
            <CountUp
              start={0}
              end={attendanceContxt.signedAttendances.length}
              delay={1}
              duration={1.2}
            />
          )}
        </h1>
        <p className="flex__3">Students present</p>
      </div>

      {/*NOTE: Conditional rendering logic for displpaying the search results  */}
      <div className="search__results" style={{ textAlign: 'center' }}>
        {attendanceContxt.isStudentLoading ? (
          <LoadingStudentSearch />
        ) : (
          attendanceContxt.student && (
            <div className="search__details">
              <img
                src={`/img/users/${attendanceContxt.student.photo}`}
                style={{
                  maxHeight: '5em',
                  minHeight: '5em',
                  minWidth: '5em',
                  maxWidth: '5em',
                  borderRadius: '20px',
                  marginTop: '.1em',
                }}
              />
              <div className="name__index">
                <h3>
                  {attendanceContxt.student.surName.concat(
                    ` ${attendanceContxt.student.otherNames}`
                  )}
                </h3>
                <p>{attendanceContxt.student.indexNumber}</p>
              </div>

              <button onClick={onAddBtnClick} className={`add_student__btn`}>
                <UilPlus color="#E8E8E8" size="30" />
              </button>
            </div>
          )
        )}
      </div>

      <section
        className="lists__section"
        style={{ margin: '0.5em .3em', padding: '1%' }}
      >
        {/* NOTE: Conditional rendering logic for displaying either the LoadingComponent or the data of signed attendances  */}
        {attendanceContxt.isLoading ? (
          <LoadingResourcesComponent />
        ) : (
          <div className="signed__container">
            {attendanceContxt.signedAttendances &&
              (attendanceContxt.signedAttendances.length > 0
                ? attendanceContxt.signedAttendances.map((signedAttendance) => (
                    <div
                      className="signed__card"
                      key={signedAttendance.signedAttendanceId}
                    >
                      <img
                        role={'presentation'}
                        src={`/img/users/${signedAttendance.photo}`}
                        style={{
                          maxHeight: '5em',
                          minHeight: '5em',
                          minWidth: '5em',
                          maxWidth: '5em',
                          borderRadius: '20px',
                          marginTop: '.1em',
                        }}
                      />
                      <div className="name__index">
                        <h2>
                          {signedAttendance.surName &&
                            signedAttendance.surName.concat(
                              ` ${signedAttendance.otherNames}`
                            )}
                        </h2>
                        <p>{signedAttendance.indexNumber}</p>
                      </div>
                    </div>
                  ))
                : 'No Signed Attendances Just yet, please come back later')}
          </div>
        )}
      </section>
    </div>
  );
};
export default SignedAttendancesPage;
