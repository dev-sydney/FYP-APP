import React, {
  useContext,
  useState,
  Fragment,
  useRef,
  useEffect,
} from 'react';

import { useNavigate } from 'react-router-dom';

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
    <Fragment>
      <div>
        {/*------ACCOUNT INFORMATION SETTINGS------ */}

        <h1>ACCOUNT SETTINGS</h1>
        <form encType="multipart/form-data" onSubmit={onAccountInfoFormSubmit}>
          <div className="form-group">
            <label>Surname: </label>
            <input
              type="text"
              className="input"
              placeholder="surname"
              name="surName"
              value={accountInfoFormData.surName}
              onChange={onAccountInfoChange}
            />
          </div>

          <div className="form-group">
            <label>Other Names: </label>
            <input
              type="text"
              className="input"
              placeholder="other names"
              name="otherNames"
              value={accountInfoFormData.otherNames}
              onChange={onAccountInfoChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address:</label>
            <input
              type={'email'}
              className="input"
              name="emailAddress"
              value={accountInfoFormData.emailAddress}
              placeholder="you@example.com"
              onChange={onAccountInfoChange}
            />
          </div>

          <div className="form-group">
            <img
              className="form__user-photo"
              src={`/img/users/${
                authContxt.user ? authContxt.user.photo : 'default.jpg'
              }`}
              alt="profile"
            />
            <label htmlFor="photo" className="form__upload">
              Choose new photo.
              <input
                type="file"
                name="photo"
                accept="image/*"
                id="photo"
                className="form__upload"
                ref={userPhotoInput}
                onChange={onAccountInfoChange}
              />
            </label>
          </div>

          <input type={'submit'} value="save changes" />
        </form>
      </div>
      <hr />

      {/* ------PASSWORD & SECURITY-RELATED SETTINGS------ */}
      <div>
        <h1>SECURITY SETTINGS</h1>
        <form onSubmit={onPasswordFormSubmit}>
          <div className="form__group">
            <label htmlFor="current">Current password:</label>
            <input
              type="password"
              name="currentPassword"
              value={securityFormData.currentPassword}
              id="current"
              onChange={onPasswordFieldsChange}
              placeholder="••••••••"
            />
          </div>

          <div className="form__group">
            <label htmlFor="newpassword">New password:</label>
            <input
              type="password"
              name="newPassword"
              value={securityFormData.newPassword}
              id="newpassword"
              onChange={onPasswordFieldsChange}
              placeholder="••••••••"
            />
          </div>

          <div className="form__group">
            <label htmlFor="newPasswordConfirm">Confirm password:</label>
            <input
              type="password"
              name="newPasswordConfirm"
              vaue={securityFormData.newPasswordConfirm}
              id="passwordconfirm"
              onChange={onPasswordFieldsChange}
              placeholder="••••••••"
            />
          </div>
          <input
            type="submit"
            value="SAVE PASSWORD"
            className="save_password btn"
          />
        </form>
        <button
          onClick={() => {
            authContxt.signUserOut(navigateTo);
          }}
        >
          LOG OUT
        </button>
      </div>
    </Fragment>
  );
};
export default ProfilePage;
