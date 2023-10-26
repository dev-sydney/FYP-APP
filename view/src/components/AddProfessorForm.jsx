import React, { useState, useContext, useEffect } from 'react';
import { UilTimes } from '@iconscout/react-unicons';

import resourceContext from '../contexts/ResourceContext';

import './../styles/resourceFormStyle.scss';

const stat = 1;
const AddProfessorForm = ({
  isModalActive,
  setIsModalActive,
  loadProfessors,
}) => {
  const resourceContxt = useContext(resourceContext);
  useEffect(() => {
    resourceContxt.loadAllFaculties();
  }, [stat]);
  const [formData, setFormData] = useState({
    surName: '',
    otherNames: '',
    emailAddress: '',
    privilege: '',
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    resourceContxt.addProfessor(formData, loadProfessors);
    setIsModalActive(false);
  };
  return (
    <form onSubmit={onSubmit} className="add_prof__form resource__form">
      <div
        className="cancel__icon"
        onClick={() => {
          setIsModalActive(!isModalActive);
        }}
      >
        <UilTimes color="#5F5E5E" size="30" />
      </div>
      <div className="illustration__container">
        <img src="/img/add-user.png" />
        <h1>Let's Get Started.</h1>
        <p>Fill out the details of the professor with this form below</p>
      </div>
      {/* <h3>ADD PROFESSOR</h3> */}
      <label className="form__label">Names:</label>
      <div className="form__group double_field">
        <input
          required
          type="text"
          className="form__input"
          placeholder="Surname"
          name="surName"
          value={formData.surName}
          onChange={onChange}
          minLength="3"
        />
        <input
          required
          type="text"
          className="form__input othername__input"
          placeholder="Other names"
          name="otherNames"
          value={formData.otherNames}
          onChange={onChange}
          minLength="3"
        />
      </div>

      <div className="form__group">
        <label className="form__label">Email Address: </label>
        <input
          required
          type={'email'}
          className="form__input"
          placeholder="you@example.com"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={onChange}
        />
      </div>
      <label className="form__label">Role:</label>
      <div className="form__group double_field">
        <select
          name="privilege"
          onChange={onChange}
          required
          className="form__input"
        >
          <option> Role </option>
          <option value={'professor'}>Professor</option>
          <option value={'head_of_department'}>Head of department</option>
        </select>
      </div>

      <input
        type={'submit'}
        onClick={onSubmit}
        className="submit__btn prof_sub"
      />
    </form>
  );
};

export default AddProfessorForm;
