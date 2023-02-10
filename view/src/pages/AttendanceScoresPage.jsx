import React, { useContext, useEffect, useState } from 'react';
import { UilFileInfoAlt, UilImport } from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

import resourceContext from '../contexts/ResourceContext';
import attendanceContext from '../contexts/AttendanceContext';
import authContext from '../contexts/AuthContext';

import ModalBackground from './../components/ModalBackground';
import ControlScoresForm from '../components/ControlScoresForm';

import './../styles/profileStyle.scss';
import './../styles/scoresStyle.scss';

const stat = 1;
/**
 * This page component renders the table of attendance scores, as well as a form that controls the
 * data that is got.
 * @returns
 */
const AttendanceScoresPage = () => {
  const attendanceContxt = useContext(attendanceContext);
  const resourceContxt = useContext(resourceContext);

  const authContxt = useContext(authContext);

  const navigateTo = useNavigate();

  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    //EDGE-CASE: IF THE USER ISN'T LOGGED IN
    if (!authContxt.user) navigateTo('/login');

    //EDGE-CASE: IF THERES ANY UNAUTHORIZED VISIT
    if (
      !['professor', 'head_of_department'].includes(authContxt.user.privilege)
    )
      navigateTo('/');

    resourceContxt.loadUsersAssignedCourses();
  }, [stat]);

  /* -------THE SELECT OPTIONS ONCHANGE EVENT HANDLERS------- */
  const onDownloadBtnClick = () => {
    //TODO: create a new jsPDF instance
    const pdf = new jsPDF();
    pdf.autoTable({ html: '#attendanceTable' });
    pdf.save(`attendanceScores.pdf`);
  };
  return (
    <div className={`attendance_scores__container`}>
      {/* NOTE: CONDITIONAL RENDERING FOR THE MODAL WITH THE ControlScoreForm */}
      {isModalActive ? (
        <ModalBackground>
          <ControlScoresForm
            setIsModalActive={setIsModalActive}
            isModalActive={isModalActive}
          />
        </ModalBackground>
      ) : (
        ''
      )}

      <section className="heading_btn__section">
        <div className="form__icon">
          <UilFileInfoAlt
            color="#8E18B9"
            size="45"
            style={{
              padding: '.5em',
              borderRadius: '50%',
              background: '#8e18b930',
            }}
            onClick={() => {
              setIsModalActive(true);
            }}
          />
        </div>

        <h1
          style={{ textAlign: 'left', padding: '0 .4em', marginBottom: '.5em' }}
        >
          Get Attendance Scores, <br /> For The Semester
        </h1>
        {attendanceContxt.attendanceScores &&
          (attendanceContxt.attendanceScores.length > 0 ? (
            <div className="save__container">
              <button
                className="save__btn"
                onClick={onDownloadBtnClick}
                style={{ background: '#14D24C' }}
              >
                <UilImport color="#FFFFFF" size="25" />
              </button>
            </div>
          ) : (
            ''
          ))}
      </section>
      {/* ---- CONDITIONAL RENDERING FOR THE ATTENDACNCE SCORES TABLE ---- */}
      {attendanceContxt.attendanceScores &&
        (attendanceContxt.attendanceScores.length === 0 ? (
          <p>No results found</p>
        ) : (
          <table id="attendanceTable">
            <thead>
              <tr>
                <th>#</th>
                <th style={{ textAlign: 'left' }}>STUDENT</th>
                <th>ID</th>
                <th>SCORE</th>
              </tr>
            </thead>

            <tbody>
              {attendanceContxt.attendanceScores.map((score, i) => (
                <tr key={score.indexNumber}>
                  <td>{i + 1}</td>
                  <td>
                    <div
                      style={{
                        maxWidth: 'fit-content',
                        margin: 'none',
                      }}
                      className="photo__name"
                    >
                      <img
                        src={`/img/users/${score.photo}`}
                        // className="form__user-photo"
                        style={{
                          minHeight: '4em',
                          maxHeight: '4em',
                          maxWidth: '4em',
                          minWidth: '4em',
                          borderRadius: '10px',
                        }}
                      />
                      <p
                        style={{ marginTop: '5px' }}
                      >{`${score.surName} ${score.otherNames}`}</p>
                    </div>
                  </td>
                  <td>{score.indexNumber}</td>
                  <td style={{ fontWeight: '600' }}>{+score.Total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}

      {/* NOTE: CONDITIONAL RENDERING FOR WHEN THERE ARE NO SCORES QUERIED YET */}
      {!attendanceContxt.attendanceScores && (
        <div className="no_scores_container">
          <img
            src="/img/empty-box.png"
            alt=""
            className="lists__illustration"
          />
          <h2>No Scores</h2>
          <p>Let's get started, shall we ?</p>
          <button
            onClick={() => {
              setIsModalActive(!isModalActive);
            }}
          >
            Get Scores
          </button>
        </div>
      )}
    </div>
  );
};

export default AttendanceScoresPage;
