import React, { useState, useContext } from 'react';
import { UilTimes } from '@iconscout/react-unicons';

import resourceContext from '../contexts/ResourceContext';

import './../styles/resourceFormStyle.scss';

const AddFacultyForm = ({ isModalActive, setIsModalActive }) => {
  const resourceContxt = useContext(resourceContext);

  const [formData, setFormData] = useState({
    facultyName: '',
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    resourceContxt.addFaculty(formData);
  };
  return (
    <form onSubmit={onSubmit} className="add_faculty__form resource__form">
      <div
        className="cancel__icon"
        onClick={() => {
          setIsModalActive(!isModalActive);
        }}
      >
        <UilTimes color="#5F5E5E" size="30" />
      </div>
      <div className="illustration__container">
        <img src={`/img/businessman-explaining-the-strategy.png`} />
        <h1>Let's Get Started.</h1>
        <p>Please enter the name of the new faculty.</p>
      </div>
      <div className="form__group">
        <label className="form__label">Faculty name: </label>
        <input
          type="text"
          className="form__input"
          placeholder="Name of faculty"
          name="facultyName"
          value={formData.facultyName}
          onChange={onChange}
          required
          mmin="4"
        />
      </div>
      <input
        type={'submit'}
        value={'Add'}
        onClick={onSubmit}
        className="submit__btn faculty_sub"
      />
    </form>
  );
};

export default AddFacultyForm;
