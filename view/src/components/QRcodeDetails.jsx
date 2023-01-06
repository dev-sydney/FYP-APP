import React, { useEffect, useContext } from 'react';
import { UilArrowRight, UilTimes } from '@iconscout/react-unicons';
import attendanceContext from '../contexts/AttendanceContext';
// import qrCodeContext from './../contexts/QRCodeContext';

import './../styles/componentsStyles.scss';
const QRcodeDetails = ({
  dataStr,
  isAttendanceDetails,
  shouldQRcodeDetailPopup,
  setShouldQRcodeDetailPopup,
}) => {
  const attendanceContxt = useContext(attendanceContext);
  const { codeDetails, getRandomSecurityQuestion } = attendanceContxt;

  useEffect(() => {
    if (!dataStr) return;
    attendanceContxt.getAttendanceDetails(dataStr);
    return () => {};
  }, [isAttendanceDetails]);

  const onClick = () => {
    getRandomSecurityQuestion();
    setShouldQRcodeDetailPopup(false);
  };
  return (
    <div
      className={`qrcode__details ${shouldQRcodeDetailPopup ? 'up' : 'down'}`}
    >
      <img
        style={{
          maxHeight: '5em',
          minHeight: '5em',
          minWidth: '5em',
          maxWidth: '5em',
          borderRadius: '20px',
        }}
        src={`/img/users/${codeDetails ? codeDetails.photo : 'padlock.jpeg'}`}
      />
      {/* ------CONDITIONAL RENDERING FOR WHEN THERES A PROFESSOR USING THE CODE*/}
      {codeDetails && (
        <div className="unlocked__details">
          <h2>{codeDetails.otherNames.concat(` ${codeDetails.surName}`)}</h2>
          <p>{codeDetails.privilege}</p>
        </div>
      )}

      {/* NOTE: CONDITIONAL RENDERING FOR WHEN A CODE IS LOCKED*/}
      {attendanceContxt.QRcodeStatus && (
        <div className="unlocked__details">
          <h3>{attendanceContxt.QRcodeStatus}</h3>
          <p>Locked</p>
        </div>
      )}

      {/* NOTE: CONDITIONAL RENDERING FOR THE CANCEL BUTTON */}
      {attendanceContxt.QRcodeStatus && (
        <button
          className="proceed__btn"
          onClick={() => {
            //NOTE: THIS CLICK EVENT HANDLER HIDES THE QRcodeDetails Component
            setShouldQRcodeDetailPopup(false);
          }}
        >
          {<UilTimes color="#F7F7F7" size="30" />}
        </button>
      )}

      {/* NOTE: CONDITIONAL RENDERING FOR THE PROCEED BUTTON */}
      {codeDetails && (
        <button className="proceed__btn" onClick={onClick}>
          {<UilArrowRight color="#F7F7F7" size="30" />}
        </button>
      )}
    </div>
  );
};

export default QRcodeDetails;
