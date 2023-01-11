import React, { useEffect, useContext, useState } from 'react';
import {
  UilFocusAdd,
  UilTimes,
  UilFileEditAlt,
} from '@iconscout/react-unicons';

import resourceContext from '../contexts/ResourceContext';
import AddLectureRoomForm from './../components/AddLectureRoomForm';
import ModalBackground from '../components/ModalBackground';

import './../styles/resourceStyle.scss';
const stat = 1;

const LectureHallResource = () => {
  const resourceContxt = useContext(resourceContext);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    resourceContxt.loadLectureHallQRcodes();
  }, [stat]);
  return (
    <div className="lectureHalls__container">
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
        {resourceContxt.LectureHallQRcodes &&
          (resourceContxt.LectureHallQRcodes.length > 0
            ? resourceContxt.LectureHallQRcodes.map((lectureHall) => (
                <div className="list__item" key={lectureHall.QRcodeId}>
                  <div className="icon">
                    <UilTimes size="30" color="#CA1414" />
                  </div>
                  <div className="hall__info">
                    <div className="name__status">
                      <h2 style={{ textAlign: 'left', margin: '.4em 0' }}>
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
                    <div className="edit">
                      <UilFileEditAlt
                        size="30"
                        color="#1414B3"
                        style={{
                          display: 'inline',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            : 'No lecture halls yet')}
      </section>
    </div>
  );
};

export default LectureHallResource;
