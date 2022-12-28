import React, { useState, useContext, useEffect } from 'react';
import resourceContext from '../contexts/ResourceContext';
const stat = 1;
const AddCourseForm = ({ isAddNewCourseActive, setIsAddNewCourseActive }) => {
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
    // console.log(formData);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>ADD COURSE</h3>
        <button
          onClick={() => {
            setIsAddNewCourseActive(!isAddNewCourseActive);
          }}
        >
          ❌
        </button>
        <div className="form-group">
          <label>Course: </label>
          <input
            required
            type="text"
            className="input"
            placeholder="Course name"
            name="courseName"
            value={formData.courseName}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label>Course code: </label>
          <input
            required
            type="text"
            className="input"
            placeholder="eg BCPC123 or BITM123 etc"
            name="courseCode"
            value={formData.courseCode}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label>Faculty: </label>
          <select name={'facultyId'} onChange={onChange}>
            <option>---- Please select a faculty ----</option>
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
        <input type={'submit'} value={'Add'} onClick={onsubmit} />
      </form>
    </div>
  );
};

export default AddCourseForm;
