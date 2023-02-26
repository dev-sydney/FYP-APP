import React from 'react';
import './../../styles/skeletonStyle.scss';

const LoadingDeptCourses = () => {
  return (
    <div className="skeleton_dept">
      {[1, 2, 3, 4, 5].map((el) => (
        <div className="skeleton_dept_course" key={el}>
          <a href="">
            <div className="sk_title">
              <h2></h2>
              <h2 style={{ width: '80%', marginTop: '.4em' }}></h2>
            </div>
            <div className="sk_lecturer_num__photo">
              <div></div>
              <div className="sk_lecturers_num"></div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default LoadingDeptCourses;
