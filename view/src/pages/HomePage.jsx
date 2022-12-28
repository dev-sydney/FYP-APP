import React, {
  Fragment,
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';

/* ---------------CONTEXTS---------------- */
import authContext from '../contexts/AuthContext';
import attendanceContext from '../contexts/AttendanceContext';

/* ---------------COMPONENTS---------------- */
import SecurityQForm from '../components/SecurityQForm';
import AttendanceForm from '../components/AttendanceForm';
import ModalBackground from '../components/ModalBackground';
import QRcodeDetails from '../components/QRcodeDetails';
import AnswerSecurityQForm from '../components/AnswerSecurityQForm';

const HomePage = () => {
  const authContxt = useContext(authContext);
  // const attendanceContxt = useContext(attendanceContext);

  const [QRcodeData, setQRcodeData] = useState('');

  const [isModalActive, setIsModalActive] = useState(true);
  const [isAttendanceModalActive, setIsAttendanceModalActive] = useState(false);
  const [isAttendanceDetails, setIsAttendanceDetails] = useState(false);

  const dataStr = useRef('');

  const navigateTo = useNavigate();

  useEffect(() => {
    //EDGE-CASE: IF THE USER ISN'T LOGGED IN
    if (!authContxt.user) {
      navigateTo('/login');
    }
  }, []);

  const onResult = (result, error) => {
    if (result) {
      //TODO: OPEN THE ATTENDANCE FORM IF A PROFESSOR OR HEAD OF DEPT SCANS
      if (
        ['head_of_department', 'professor'].includes(authContxt.user.privilege)
      ) {
        setIsAttendanceModalActive(!isAttendanceModalActive);
        // console.log(result.text);
        setQRcodeData(result.text);
      }

      //TODO: REVEAL THE QRcode DETAILS IF A STUDENT SCANS
      if (authContxt.user.privilege === 'student') {
        setIsAttendanceDetails(!isAttendanceDetails);
        setQRcodeData(result.text);
        dataStr.current = result.text;
      }
    }
  };

  return (
    <Fragment>
      {/* ----CONDTIONAL RENDERING FOR THE SECUIRTY QUESTIONS MODAL---- */}
      {authContxt.user &&
        (authContxt.user.privilege === 'student' &&
        !authContxt.user.hasSecurityQuestionsSet ? (
          <ModalBackground
            children={
              <SecurityQForm
                setIsModalActive={setIsModalActive}
                isModalActive={isModalActive}
              />
            }
          />
        ) : (
          ''
        ))}
      {/* ----CONDTIONAL RENDERING FOR THE ATTENDANCE FORM MODAL---- */}
      {authContxt.user &&
        (['professor', 'head_of_department'].includes(
          authContxt.user.privilege
        ) && isAttendanceModalActive ? (
          <ModalBackground
            children={
              <AttendanceForm
                QRcodeData={QRcodeData}
                setIsAttendanceModalActive={setIsAttendanceModalActive}
                isAttendanceModalActive={isAttendanceModalActive}
              />
            }
          />
        ) : (
          ''
        ))}

      <AnswerSecurityQForm />
      <div>
        <QrReader
          constraints={{ facingMode: 'environment' }}
          scanDelay={300}
          containerStyle={{
            width: '100%',
            border: '2px solid green',
          }}
          onResult={onResult}
        />
        {/* ----CONDTIONAL RENDERING FOR THE ATTENDANCE DETAILS COMPONENT---- */}
        {authContxt.user &&
          (authContxt.user.privilege === 'student' && isAttendanceDetails ? (
            <QRcodeDetails dataStr={dataStr.current} />
          ) : (
            ''
          ))}
      </div>
    </Fragment>
  );
};

export default HomePage;
