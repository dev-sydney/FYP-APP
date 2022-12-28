import React, { useState, useContext } from 'react';
import resourceContext from '../contexts/ResourceContext';
const AddFacultyForm = ({
  isAddNewFacultyActive,
  setIsAddNewFacultyActive,
}) => {
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
    <div>
      <h3>ADD FACULTY</h3>
      <button
        onClick={() => {
          setIsAddNewFacultyActive(!isAddNewFacultyActive);
        }}
      >
        ❌
      </button>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Faculty name: </label>
          <input
            type="text"
            className="input"
            placeholder="faculty name"
            name="facultyName"
            value={formData.facultyName}
            onChange={onChange}
            required
            mmin="4"
          />
        </div>
        <input type={'submit'} value={'Add'} onClick={onSubmit} />
      </form>
    </div>
  );
};

export default AddFacultyForm;
