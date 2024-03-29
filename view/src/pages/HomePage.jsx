import React, { useState, useContext, useRef, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import { UilInfoCircle } from '@iconscout/react-unicons';
/* ---------------CONTEXTS---------------- */
import authContext from '../contexts/AuthContext';
import attendanceContext from '../contexts/AttendanceContext';
import resourceContext from '../contexts/ResourceContext';

/* ---------------COMPONENTS---------------- */
import AttendanceForm from '../components/AttendanceForm';
import QRcodeDetails from '../components/QRcodeDetails';
import AnswerSecurityQForm from '../components/AnswerSecurityQForm';
import './../styles/homeStyle.scss';

const HomePage = () => {
  const authContxt = useContext(authContext);
  const attendanceContxt = useContext(attendanceContext);
  const resourceContxt = useContext(resourceContext);

  const [QRcodeData, setQRcodeData] = useState('');

  const [isAttendanceDetails, setIsAttendanceDetails] = useState(false);
  const [didProfessorScan, setDidProfessorScan] = useState(false);
  const [shouldQRcodeDetailPopup, setShouldQRcodeDetailPopup] = useState(false);

  const navigateTo = useNavigate();

  useEffect(() => {
    //EDGE-CASE: IF THE USER IS A STUDENT & HAS NO SECURITY QUESTIONS SET
    if (
      authContxt?.user?.privilege === 'student' &&
      authContxt?.user?.hasSecurityQuestionsSet === 0
    ) {
      navigateTo('/userSecurityQnAs');
    }
    //EDGE-CASE: If the user is a lecturer then get their assigned courses
    if (
      ['head_of_department', 'professor'].includes(authContxt.user?.privilege)
    ) {
      resourceContxt.loadUsersAssignedCourses();
    }
    authContxt.setNavBarVisibilty(true);
    return () => {
      resourceContxt.clearSomeContextState('CLEAR_ASSIGNED_COURSES');
    };
  }, []);

  const onResult = (result, error) => {
    if (result) {
      //TODO: OPEN THE ATTENDANCE FORM IF A PROFESSOR OR HEAD OF DEPT SCANS
      if (
        ['head_of_department', 'professor'].includes(authContxt.user.privilege)
      ) {
        setDidProfessorScan(true);
        setQRcodeData(result.text);
      }

      //TODO: REVEAL THE QRcode DETAILS IF A STUDENT SCANS
      if (authContxt.user.privilege === 'student') {
        setIsAttendanceDetails(!isAttendanceDetails);
        setQRcodeData(result.text);
        // dataStr.current = result.text;
        setShouldQRcodeDetailPopup(true);
      }
    }
  };

  return (
    <div className="home-container">
      <div
        className="top_logo_space"
        style={{
          textAlign: 'center',
          color: 'white',
        }}
      >
        <p style={{ fontWeight: '5em' }}>Find a QR code</p>
      </div>
      <div>
        <QrReader
          constraints={{ facingMode: 'environment' }}
          scanDelay={300}
          containerStyle={{
            width: '100%',
            backgroundColor: 'black',
            paddingTop: '0em',
            height: '30em',
          }}
          videoContainerStyle={{
            paddingTop: '0em',
            height: '100%',
            opacity: '0.5',
          }}
          videoStyle={{
            minHeight: '100%',
          }}
          onResult={onResult}
        />
      </div>
      <QRcodeDetails
        isAttendanceDetails={isAttendanceDetails}
        setIsAttendanceDetails={setIsAttendanceDetails}
        setShouldQRcodeDetailPopup={setShouldQRcodeDetailPopup}
        shouldQRcodeDetailPopup={shouldQRcodeDetailPopup}
        setQRcodeData={setQRcodeData}
        QRcodeData={QRcodeData}
      />
      {/* //NOTE: THIS COMPONENT IS THE VERTICAL SLIDER THAT WILL ONLY POPUP //IF
      APROFESSOR SCANS OR AN ONGOING ATTENDANCE ISN'T EXPIRED AND THE
      STUDENTGETS THEIR // SECURITY QUESTION */}
      <div
        className={`vertical__slider ${
          didProfessorScan || attendanceContxt.studentRandomQ?.secretQs
            ? 'slide_up'
            : 'slide_down'
        }`}
      >
        {/*NOTE: conditional rendering if a professor scans it should show the lecturehall name in the vertical component */}
        {QRcodeData &&
          ['professor', 'head_of_department'].includes(
            authContxt.user.privilege
          ) &&
          didProfessorScan && (
            <p className="lectureroom">
              {QRcodeData.split(' ')[1].split('=')[1]}{' '}
              <UilInfoCircle
                size="1em"
                color="gray"
                style={{ paddingTop: '0.2em' }}
              />
            </p>
          )}

        {/* NOTE: CONDTIONAL RENDERING TO DISPLAY THE PROFESSOR ATTENDANCE FORM WHEN A PROFESSOR SCANS */}
        {didProfessorScan && (
          <AttendanceForm
            setDidProfessorScan={setDidProfessorScan}
            setQRcodeData={setQRcodeData}
            QRcodeData={QRcodeData}
          />
        )}

        {/* NOTE: CONDTIONAL RENDERING IF THE STUDENT TAPS THE PROCEED BTN TO TAKE AN ATTENDANCE */}
        {attendanceContxt?.studentRandomQ?.secretQs && <AnswerSecurityQForm />}
      </div>
    </div>
  );
};

export default HomePage;
