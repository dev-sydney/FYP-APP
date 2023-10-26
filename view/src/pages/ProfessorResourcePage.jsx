import React, { useContext, useEffect, useState } from 'react';
import { UilTrashAlt, UilUserPlus, UilPen } from '@iconscout/react-unicons';

import resourceContext from '../contexts/ResourceContext';

import AddProfessorForm from './../components/AddProfessorForm';
import ModalBackground from '../components/ModalBackground';
import LoadingResourcesComponent from '../components/loadingComponents/LoadingResourcesComponent';
import DialogBox from '../components/DialogBox';

import './../styles/resourceStyle.scss';

const stat = 1;

const ProfessorResourcePage = () => {
  const resourceContxt = useContext(resourceContext);

  const [isModalActive, setIsModalActive] = useState(false);
  const [isDialogModalActive, setIsDialogModalActive] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);

  const dialogMessage =
    'Deleting this professor will erase all data associated with them.';

  useEffect(() => {
    resourceContxt.loadAllProfessors();
  }, [stat]);

  const onDeleteClick = (userId) => () => {
    resourceContxt.deleteProfessor(userId);
  };

  return (
    <div className="professors__container">
      {/* NOTE: Conditional rendering logic for the form that is used to add professors */}
      {isModalActive ? (
        <ModalBackground
          children={
            <AddProfessorForm
              setIsModalActive={setIsModalActive}
              isModalActive={isModalActive}
              loadProfessors={true}
            />
          }
        />
      ) : (
        ''
      )}

      {/* NOTE: Conditonal rendering logic for the dialog box component */}
      {isDialogModalActive ? (
        <ModalBackground
          children={
            <DialogBox
              dialogMessage={dialogMessage}
              onProceedClickFn={resourceContxt.deleteProfessor}
              onCancelClickFn={setIsDialogModalActive}
              args={selectedUserId}
            />
          }
        />
      ) : (
        ''
      )}
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
            onClick={() => {
              setIsModalActive(!isModalActive);
            }}
          />
        </div>
        <h1>
          Professors In
          <br />
          Your Department
        </h1>
      </section>

      <section className="lists__section">
        {/* NOTE: Conditional rendering for the list of professors  */}
        {resourceContxt.isResourceLoading ? (
          <LoadingResourcesComponent />
        ) : (
          <div className="list__items">
            {resourceContxt.professors &&
              (resourceContxt.professors.length > 0
                ? resourceContxt.professors.map((prof) => (
                    <div key={prof.userId} className="faculty_item">
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
                          className="prof_photo"
                        />
                        <div className="name__privilege">
                          <h2>{prof.surName.concat(` ${prof.otherNames}`)}</h2>
                          <p>{prof.privilege.replaceAll('_', ' ')}</p>
                        </div>
                      </div>

                      <div
                        className="list_controls"
                        style={{ display: 'flex', marginLeft: 'auto' }}
                      >
                        <div className="edit" style={{ marginRight: '.4em' }}>
                          <UilPen
                            size="30"
                            color="#efa92f"
                            style={{
                              margin: '.5em 0',
                            }}
                          />
                        </div>
                        <div
                          className="icon"
                          onClick={() => {
                            setSelectedUserId(prof.userId);
                            setIsDialogModalActive(!isDialogModalActive);
                          }}
                        >
                          <UilTrashAlt
                            size="30"
                            color="#CA1414"
                            style={{
                              margin: '.5em 0',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                : 'No professors yet!')}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfessorResourcePage;
