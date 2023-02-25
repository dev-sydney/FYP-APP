import React, { useContext, useEffect, useState } from 'react';
import { UilTimes, UilPen, UilBookMedical } from '@iconscout/react-unicons';
import resourceContext from '../contexts/ResourceContext';

import ModalBackground from '../components/ModalBackground';
import AddFacultyForm from './../components/AddFacultyForm';
import LoadingResourcesComponent from '../components/loadingComponents/LoadingResourcesComponent';

import './../styles/resourceStyle.scss';

const stat = 1;
const FacultyResourcePage = () => {
  const resourceContxt = useContext(resourceContext);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    resourceContxt.loadAllFaculties();
  }, [stat]);

  const onDeleteClick = (facultyId) => () => {
    resourceContxt.deleteFaculty(facultyId);
  };
  return (
    <div className="faculty_resource__container">
      {/* NOTE: CONDTIONAL RENDERING FOR THE MODAL BACKGROUND & FORM */}
      {isModalActive ? (
        <ModalBackground
          children={
            <AddFacultyForm
              isModalActive={isModalActive}
              setIsModalActive={setIsModalActive}
            />
          }
        />
      ) : (
        ''
      )}

      <section className="heading_btn__section">
        <div className="icon">
          <UilBookMedical
            size="45"
            color="#8E18B9"
            style={{
              padding: '.5em',
              outline: '1px solid gray',
              borderRadius: '50%',
              background: '#8e18b930',
            }}
            onClick={() => {
              setIsModalActive(!isModalActive);
            }}
          />
        </div>
        <h1>
          Manage
          <br />
          All Faculties
        </h1>
      </section>

      <section className="lists__section">
        {resourceContxt.isResourceLoading ? (
          <LoadingResourcesComponent />
        ) : (
          <div className="list__items">
            {resourceContxt.faculties &&
              (resourceContxt.faculties.length > 0
                ? resourceContxt.faculties.map((faculty) => (
                    <div className="faculty_item" key={faculty.facultyId}>
                      <div className="edit">
                        <UilPen
                          size="30"
                          color="#efa92f"
                          style={{
                            margin: '.5em 0',
                          }}
                        />
                      </div>
                      <h2>{faculty.facultyName}</h2>
                      <div
                        className="icon"
                        style={{ background: 'none' }}
                        onClick={onDeleteClick(faculty.facultyId)}
                      >
                        <UilTimes
                          size="30"
                          color="#CA1414"
                          style={{
                            margin: '.5em 0',
                          }}
                        />
                      </div>
                    </div>
                  ))
                : 'No Faculties yet')}
          </div>
        )}
      </section>
    </div>
  );
};

export default FacultyResourcePage;
