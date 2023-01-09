import React, { useContext, useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { UilUser } from '@iconscout/react-unicons';

import authContext from '../contexts/AuthContext';
import './../styles/profileStyle.scss';

const ProfilePage = () => {
  const authContxt = useContext(authContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    //EDGE-CASE: IF THE USER ISN'T LOGGED IN
    if (!authContxt.user) navigateTo('/login');
  }, []);

  const [securityFormData, setSecurityFormData] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const [accountInfoFormData, setAccountInfoFormData] = useState({
    surName: '',
    otherNames: '',
    emailAddress: '',
  });
  let userPhotoInput = useRef();

  const onPasswordFieldsChange = (e) => {
    setSecurityFormData({
      ...securityFormData,
      [e.target.name]: e.target.value,
    });
  };

  const onAccountInfoChange = (e) => {
    setAccountInfoFormData({
      ...accountInfoFormData,
      [e.target.name]: e.target.value,
    });
  };

  const onPasswordFormSubmit = (e) => {
    e.preventDefault();
    authContxt.updateUserPassword(securityFormData);
  };
  const onAccountInfoFormSubmit = (e) => {
    e.preventDefault();
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
      <section className="acc_setting__section">
        {/*------ACCOUNT INFORMATION SETTINGS------ */}

        <h1>ACCOUNT SETTINGS</h1>
        <form
          encType="multipart/form-data"
          onSubmit={onAccountInfoFormSubmit}
          className="acc_setting__form"
        >
          <div className="photo__surname">
            <label htmlFor="photo" className="file__upload">
              <UilUser color="#828282" size="40" style={{ margin: '1.5em' }} />
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
            <input
              type="text"
              className="form__input surname__input"
              placeholder="Surname"
              name="surName"
              value={accountInfoFormData.surName}
              onChange={onAccountInfoChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form__input"
              placeholder="Other names"
              name="otherNames"
              value={accountInfoFormData.otherNames}
              onChange={onAccountInfoChange}
            />
          </div>

          <div className="form-group">
            <input
              type={'email'}
              className="form__input"
              name="emailAddress"
              value={accountInfoFormData.emailAddress}
              placeholder="Email"
              onChange={onAccountInfoChange}
            />
          </div>

          <input type={'submit'} value="save" className="save__btn" />
        </form>
      </section>
      <hr />

      {/* ------PASSWORD & SECURITY-RELATED SETTINGS------ */}
      <section className="security_setting__section">
        <h1>SECURITY SETTINGS</h1>
        <form
          onSubmit={onPasswordFormSubmit}
          className="security_setting__form"
        >
          <div className="form__group">
            <input
              type="password"
              name="currentPassword"
              value={securityFormData.currentPassword}
              id="current"
              onChange={onPasswordFieldsChange}
              placeholder="Current Password"
              className="form__input"
            />
          </div>

          <div className="form__group">
            <input
              type="password"
              name="newPassword"
              value={securityFormData.newPassword}
              id="newpassword"
              onChange={onPasswordFieldsChange}
              placeholder="New Password"
              className="form__input"
            />
          </div>

          <div className="form__group">
            <input
              type="password"
              name="newPasswordConfirm"
              vaue={securityFormData.newPasswordConfirm}
              id="passwordconfirm"
              onChange={onPasswordFieldsChange}
              placeholder="Confirm Password"
              className="form__input"
            />
          </div>
          <input
            type="submit"
            value="done"
            className="save_password save__btn"
          />
        </form>
        <button
          onClick={() => {
            authContxt.signUserOut(navigateTo);
          }}
          className="logout__btn save__btn"
        >
          LOG OUT
        </button>
      </section>
    </div>
  );
};
export default ProfilePage;
