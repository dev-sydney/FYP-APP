import React, { useState, useContext, useEffect } from 'react';
import { UilTimes } from '@iconscout/react-unicons';

import resourceContext from '../contexts/ResourceContext';

import './../styles/resourceFormStyle.scss';

const stat = 1;
const AddCourseForm = ({ isModalActive, setIsModalActive }) => {
  const resourceContxt = useContext(resourceContext);

  useEffect(() => {
    resourceContxt.loadAllFaculties();
  }, [stat]);
  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    facultyId: 0,
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
        <label className="form__label">Faculty: </label>
        <select name={'facultyId'} onChange={onChange} className="form__input">
          <option>Pick a faculty</option>
          {/*EDGE-CASE: IF THERES NO FACULTIES LOADED YET RENDER "LOADING..."  */}
          {!resourceContxt.faculties ? (
            <option> loading... </option>
          ) : (
            resourceContxt.faculties.map((faculty) => (
              <option value={faculty.facultyId} key={faculty.facultyId}>
                {faculty.facultyName}
              </option>
            ))
          )}
        </select>
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
