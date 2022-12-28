import React, { useState, useContext } from 'react';
import resourceContext from '../contexts/ResourceContext';

const AddProfessorForm = ({
  isAddProfessorActive,
  setIsAddProfessorActive,
}) => {
  const resourceContxt = useContext(resourceContext);

  const [formData, setFormData] = useState({
    surName: '',
    otherNames: '',
    emailAddress: '',
    facultyId: 0,
    privilege: '',
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    resourceContxt.addProfessor(formData);
  };
  return (
    <div>
      <h3>ADD PROFESSOR</h3>
      <button
        onClick={() => {
          setIsAddProfessorActive(!isAddProfessorActive);
        }}
      >
        ❌
      </button>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Surname: </label>
          <input
            required
            type="text"
            className="input"
            placeholder="surname"
            name="surName"
            value={formData.surName}
            onChange={onChange}
            minLength="3"
          />
        </div>

        <div className="form-group">
          <label>Other names: </label>
          <input
            required
            type="text"
            className="input"
            placeholder="middle first"
            name="otherNames"
            value={formData.otherNames}
            onChange={onChange}
            minLength="3"
          />
        </div>

        <div className="form-group">
          <label>Email Address: </label>
          <input
            required
            type={'email'}
            className="input"
            placeholder="you@example.com"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label>Role: </label>
          <select name="privilege" onChange={onChange} required>
            <option> ----Select a role---- </option>
            <option value={'professor'}>Professor</option>
            <option value={'head_of_department'}>Head of department</option>
          </select>
        </div>

        <div className="form-group">
          <label>Faculty: </label>
          <select name="facultyId" onChange={onChange} required>
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
        <input type={'submit'} onClick={onSubmit} />
      </form>
    </div>
  );
};

export default AddProfessorForm;
