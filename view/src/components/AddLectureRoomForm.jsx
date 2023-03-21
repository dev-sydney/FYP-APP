import React, { useState, useContext } from 'react';
import { UilTimes, UilSpinnerAlt } from '@iconscout/react-unicons';

import resourceContext from '../contexts/ResourceContext';
import './../styles/resourceFormStyle.scss';
const AddLectureRoomForm = ({ isModalActive, setIsModalActive }) => {
  const resourceContxt = useContext(resourceContext);

  const [formData, setFormData] = useState({
    lectureRoom: '',
  });
  const [lectureRoomQRcode, setLectureRoomQRcode] = useState('');
  const [isCodeLoading, setIsCodeLoading] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (isCodeLoading) return;
      setIsCodeLoading(!isCodeLoading);

      const res = await fetch(`/api/v1/qrcodes`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 201) {
        const result = await res.json();
        setLectureRoomQRcode(result.QRcodeUrl);
        setIsCodeLoading(!isCodeLoading);
      }
    } catch (error) {
      //TODO: SEND AN ALERT WHEN THERES AN ISSUE CREATING THE QRCODE
      console.log(error);
    }
  };
  return (
    <form onSubmit={onSubmit} className="add_hall__form resource__form">
      {/* NOTE: THE CANCEL SVG CONTAINER */}
      <div
        className="cancel__icon"
        onClick={() => {
          setIsModalActive(!isModalActive);
        }}
      >
        <UilTimes color="#5F5E5E" size="30" />
      </div>

      {/* NOTE: THE ILLUSRTATION CONTAINER & QR CODE CONTAINER*/}
      <div className="illustration__container">
        {/* NOTE: BELOW IS THE CONDITIONAL RENDERING FOR THE QR CODE IMAGE & ILLUSTRATION IMAGE */}
        {lectureRoomQRcode !== '' ? (
          <a
            download={formData.lectureRoom}
            target={'_blank'}
            rel={'noopener noreferrer'}
            href={lectureRoomQRcode ? lectureRoomQRcode : '#'}
          >
            <img src={lectureRoomQRcode} />
          </a>
        ) : (
          <img src={`/img/businessman-explaining-the-strategy.png`} />
        )}

        {/* NOTE: CONDITIONAL RENDERING FOR THE HEADING WHEN A QRCDODE HAS BEEN CREATED */}
        <h1>
          {lectureRoomQRcode !== '' ? "Here's Your Code" : "Let's Get Started."}
        </h1>

        {/* NOTE: CONDITIONAL RENDERING FOR THE PARAGRAPH WHEN A QRCDODE HAS BEEN CREATED */}
        <p>
          {lectureRoomQRcode !== ''
            ? 'Please Tap On The Code To DownLoad'
            : 'Please enter the name of the lecture to create a QR code for that hall'}
        </p>
      </div>

      <div className="form__group">
        <label className="form__label">Lecture room: </label>
        <input
          type="text"
          className="form__input"
          placeholder="eg LBC1234"
          name="lectureRoom"
          value={formData.lectureRoom}
          onChange={onChange}
          required
          mmin="4"
        />
      </div>
      <button className="submit__btn hall__sub" onClick={onSubmit}>
        {isCodeLoading ? (
          <div className="spinner_icon">
            <UilSpinnerAlt
              color="#FFFFFF"
              size="22"
              style={{ marginTop: '.2em' }}
            />
          </div>
        ) : (
          'Add'
        )}
      </button>
    </form>
  );
};

export default AddLectureRoomForm;
