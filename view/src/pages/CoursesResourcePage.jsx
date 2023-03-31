import React, { useContext, useEffect, useState } from 'react';
import { UilTrashAlt, UilPen, UilBookMedical } from '@iconscout/react-unicons';
import resourceContext from '../contexts/ResourceContext';

import ModalBackground from '../components/ModalBackground';
import AddCourseForm from './../components/AddCourseForm';
import LoadingResourcesComponent from '../components/loadingComponents/LoadingResourcesComponent';
import DialogBox from '../components/DialogBox';

import './../styles/resourceStyle.scss';

const stat = 1;
const CoursesResourcePage = () => {
  const resourceContxt = useContext(resourceContext);

  const [formData, setFormData] = useState({ facultyId: 0 });
  const [isModalActive, setIsModalActive] = useState(false);
  const [isDialogModalActive, setIsDialogModalActive] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(0);
  const dialogMessage =
    'Deleting this course will erase all data associated with it.';

  useEffect(() => {
    resourceContxt.loadAllCourses();
  }, [stat]);

  const onDeleteClick = (courseId) => () => {
    resourceContxt.deleteCourse(courseId);
  };

  return (
    <div className="course_resource__container">
      {/* NOTE: CONDTIONAL RENDERING FOR THE MODAL BACKGROUND & FORM */}
      {isModalActive ? (
        <ModalBackground
          children={
            <AddCourseForm
              isModalActive={isModalActive}
              setIsModalActive={setIsModalActive}
            />
          }
        />
      ) : (
        ''
      )}
      {/* NOTE: Conditional rendering logic for the modal & dialog box */}
      {isDialogModalActive ? (
        <ModalBackground
          children={
            <DialogBox
              dialogMessage={dialogMessage}
              onProceedClickFn={resourceContxt.deleteCourse}
              onCancelClickFn={setIsDialogModalActive}
              args={selectedCourseId}
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
          Manage Courses
          <br />
          In Your Department
        </h1>
      </section>

      <section className="lists__section">
        {resourceContxt.isResourceLoading ? (
          <LoadingResourcesComponent />
        ) : (
          <div className="list__items">
            {resourceContxt.courses &&
              (resourceContxt.courses.length > 0
                ? resourceContxt.courses.map((course) => (
                    <div className="faculty_item" key={course.courseId}>
                      <div className="coursename__code">
                        <h2 style={{ textAlign: 'left', margin: '0' }}>
                          {course.courseName}
                        </h2>
                        <p className="course_code">{course.courseCode}</p>
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
                            setSelectedCourseId(course.courseId);
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
                : 'No Courses Yet!')}
          </div>
        )}
      </section>
    </div>
  );
};

export default CoursesResourcePage;
