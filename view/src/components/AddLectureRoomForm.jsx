import React, { useState, useContext } from 'react';
import resourceContext from '../contexts/ResourceContext';

const AddLectureRoomForm = ({
  isAddLectureRoomActive,
  setIsAddLectureRoomActive,
}) => {
  const resourceContxt = useContext(resourceContext);

  const [formData, setFormData] = useState({
    lectureRoom: '',
  });
  const [lectureRoomQRcode, setLectureRoomQRcode] = useState('');

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
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
      }
    } catch (error) {
      //TODO: SEND AN ALERT WHEN THERES AN ISSUE CREATING THE QRCODE
      console.log(error);
    }
  };
  return (
    <div>
      <h3>ADD LECTURE ROOMS</h3>
      <button
        onClick={() => {
          setIsAddLectureRoomActive(!isAddLectureRoomActive);
        }}
      >
        ❌
      </button>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Lecture room: </label>
          <input
            type="text"
            className="input"
            placeholder="eg LBC1234"
            name="lectureRoom"
            value={formData.lectureRoom}
            onChange={onChange}
            required
            mmin="4"
          />
        </div>
        <input type={'submit'} value={'Add'} onClick={onSubmit} />
      </form>

      {lectureRoomQRcode !== '' && (
        <div>
          <h3>Tap on the code to download</h3>
          <a
            download={formData.lectureRoom}
            target={'_blank'}
            rel={'noopener noreferrer'}
            href={lectureRoomQRcode ? lectureRoomQRcode : '#'}
          >
            <img src={lectureRoomQRcode} />
          </a>
        </div>
      )}
    </div>
  );
};

export default AddLectureRoomForm;
