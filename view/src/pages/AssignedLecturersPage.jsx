import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UilUserPlus, UilTimes, UilCheck } from '@iconscout/react-unicons';

import resourceContext from '../contexts/ResourceContext';
import LoadingResourcesComponent from '../components/loadingComponents/LoadingResourcesComponent';

import './../styles/departmentCoursesStyle.scss';

/**
 * This page component renders all the professors assigned to a course,
 * it also handles the functionality of the assigning courses to other lecturers
 * @returns
 */
const AssignedLecturersPage = () => {
  const resourceContxt = useContext(resourceContext);
  const { courseId } = useParams();
  const [userIds, setUserIds] = useState([]);
  const [isAssigning, setisAssigning] = useState(false);

  const onCheckBoxClick = (e) => {
    if (userIds.includes(e.target.value)) {
      setUserIds(userIds.filter((el) => el !== e.target.value));
    } else {
      setUserIds([...userIds, e.target.value]);
    }
  };
  const onCancelBtnClick = () => {
    setUserIds([]);
    setisAssigning(false);
  };
  const onAssignClick = () => {
    if (userIds.length <= 0) return;
    resourceContxt.assignCourseToProfessor({
      courseId,
      userIds: userIds.join(','),
    });
    setTimeout(() => {
      setisAssigning(false);
    }, 1000);
  };
  useEffect(() => {
    resourceContxt.loadAssignedProfessors(courseId);
    return () => {
      resourceContxt.clearSomeContextState('CLEAR_ALL_LECTURERS');
    };
  }, []);

  return (
    <div className="assigned__container">
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
            onClick={() => {
              resourceContxt.loadUnAssignedProfessors(courseId);

              setisAssigning(true);
            }}
          />
        </div>
        <h1>
          {isAssigning ? 'Unassigned' : 'Assigned'} <br />
          Professors
        </h1>
        <div
          style={{
            textAlign: 'right',
            display: 'flex',
            justifyContent: 'flex-end',
            minHeight: '3em',
            maxHeight: '3em',
          }}
        >
          {isAssigning && (
            <div className="assign_cancel">
              <div onClick={onAssignClick} className="assign_btn">
                <UilCheck
                  color={`${userIds.length > 0 ? '#0c4717' : '#239f1845'}`}
                  size="40"
                  style={{
                    // padding: '0 .5em',
                    backgroundColor: '#239f1845',
                    borderRadius: '10px',
                    minHeight: 'inherit',
                  }}
                />
              </div>

              <div
                onClick={onCancelBtnClick}
                className="cancel_btn"
                style={{ outline: 'none' }}
              >
                <UilTimes
                  size="45"
                  color="#FF0000"
                  style={{
                    // padding: '.5em',
                    backgroundColor: '#ca14141a',
                    borderRadius: '10px',
                    minHeight: 'inherit',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="lists__section">
        {resourceContxt.isResourceLoading ? (
          <LoadingResourcesComponent showControls={true} />
        ) : (
          <div className="list__items">
            {/* NOTE: Only render the unassigned professors when isAssigning is set to 'true' */}
            {resourceContxt.unAssignedProfessors &&
              isAssigning &&
              (resourceContxt.unAssignedProfessors.length > 0
                ? resourceContxt.unAssignedProfessors.map((unassignedProf) => (
                    <div className="profItem" key={unassignedProf.userId}>
                      <div className="prof__info">
                        <img
                          src={`/img/users/${unassignedProf.photo}`}
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
                        <div
                          className="name__privilege"
                          style={{ margin: '.4em 0' }}
                        >
                          <h2>
                            {unassignedProf.surName.concat(
                              ` ${unassignedProf.otherNames}`
                            )}
                          </h2>
                          <p>{unassignedProf.privilege.replaceAll('_', ' ')}</p>
                        </div>
                        <input
                          type={'checkbox'}
                          style={{ marginLeft: 'auto' }}
                          className="checkbx"
                          value={unassignedProf.userId}
                          onClick={onCheckBoxClick}
                        />
                      </div>
                    </div>
                  ))
                : 'No unassigned Lecturers yet')}

            {resourceContxt.assignedProfessors &&
              !isAssigning &&
              (resourceContxt.assignedProfessors.length > 0
                ? resourceContxt.assignedProfessors.map((assignedProf) => (
                    <div className="profItem" key={assignedProf.userId}>
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
        )}
      </section>
    </div>
  );
};

export default AssignedLecturersPage;
