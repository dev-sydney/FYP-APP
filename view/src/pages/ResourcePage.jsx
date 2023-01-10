import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  UilGraduationCap,
  UilPodium,
  UilDiary,
  UilUniversity,
  UilArrowRight,
} from '@iconscout/react-unicons';
import authContext from '../contexts/AuthContext';

import './../styles/resourceStyle.scss';

/**
 * This component renders all the controls for managing the various resources(lecture rooms,faculties,professors, etc)
 * @returns
 */
const ResourcePage = () => {
  const authContxt = useContext(authContext);
  const navigateTo = useNavigate();
  //TODO: CHECK IF THE USER IS AUTHORISED TO VISIT THIS PAGE(LOGIN AND PRIVILEGE)
  useEffect(() => {
    //EDGE-CASE: IF THE USER ISN'T LOGGED IN
    if (!authContxt.user) navigateTo('/login');

    //EDGE-CASE: IF THE USER DOESN'T HAVE PERMISSION TO VISIT THIS PAGE
    if (!['admin', 'head_of_department'].includes(authContxt.user.privilege))
      navigateTo('/');
  });

  const onBtnClick = (state, setStateFn) => () => {
    setStateFn(!state);
  };
  return (
    <div className="resource__container">
      <h1 style={{ textAlign: 'left', padding: '.3em .7em' }}>
        Manage
        <br /> Resources
      </h1>
      <hr />
      <div className="controls__container">
        <div className="control">
          <div className="icon" style={{ background: '#4d4df02b' }}>
            <UilGraduationCap
              size="30"
              color="#3434E6"
              style={{ margin: '.5em' }}
            />
          </div>
          <h2>
            Manage
            <br /> Professors
          </h2>

          <NavLink to="/resourceManager/professors">
            <UilArrowRight
              size="30"
              color="#FFFFFF"
              style={{ margin: '.4em' }}
            />
          </NavLink>
        </div>

        <div className="control">
          <div className="icon" style={{ background: ' #f9b94a51' }}>
            <UilPodium size="37" color="#efa92f" style={{ margin: '.5em' }} />
          </div>
          <h2>
            Lecture
            <br /> Halls
          </h2>

          <NavLink to="/#">
            <UilArrowRight
              size="30"
              color="#FFFFFF"
              style={{ margin: '.45em' }}
            />
          </NavLink>
        </div>

        <div className="control">
          <div className="icon" style={{ background: '#0d903037' }}>
            <UilDiary size="30" color="#0D9030" style={{ margin: '.7em' }} />
          </div>
          <h2>
            Manage
            <br /> Courses
          </h2>

          <NavLink to="/#">
            <UilArrowRight
              size="30"
              color="#FFFFFF"
              style={{ margin: '.4em' }}
            />
          </NavLink>
        </div>

        <div className="control">
          <div className="icon" style={{ background: '#5f10903d' }}>
            <UilUniversity
              size="30"
              color="#5E1090"
              style={{ margin: '.5em' }}
            />
          </div>
          <h2>
            Manage
            <br /> Faculties
          </h2>

          <NavLink to="/#">
            <UilArrowRight
              size="30"
              color="#FFFFFF"
              style={{ margin: '.4em' }}
            />
          </NavLink>
        </div>
      </div>
      <div style={{ minHeight: '5em' }}></div>
    </div>
  );
};

export default ResourcePage;
