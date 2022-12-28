import { createContext, useReducer } from 'react';
import * as Types from '../utils/types';

import resourceReducer from '../reducers/resourcesReducer';

const resourceContext = createContext();

export const ResourceContextProvider = ({ children }) => {
  const initialState = {
    resourceContextAlert: null,
    lectureRoomQRcode: null,
    faculties: null,
    courses: null,
  };
  const [state, dispatch] = useReducer(resourceReducer, initialState);

  const addProfessor = async (formData) => {
    try {
      formData.facultyId = +formData.facultyId;

      const res = await fetch(`/api/v1/users/professors/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 201) {
        const result = await res.json();

        dispatch({
          type: Types.ADD_PROFESSOR_SUCCESS,
          payload: result.msg,
        });
      }
    } catch (err) {
      dispatch({
        type: Types.ADD_PROFESSOR_ERROR,
        payload: err.message,
      });
    }
  };

  const addCourse = async (formData) => {
    try {
      formData.facultyId = +formData.facultyId;
      const res = await fetch(`/api/v1/courses/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 201) {
        const result = await res.json();

        dispatch({
          type: Types.ADD_COURSE_SUCCESS,
          payload: result.msg,
        });
      }
    } catch (err) {
      dispatch({
        type: Types.ADD_COURSE_ERROR,
        payload: result.msg,
      });
    }
  };

  const addFaculty = async (formData) => {
    try {
      const res = await fetch(`/api/v1/faculties/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 201) {
        const result = await res.json();
        dispatch({
          type: Types.ADD_FACULTY_SUCCESS,
          payload: 'Faculty added successfully',
        });
      }
    } catch (err) {
      dispatch({
        type: Types.ADD_FACULTY_ERROR,
        payload: 'Trouble adding faculty, please try again',
      });
    }
  };
  const loadAllFaculties = async () => {
    try {
      const res = await fetch(`/api/v1/faculties/`);
      if (res.status === 200) {
        const results = await res.json();
        dispatch({
          type: Types.LOAD_FACULTIES_SUCCESS,
          payload: results.faculties,
        });
      }
    } catch (err) {
      dispatch({
        type: Types.LOAD_FACULTIES_ERROR,
        payload: 'Trouble loading faculties',
      });
    }
  };
  const loadAllCourses = async (facultyId) => {
    try {
      const res = await fetch(`/api/v1/courses?facultyId=${facultyId}`);
      if (res.status === 200) {
        const results = await res.json();
        dispatch({
          type: Types.LOAD_COURSES_SUCCESS,
          payload: results.courses,
        });
      }
    } catch (err) {
      dispatch({
        type: Types.LOAD_COURSES_ERROR,
        payload: 'Trouble loading courses',
      });
    }
  };
  return (
    <resourceContext.Provider
      value={{
        resourceContextAlert: state.resourceContextAlert,
        lectureRoomQRcode: state.lectureRoomQRcode,
        faculties: state.faculties,
        courses: state.courses,
        addProfessor,
        addCourse,
        addFaculty,
        loadAllFaculties,
        loadAllCourses,
      }}
    >
      {children}
    </resourceContext.Provider>
  );
};
export default resourceContext;
