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
    isResourceLoading: null,
    professors: null,
    LectureHallQRcodes: null,
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
  const loadAllFaculties = async (navigateTo) => {
    try {
      const res = await fetch(`/api/v1/faculties/`);
      //EDGE-CASE: incase there's UNAUTHORISED ACCESS naviagteTo the homepage
      if (res.status === 401) {
        navigateTo('/');
      }
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
      dispatch({
        type: Types.SET_RESOURCE_LOADING,
      });

      const res = await fetch(`/api/v1/courses?facultyId=${facultyId}`);
      if (res.status === 200) {
        const results = await res.json();
        dispatch({
          type: Types.LOAD_COURSES_SUCCESS,
          payload: results.courses,
        });
        dispatch({
          type: Types.SET_RESOURCE_LOADING,
        });
      }
    } catch (err) {
      dispatch({
        type: Types.LOAD_COURSES_ERROR,
        payload: 'Trouble loading courses',
      });
    }
  };
  /**
   * This function fetches all the users that are professors (those with privilge = professor or head_of_department)
   * and sets the results gotten as the professors in the context
   */
  const loadAllProfessors = async () => {
    try {
      dispatch({
        type: Types.SET_RESOURCE_LOADING,
      });
      const res = await fetch(`/api/v1/users/professors`);
      if (res.status === 200) {
        const results = await res.json();
        dispatch({
          type: Types.LOAD_PROFESSORS,
          payload: results.professors,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: Types.LOAD_PROFESSORS_ERROR,
        payload: {
          heading: 'Uh, oh',
          detail: 'Something went very wrong',
          type: 'error',
        },
      });
    }
  };
  /**
   * This function fetchs and sets the lecture hall's QRcodes in the state
   */
  const loadLectureHallQRcodes = async () => {
    try {
      dispatch({
        type: Types.SET_RESOURCE_LOADING,
      });
      const res = await fetch(`/api/v1/qrcodes`);
      if (res.status === 200) {
        const results = await res.json();
        dispatch({
          type: Types.LOAD_LECTURE_HALL_QRCODES,
          payload: results.lectureHallQRcodes,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: Types.LOAD_LECTURE_HALL_QRCODES_ERROR,
        payload: {
          heading: 'Uh, oh',
          detail: 'Something went very wrong',
          type: 'error',
        },
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
        isResourceLoading: state.isResourceLoading,
        professors: state.professors,
        LectureHallQRcodes: state.LectureHallQRcodes,
        addProfessor,
        addCourse,
        addFaculty,
        loadAllFaculties,
        loadAllCourses,
        loadAllProfessors,
        loadLectureHallQRcodes,
      }}
    >
      {children}
    </resourceContext.Provider>
  );
};
export default resourceContext;
