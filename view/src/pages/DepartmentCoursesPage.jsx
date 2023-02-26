import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UilUserPlus,
  UilEllipsisV,
  UilUsersAlt,
} from '@iconscout/react-unicons';

import resourceContext from '../contexts/ResourceContext';
import ModalBackground from '../components/ModalBackground';
import AddProfessorForm from '../components/AddProfessorForm';
import LoadingDeptCourses from '../components/loadingComponents/LoadingDeptCourses';
import './../styles/departmentCoursesStyle.scss';

const stat = 1;
/**
 * This page component renders all of the courses under a department,
 *  as well as the number of lecturers assigned to each course
 * @returns
 */
const DepartmentCoursesPage = () => {
  const resourceContxt = useContext(resourceContext);

  const [isModalActive, setIsModalActive] = useState(false);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);

  useEffect(() => {
    resourceContxt.loadDepartmentCourses();
  }, [stat]);

  return (
    <div className="deptCourses__container">
      {isModalActive ? (
        <ModalBackground
          children={
            <AddProfessorForm
              setIsModalActive={setIsModalActive}
              isModalActive={isModalActive}
            />
          }
        />
      ) : (
        ''
      )}
      <div
        className="icon"
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 .5em',
        }}
      >
        <UilEllipsisV
          size="40"
          color="#787676"
          style={{
            padding: '.5em',
            borderRadius: '50%',
            background: '#afafaf1a',
          }}
          onClick={() => {
            setIsMoreOptionsOpen(!isMoreOptionsOpen);
          }}
        />
        {isMoreOptionsOpen && (
          <div className="more_options">
            <div
              className="dropdown-content"
              onClick={() => {
                setIsModalActive(!isModalActive);
                setIsMoreOptionsOpen(!isMoreOptionsOpen);
              }}
            >
              <p>Add Professor </p>
              <UilUserPlus
                size="35"
                color="#0c4717"
                style={{
                  padding: '.5em',
                  borderRadius: '50%',
                  background: '#239f1845',
                  marginLeft: 'auto',
                }}
              />
            </div>
            <div className="dropdown-content">
              <Link to="/resourceManager/professors">
                <p>View Professors</p>
              </Link>
              <UilUsersAlt
                size="35"
                color="#efa92f"
                style={{
                  padding: '.5em',
                  borderRadius: '50%',
                  background: '#f9b94a3c',
                  marginLeft: 'auto',
                }}
              />
            </div>
          </div>
        )}
      </div>
      <section className="headings__section">
        <h1>
          Courses In Your
          <br /> Department
        </h1>
      </section>
      <section>
        {resourceContxt.isResourceLoading ? (
          <LoadingDeptCourses />
        ) : (
          <div className="dept_courses">
            {resourceContxt.departmentCourses &&
              (resourceContxt.departmentCourses.length > 0
                ? resourceContxt.departmentCourses.map((deptCourse, i) => (
                    <div
                      className="course_item"
                      key={deptCourse.courseId}
                      style={{
                        backgroundColor: resourceContxt.deptCoursesColors[i],
                      }}
                    >
                      <Link to={`/departmentCourses/${deptCourse.courseId}`}>
                        <div className="course_title">
                          <h2>{deptCourse.courseName}</h2>
                        </div>
                        <div className="lecturer_num__photo">
                          <img
                            src="/img/users/default.jpg"
                            alt=""
                            style={{
                              minHeight: '2em',
                              maxHeight: '2em',
                              maxWidth: '2em',
                              minWidth: '2em',

                              borderRadius: '50%',
                            }}
                          />
                          <div className="lecturers_num">
                            {deptCourse.AssignedLecturers <= 1
                              ? `${deptCourse.AssignedLecturers}+`
                              : `${deptCourse.AssignedLecturers - 1}+`}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                : '')}
          </div>
        )}
      </section>
    </div>
  );
};

export default DepartmentCoursesPage;
