import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UilUser, UilSpinnerAlt } from '@iconscout/react-unicons';

import authContext from '../contexts/AuthContext';
import './../styles/profileStyle.scss';

const ProfilePage = () => {
  const authContxt = useContext(authContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    //EDGE-CASE: IF THE USER IS A STUDENT & HAS NO SECURITY QUESTIONS SET
    if (
      authContxt.user.privilege === 'student' &&
      authContxt.user.hasSecurityQuestionsSet === 0
    ) {
      navigateTo('/user-securityQnAs');
    }
  }, []);

  const [accountInfoFormData, setAccountInfoFormData] = useState({
    surName: '',
    otherNames: '',
    emailAddress: '',
  });
  let userPhotoInput = useRef();

  const onAccountInfoChange = (e) => {
    setAccountInfoFormData({
      ...accountInfoFormData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * The event handler function that takes of the submit action when the accountInfo form gets submitted
   * @param {*} e
   * @returns
   */
  const onAccountInfoFormSubmit = (e) => {
    e.preventDefault();
    if (authContxt.isUpdatesLoading) return;

    //EDGE-CASE: IF NO DATA WAS INPUTTED IN THE FORM
    if (
      userPhotoInput.current.files[0] === undefined &&
      accountInfoFormData.otherNames + accountInfoFormData.surName === ''
    ) {
      return;
    }
    const formData = new FormData();
    Object.keys(accountInfoFormData).forEach((el) => {
      formData.append(`${el}`, accountInfoFormData[el]);
    });
    //EDGE-CASE: if theres was an image upload
    if (userPhotoInput.current.files[0]) {
      formData.append('photo', userPhotoInput.current.files[0]);
    }
    authContxt.updateUserAccountInfo(formData);
  };

  return (
    <div className="profile__container">
      {/*------ACCOUNT INFORMATION SETTINGS------ */}

      <h1 style={{ textAlign: 'left', margin: '1em 0' }}>Edit Profile</h1>
      <form
        encType="multipart/form-data"
        onSubmit={onAccountInfoFormSubmit}
        // className="acc_setting__form"
      >
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            minHeight: 'fit-content',
            maxHeight: 'fit-content',
            minWidth: 'fit-content',
            maxWidth: 'fit-content',
            borderRadius: '50%',
          }}
        >
          <label htmlFor="photo" className="file__upload">
            <UilUser color="#828282" size="60" />
            <input
              type="file"
              name="photo"
              accept="image/*"
              id="photo"
              className="form__upload"
              ref={userPhotoInput}
              onChange={onAccountInfoChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <div className="photo__surname">
          <div className="input-block">
            <input
              type="text"
              className="surname__input"
              name="surName"
              value={accountInfoFormData.surName}
              onChange={onAccountInfoChange}
            />
            <span className="placeholder">Surname</span>
          </div>
        </div>

        <div className="input-block">
          <input
            type="text"
            name="otherNames"
            value={accountInfoFormData.otherNames}
            onChange={onAccountInfoChange}
            minLength={0}
          />
          <span className="placeholder">Other names</span>
        </div>

        <div className="input-block">
          <input
            type={'email'}
            name="emailAddress"
            value={accountInfoFormData.emailAddress}
            onChange={onAccountInfoChange}
            id="input-text"
            // required
          />
          <span className="placeholder">Email</span>
        </div>

        <button onClick={onAccountInfoFormSubmit} className="save__btn">
          {/* NOTE: Condtional rendering logic for displaying either the loading animation or 'save */}
          {authContxt.isLoading ? (
            <div className="spinner_icon">
              <UilSpinnerAlt
                color="#FFFFFF"
                size="22"
                style={{ marginTop: '.2em' }}
              />
            </div>
          ) : (
            'save changes'
          )}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '.5em' }}>
        <Link to="/account/overview" style={{ color: 'gray' }}>
          <p>Cancel</p>
        </Link>
      </div>
    </div>
  );
};
export default ProfilePage;
