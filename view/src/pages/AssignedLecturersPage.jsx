import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UilUserPlus, UilTimes } from '@iconscout/react-unicons';

import resourceContext from '../contexts/ResourceContext';
import AlertComponent from '../components/AlertComponent';
import './../styles/departmentCoursesStyle.scss';

const stat = 1;
/**
 * This page component renders all the professors assigned to a course,
 * it also handles the functionality of the assigning courses to other lecturers
 * @returns
 */
const AssignedLecturersPage = () => {
  const resourceContxt = useContext(resourceContext);
  const { courseId } = useParams();

  useEffect(() => {
    resourceContxt.loadAssignedProfessors(courseId);
  }, [stat]);

  return (
    <div className="assigned__container">
      <AlertComponent />
      <section className="headings__section">
        <div className="icon">
          <UilUserPlus
            size="45"
            color="#8E18B9"
            style={{
              padding: '.5em',
              borderRadius: '50%',
              background: '#8e18b930',
            }}
          />
        </div>
        <h1>
          Assigned <br />
          Professors
        </h1>
      </section>

      <section className="lists__section">
        <div className="list__items">
          {resourceContxt.assignedProfessors &&
            (resourceContxt.assignedProfessors.length > 0
              ? resourceContxt.assignedProfessors.map((assignedProf) => (
                  <div className="profItem" key={assignedProf.assignmentId}>
                    <div className="prof__info">
                      <img
                        src={`/img/users/${assignedProf.photo}`}
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
                        <h2>
                          {assignedProf.surName.concat(
                            ` ${assignedProf.otherNames}`
                          )}
                        </h2>
                        <p>{assignedProf.privilege.replaceAll('_', ' ')}</p>
                      </div>
                      <div
                        className="list_controls"
                        style={{ display: 'flex', marginLeft: 'auto' }}
                      >
                        <div
                          className="deallocate_icon"
                          //   style={{ marginRight: '.4em' }}
                        >
                          <UilTimes
                            size="40"
                            color="#FF0000"
                            style={{
                              padding: '.5em',
                              borderRadius: '50%',
                              backgroundColor: '#ca14141a',
                            }}
                            onClick={() => {
                              resourceContxt.deAllocateAssignedCourse(
                                assignedProf.assignmentId
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : 'No Lecturers Assigned Yet.')}
        </div>
      </section>
    </div>
  );
};

export default AssignedLecturersPage;
