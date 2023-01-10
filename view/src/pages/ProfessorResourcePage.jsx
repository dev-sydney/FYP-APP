import React, { useContext, useEffect } from 'react';
import { UilEllipsisV, UilUserPlus } from '@iconscout/react-unicons';

import resourceContext from '../contexts/ResourceContext';

import AddProfessorForm from './../components/AddProfessorForm';
import ModalBackground from '../components/ModalBackground';
const stat = 1;

const ProfessorResourcePage = () => {
  const resourceContxt = useContext(resourceContext);

  useEffect(() => {
    resourceContxt.loadAllProfessors();
  }, [stat]);

  return (
    <div className="professors__container">
      <section className="heading_btn__section">
        <UilUserPlus size="30" color="#000000" />
        <h1>Professors</h1>
      </section>
      <section className="lists__section">
        {resourceContxt.professors &&
          (resourceContxt.professors.length > 0
            ? resourceContxt.professors.map((prof) => (
                <div key={prof.userId} className="list__item">
                  <div className="icon">
                    <UilEllipsisV
                      size="40"
                      color="#000000"
                      style={{ padding: '.5em', outline: '1px solid gray' }}
                    />
                  </div>
                  <div className="prof__info">
                    <img
                      src={`/img/users/${prof.photo}`}
                      style={{
                        maxHeight: '4em',
                        minHeight: '4em',
                        minWidth: '4em',
                        maxWidth: '4em',
                        borderRadius: '20px',
                      }}
                    />
                    <div className="name__privilege">
                      <h2>{prof.surName.concat(` ${prof.otherNames}`)}</h2>
                      <p>{prof.privilege.replaceAll('_', ' ')}</p>
                    </div>
                  </div>
                </div>
              ))
            : 'No professors yet!')}
      </section>
    </div>
  );
};

export default ProfessorResourcePage;
