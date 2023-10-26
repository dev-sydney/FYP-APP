import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UilEditAlt } from '@iconscout/react-unicons';

import authContext from '../contexts/AuthContext';

import './../styles/profileStyle.scss';

const AccountOverviewPage = () => {
  const authContxt = useContext(authContext);
  const navigateTo = useNavigate();

  return (
    <div className="overview__container">
      <div className="row">
        <h3>Account Overview</h3>
      </div>
      <div className="row">
        {authContxt.user && (
          <img
            role={'presentation'}
            loading="lazy"
            src={`/img/users/${authContxt.user.photo}`}
            style={{
              maxHeight: '8em',
              minHeight: '8em',
              minWidth: '8em',
              maxWidth: '8em',
              borderRadius: '50%',
            }}
          />
        )}
      </div>

      <div className="row">
        <h1>
          {authContxt.user &&
            authContxt.user.otherNames.concat(` ${authContxt.user.surName}`)}
        </h1>
      </div>
      <p className="labels" style={{ marginTop: '2em' }}>
        Your display name
      </p>
      <div className="row displayname">
        <h3>
          {authContxt.user &&
            authContxt.user.otherNames.concat(` ${authContxt.user.surName}`)}
        </h3>
        <Link to="/account/profile" style={{ marginLeft: 'auto' }}>
          <UilEditAlt color="#284b63" size="30" />
        </Link>
      </div>
      <p className="labels">Your email address</p>
      <div className="row displayname">
        <h3>{authContxt.user ? authContxt.user.emailAddress : ''}</h3>
        <Link to="/account/profile" style={{ marginLeft: 'auto' }}>
          <UilEditAlt color="#284b63" size="30" />
        </Link>
      </div>
      <div className="row" style={{ marginTop: '1em' }}>
        <p>
          <Link
            className="password_link overview_btn"
            to="/account/change-password"
            style={{ width: '90%' }}
          >
            Change Password
          </Link>
        </p>
      </div>
      <div className="row">
        <button
          className="overview_btn logout"
          onClick={() => {
            authContxt.signUserOut(navigateTo);
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default AccountOverviewPage;
