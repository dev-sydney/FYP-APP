import React, { useEffect, useContext } from 'react';
import attendanceContext from '../contexts/AttendanceContext';
// import qrCodeContext from './../contexts/QRCodeContext';

import './../styles/componentsStyles.scss';
const QRcodeDetails = ({ dataStr }) => {
  const attendanceContxt = useContext(attendanceContext);
  const { codeDetails, attendanceAlert, getRandomSecurityQuestion } =
    attendanceContxt;

  useEffect(() => {
    attendanceContxt.getAttendanceDetails(dataStr);
    return () => {};
  }, []);

  const onClick = () => {
    if (!attendanceContxt.QRcodeStatus) return;
    getRandomSecurityQuestion();
  };
  return (
    <div className="qrcode__details">
      <img
        src={`/img/users/${codeDetails ? codeDetails.photo : 'padlock.jpeg'}`}
      />
      {/* ------CONDITIONAL RENDERING FOR WHEN THERES A PROFESSOR USING THE CODE*/}
      {codeDetails && (
        <div className="unlocked__details">
          <h2>{codeDetails.otherNames.concat(` ${codeDetails.surName}`)}</h2>
          <p>{codeDetails.privilege}</p>
        </div>
      )}

      {/* ------CONDITIONAL RENDERING FOR WHEN A CODE IS LOCKED*/}
      {attendanceContxt.QRcodeStatus && (
        <div className="locked__details">
          <h2>{attendanceContxt.QRcodeStatus}</h2>
          <p>Locked</p>
        </div>
      )}
      <div className="take__attendance__btn">
        <button onClick={onClick}>{'>'}</button>
      </div>
    </div>
  );
};

export default QRcodeDetails;
