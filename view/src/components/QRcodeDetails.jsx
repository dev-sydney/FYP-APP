import React, { useEffect, useContext } from 'react';
import { UilArrowRight, UilTimes, UilPadlock } from '@iconscout/react-unicons';
import attendanceContext from '../contexts/AttendanceContext';

import LoadingQRcodeDetails from './loadingComponents/LoadingQRcodeDetails';

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
    attendanceContxt.getQRcodeDetails(dataStr);
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
      {/* NOTE: Conditional rendering for the details of the scanned QR code */}
      {attendanceContxt.isLoading ? (
        <LoadingQRcodeDetails />
      ) : (
        <div className="details_container">
          {/* NOTE: Conditional rendering logic to show either the locked icon or the current lecturer taking attendance */}
          {codeDetails ? (
            <img
              style={{
                maxHeight: '5em',
                minHeight: '5em',
                minWidth: '5em',
                maxWidth: '5em',
                borderRadius: '20px',
              }}
              src={`/img/users/${codeDetails.photo}`}
            />
          ) : (
            <div className="locked_icon">
              <UilPadlock
                size="50"
                color="#000000"
                style={{
                  margin: '.7em 0',
                }}
              />
            </div>
          )}

          {/* NOTE: Conditional rendering logic to show the details of the current professor taking attendance */}
          {codeDetails && (
            <div className="unlocked__details">
              <h2>
                {codeDetails.otherNames.concat(` ${codeDetails.surName}`)}
              </h2>
              <p>{codeDetails.currentCourseName}</p>
            </div>
          )}

          {/* NOTE: Conditional rendering logic to show the locked details if the QR code is locked */}
          {attendanceContxt.QRcodeStatus && (
            <div className="unlocked__details">
              <h3>{attendanceContxt.QRcodeStatus}</h3>
              <p>Locked</p>
            </div>
          )}

          {/* NOTE: Conditional rendering logic to display the 'cancel buttton' which hides this entire component */}
          {/* NOTE: Should only be rendered when if the QR code is locked */}
          {attendanceContxt.QRcodeStatus && (
            <button
              className="action__btn"
              onClick={() => {
                //NOTE: THIS CLICK EVENT HANDLER HIDES THE QRcodeDetails Component
                setShouldQRcodeDetailPopup(false);
              }}
            >
              {
                <UilTimes
                  color="#F7F7F7"
                  size="30"
                  style={{ marginTop: '0.1em' }}
                />
              }
            </button>
          )}

          {/* NOTE: Conditional rendering logic to display the 'proceed button' which will cause the AnswerSecurityQuestionForm to pop up */}
          {/* NOTE: Only renders when the theres a professor using the QR code to take an ongoing attendance */}
          {codeDetails && (
            <button className="action__btn" onClick={onClick}>
              {
                <UilArrowRight
                  color="#F7F7F7"
                  size="30"
                  style={{ marginTop: '0.1em' }}
                />
              }
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QRcodeDetails;
