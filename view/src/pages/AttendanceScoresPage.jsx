import React, { useContext, useEffect, useState } from 'react';
import { UilCog, UilFileInfoAlt } from '@iconscout/react-unicons';
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
  const resourceContxt = useContext(resourceContext);
  const attendanceContxt = useContext(attendanceContext);
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
    resourceContxt.loadAllFaculties(navigateTo);
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
      <div className="form__icon" style={{ textAlign: 'right' }}>
        <span
          onClick={() => {
            setIsModalActive(true);
          }}
        >
          <UilFileInfoAlt color="#5F5E5E" size="30" />
        </span>
      </div>
      <h1 style={{ outline: '1px solid gray', textAlign: 'left' }}>
        Get Attendance Scores, <br /> For The Semester
      </h1>

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

      {/* NOTE: CONDITIONAL RENDERING FOR WHEN THERE ARE NO SCORES QUERIED YET */}
    </div>
  );
};

export default AttendanceScoresPage;
