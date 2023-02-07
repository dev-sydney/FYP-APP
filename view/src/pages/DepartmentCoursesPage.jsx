import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UilUserPlus } from '@iconscout/react-unicons';

import resourceContext from '../contexts/ResourceContext';

import './../styles/departmentCoursesStyle.scss';

const stat = 1;
/**
 * This page component renders all of the courses under a department,
 *  as well as the number of lecturers assigned to each course
 * @returns
 */
const DepartmentCoursesPage = () => {
  const resourceContxt = useContext(resourceContext);

  useEffect(() => {
    resourceContxt.loadDepartmentCourses();
  }, [stat]);

  return (
    <div className="deptCourses__container">
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
          Courses In Your
          <br /> Department
        </h1>
      </section>
      <section>
        <div className="dept_courses">
          {resourceContxt.departmentCourses &&
            (resourceContxt.departmentCourses.length > 0
              ? resourceContxt.departmentCourses.map((deptCourse) => (
                  <div className="course_item" key={deptCourse.courseId}>
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
      </section>
    </div>
  );
};

export default DepartmentCoursesPage;
