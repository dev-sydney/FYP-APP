import React, { useState, useContext, useEffect } from 'react';
import { UilTimes } from '@iconscout/react-unicons';

import resourceContext from '../contexts/ResourceContext';

import './../styles/resourceFormStyle.scss';

const AddCourseForm = ({ isModalActive, setIsModalActive }) => {
  const resourceContxt = useContext(resourceContext);

  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    resourceContxt.addCourse(formData);
    setIsModalActive(!isModalActive);
    // console.log(formData);
  };

  return (
    <form onSubmit={onSubmit} className={`add_course__form resource__form`}>
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
        <p>Fill out the details of the course with this form below</p>
      </div>

      <div className="form__group">
        <label className="form__label">Course: </label>
        <input
          required
          type="text"
          className="form__input"
          placeholder="Course name"
          name="courseName"
          value={formData.courseName}
          onChange={onChange}
        />
      </div>

      <div className="form__group">
        <label className="form__label">Course code: </label>
        <input
          required
          type="text"
          className="form__input"
          placeholder="eg BCPC123 or BITM123 etc"
          name="courseCode"
          value={formData.courseCode}
          onChange={onChange}
        />
      </div>

      <input
        type={'submit'}
        value={'Add'}
        onClick={onsubmit}
        className="submit__btn course_sub"
      />
    </form>
  );
};

export default AddCourseForm;
