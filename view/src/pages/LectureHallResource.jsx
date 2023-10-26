import React, { useEffect, useContext, useState } from 'react';
import { UilFocusAdd, UilTrashAlt, UilPen } from '@iconscout/react-unicons';

import resourceContext from '../contexts/ResourceContext';

import AddLectureRoomForm from './../components/AddLectureRoomForm';
import ModalBackground from '../components/ModalBackground';
import LoadingResourcesComponent from '../components/loadingComponents/LoadingResourcesComponent';
import DialogBox from '../components/DialogBox';

import './../styles/resourceStyle.scss';
const stat = 1;

const LectureHallResource = () => {
  const resourceContxt = useContext(resourceContext);

  const [isModalActive, setIsModalActive] = useState(false);
  const [isDialogModalActive, setIsDialogModalActive] = useState(false);
  const [selectedQrCodeId, setSelectedQrCodeId] = useState(0);

  const dialogMessage =
    'Deleting this QR code will prevent it from being used to track attendance.';

  useEffect(() => {
    resourceContxt.loadLectureHall();
  }, [stat]);

  const onDeleteClick = (QRcodeId) => () => {
    resourceContxt.deleteLectureHallQRCode(QRcodeId);
  };
  return (
    <div className="lectureHalls__container">
      {/* NOTE: Conditional rendering logic for the form used to create new lecture hall QRcodes */}
      {isModalActive ? (
        <ModalBackground
          children={
            <AddLectureRoomForm
              setIsModalActive={setIsModalActive}
              isModalActive={isModalActive}
            />
          }
        />
      ) : (
        ''
      )}

      {/* NOTE: Conditonal rendering logic for the dialog box */}
      {isDialogModalActive ? (
        <ModalBackground
          children={
            <DialogBox
              dialogMessage={dialogMessage}
              onProceedClickFn={resourceContxt.deleteLectureHallQRCode}
              onCancelClickFn={setIsDialogModalActive}
              args={selectedQrCodeId}
            />
          }
        />
      ) : (
        ''
      )}
      <section className="heading_btn__section">
        <div className="icon">
          <UilFocusAdd
            size="45"
            color="#8E18B9"
            style={{
              padding: '.5em',
              outline: '1px solid gray',
              borderRadius: '50%',
              background: '#8e18b930',
            }}
            onClick={() => {
              setIsModalActive(!isModalActive);
            }}
          />
        </div>
        <h1>
          Manage
          <br />
          Lecture Halls
        </h1>
      </section>

      <section className="lists__section">
        {/* NOTE: conditional rendering for the list of lecture halls*/}
        {resourceContxt.isResourceLoading ? (
          <LoadingResourcesComponent />
        ) : (
          <div className="list__items">
            {resourceContxt.LectureHallQRcodes &&
              (resourceContxt.LectureHallQRcodes.length > 0
                ? resourceContxt.LectureHallQRcodes.map((lectureHall) => (
                    <div className="faculty_item" key={lectureHall.QRcodeId}>
                      <div className="name__status">
                        <h2 style={{ textAlign: 'left', margin: '0' }}>
                          {lectureHall.lectureRoom}
                        </h2>
                        <div
                          className={`lock__status ${
                            lectureHall.isLocked === 0 ? 'unlocked' : 'locked'
                          }`}
                        >
                          {lectureHall.isLocked === 0 ? 'unlocked' : 'locked'}
                        </div>
                      </div>

                      <div
                        className="list_controls"
                        style={{
                          display: 'flex',
                          marginLeft: 'auto',
                          marginTop: '.6em',
                        }}
                      >
                        <div className="edit" style={{ marginRight: '.4em' }}>
                          <UilPen
                            size="30"
                            color="#efa92f"
                            style={{
                              margin: '.5em 0',
                            }}
                          />
                        </div>
                        <div
                          className="icon"
                          onClick={() => {
                            setSelectedQrCodeId(lectureHall.QRcodeId);
                            setIsDialogModalActive(!isDialogModalActive);
                          }}
                        >
                          <UilTrashAlt
                            size="30"
                            color="#CA1414"
                            style={{
                              margin: '.5em 0',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                : 'No lecture halls yet')}
          </div>
        )}
      </section>
    </div>
  );
};

export default LectureHallResource;
