import React, { useContext, useEffect, useState } from 'react';
import {
  UilTimes,
  UilUserPlus,
  UilTrashAlt,
  UilFileEditAlt,
} from '@iconscout/react-unicons';

import resourceContext from '../contexts/ResourceContext';

import AddProfessorForm from './../components/AddProfessorForm';
import ModalBackground from '../components/ModalBackground';
const stat = 1;

const ProfessorResourcePage = () => {
  const resourceContxt = useContext(resourceContext);

  const [didMoreOptionsClicked, setDidMoreOptionsClciked] = useState(false);

  useEffect(() => {
    resourceContxt.loadAllProfessors();
  }, [stat]);

  return (
    <div className="professors__container">
      <section className="heading_btn__section">
        <div className="icon">
          <UilUserPlus
            size="45"
            color="#8E18B9"
            style={{
              padding: '.5em',
              outline: '1px solid gray',
              borderRadius: '50%',
              background: '#8e18b930',
            }}
          />
        </div>
        <h1>
          Manage <br />
          Professors
        </h1>
      </section>
      <section className="lists__section">
        {resourceContxt.professors &&
          (resourceContxt.professors.length > 0
            ? resourceContxt.professors.map((prof) => (
                <div key={prof.userId} className="list__item">
                  <div className="icon">
                    <UilTimes size="30" color="#CA1414" />
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
                        marginTop: '.4em',
                      }}
                    />
                    <div className="name__privilege">
                      <h2>{prof.surName.concat(` ${prof.otherNames}`)}</h2>
                      <p>{prof.privilege.replaceAll('_', ' ')}</p>
                    </div>
                    <div className="edit">
                      <UilFileEditAlt
                        size="30"
                        color="#1414B3"
                        style={{
                          display: 'inline',
                        }}
                      />
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
