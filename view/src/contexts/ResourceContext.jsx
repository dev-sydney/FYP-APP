import { createContext, useReducer } from 'react';
import * as Types from '../utils/types';
import { AppAlert } from '../utils/config';
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
    departments: null,
    departmentCourses: null,
    assignedProfessors: null,
    unAssignedProfessors: null,
  };
  const [state, dispatch] = useReducer(resourceReducer, initialState);

  /**
   * This function starts a timeout function which dispatches the type to clear authAlertMessage in the context
   */
  const clearContextAlerts = (secs = 3000) => {
    setTimeout(() => {
      dispatch({
        type: Types.CLEAR_RESOURCE_ALERT,
      });
    }, secs);
  };

  /**
   * This function makes a POST request to the API and sends a form data about the newly added professor
   * to be added to the system
   * @param {*} formData
   */
  const addProfessor = async (formData) => {
    try {
      dispatch({ type: Types.SET_RESOURCE_LOADING });
      formData.facultyId = +formData.facultyId;

      const res = await fetch(`/api/v1/users/professors/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (res.status >= 400) throw new Error(result.message);

      if (res.status === 201) {
        dispatch({
          type: Types.ADD_PROFESSOR_SUCCESS,
          payload: new AppAlert(result.message, 'success'),
        });
        clearContextAlerts(2000);
      }
    } catch (err) {
      dispatch({
        type: Types.ADD_PROFESSOR_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts(2000);
    }
  };
  /**
   * This function makes a POST request to the API, and sends a form data about the newly added course
   * @param {*} formData
   */
  const addCourse = async (formData) => {
    try {
      dispatch({ type: Types.SET_RESOURCE_LOADING });

      const res = await fetch(`/api/v1/courses/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (res.status >= 400) throw new Error(result.message);

      if (res.status === 201) {
        dispatch({
          type: Types.ADD_COURSE_SUCCESS,
          payload: new AppAlert(result.message, 'success'),
        });
        clearContextAlerts();
      }
    } catch (err) {
      dispatch({
        type: Types.ADD_COURSE_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };

  const addFaculty = async (formData) => {
    try {
      dispatch({ type: Types.SET_RESOURCE_LOADING });

      const res = await fetch(`/api/v1/faculties/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.status >= 400) throw new Error(result.message);

      if (res.status === 201) {
        dispatch({
          type: Types.ADD_FACULTY_SUCCESS,
          payload: new AppAlert(result.message, 'success'),
        });
        clearContextAlerts();
      }
    } catch (err) {
      dispatch({
        type: Types.ADD_FACULTY_ERROR,
        payload: new AppAlert(
          'Trouble adding faculty, please try again',
          'error'
        ),
      });
      clearContextAlerts();
    }
  };

  const loadAllFaculties = async (navigateTo) => {
    try {
      dispatch({ type: Types.SET_RESOURCE_LOADING });

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
        // payload: 'Trouble loading faculties',
      });
    }
  };

  const loadAllCourses = async () => {
    try {
      dispatch({
        type: Types.SET_RESOURCE_LOADING,
      });

      const res = await fetch(`/api/v1/courses/`);
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
      const results = await res.json();

      if (res.status >= 400) throw new Error(results.message);
      if (res.status === 200) {
        dispatch({
          type: Types.LOAD_PROFESSORS,
          payload: results.professors,
        });
      }
    } catch (err) {
      // console.log(err);
      dispatch({
        type: Types.LOAD_PROFESSORS_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };
  /**
   * This function fetchs and sets the lecture hall's QRcodes in the state
   */
  const loadLectureHall = async () => {
    try {
      dispatch({
        type: Types.SET_RESOURCE_LOADING,
      });
      const res = await fetch(`/api/v1/qrcodes`);
      const results = await res.json();
      if (res.status >= 400) throw new Error(results.message);

      if (res.status === 200) {
        dispatch({
          type: Types.LOAD_LECTURE_HALL_QRCODES,
          payload: results.lectureHallQRcodes,
        });
      }
    } catch (err) {
      dispatch({
        type: Types.LOAD_LECTURE_HALL_QRCODES_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };

  const deleteProfessor = async (userId) => {
    try {
      const res = await fetch(`/api/v1/users/professors/${userId}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (res.status >= 400)
        throw new Error(
          result.message
            ? result.message
            : 'something went very wrong, please try again!'
        );

      if (res.status === 200) {
        dispatch({
          type: Types.DELETE_PROFESSOR,
          payload: new AppAlert(result.message, 'success'),
          userId,
        });
        clearContextAlerts();
      }
    } catch (err) {
      dispatch({
        type: Types.DELETE_PROFESSOR_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };
  const deleteLectureHallQRCode = async (QRcodeId) => {
    try {
      const res = await fetch(`/api/v1/qrcodes/${QRcodeId}`, {
        method: 'DELETE',
      });
      const result = await res.json();

      if (res.status >= 400)
        throw new Error(
          result.message
            ? result.message
            : 'something went very wrong, please try again!'
        );

      if (res.status === 200) {
        dispatch({
          type: Types.DELETE_LECTURE_HALL,
          payload: new AppAlert(result.message, 'success'),
          QRcodeId,
        });
        clearContextAlerts();
      }
    } catch (err) {
      dispatch({
        type: Types.DELETE_LECTURE_HALL_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };
  const deleteFaculty = async (facultyId) => {
    try {
      const res = await fetch(`/api/v1/faculties/${facultyId}`, {
        method: 'DELETE',
      });
      const result = await res.json();

      if (res.status >= 400)
        throw new Error(
          result.message
            ? result.message
            : 'something went very wrong, please try again!'
        );

      if (res.status === 200) {
        dispatch({
          type: Types.DELETE_FACULTY,
          payload: new AppAlert(result.message, 'success'),
          facultyId,
        });
        clearContextAlerts();
      }
    } catch (err) {
      dispatch({
        type: Types.DELETE_FACULTY_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };
  const deleteCourse = async (courseId) => {
    try {
      const res = await fetch(`/api/v1/courses/${courseId}`, {
        method: 'DELETE',
      });
      const result = await res.json();

      if (res.status >= 400)
        throw new Error(
          result.message
            ? result.message
            : 'something went very wrong, please try again!'
        );

      if (res.status === 200) {
        dispatch({
          type: Types.DELETE_COURSE,
          payload: new AppAlert(result.message, 'success'),
          courseId,
        });
        clearContextAlerts();
      }
    } catch (err) {
      dispatch({
        type: Types.DELETE_COURSE_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };
  const loadDepartments = async () => {
    try {
      const res = await fetch(`/api/v1/faculties/departments`);
      const result = await res.json();

      if (res.status >= 400)
        throw new Error(
          result.message
            ? result.message
            : 'something went very wrong, please try again!'
        );

      if (res.status === 200) {
        dispatch({
          type: Types.LOAD_DEPARTMENTS,
          payload: result.departments,
        });
      }
    } catch (err) {
      console.log('Something went wrong while loading the departments');
    }
  };

  const loadDepartmentCourses = async () => {
    try {
      dispatch({ type: Types.SET_RESOURCE_LOADING });

      const res = await fetch(`/api/v1/courses/assignedCourses`);
      const result = await res.json();

      if (res.status >= 400)
        throw new Error(
          result.message
            ? result.message
            : 'something went very wrong, please try again!'
        );

      if (res.status === 200) {
        dispatch({
          type: Types.LOAD_DEPARTMENT_COURSES,
          payload: result.coursesAndAssignedLectures,
        });
      }
    } catch (err) {
      dispatch({
        type: Types.LOAD_DEPARTMENT_COURSES_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };

  const loadAssignedProfessors = async (courseId) => {
    try {
      dispatch({ type: Types.SET_RESOURCE_LOADING });

      const res = await fetch(`/api/v1/users/assignedProfessors/${courseId}`);
      const result = await res.json();

      if (res.status >= 400)
        throw new Error(
          result.message
            ? result.message
            : 'something went very wrong, please try again!'
        );

      if (res.status === 200) {
        dispatch({
          type: Types.LOAD_ASSIGNED_PROFESSORS,
          payload: result.assignedProfessors,
        });
      }
    } catch (err) {
      dispatch({
        type: Types.LOAD_ASSIGNED_PROFESSORS_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };
  const deAllocateAssignedCourse = async (assignmentId) => {
    try {
      const res = await fetch(
        `/api/v1/users/assignedProfessors/${assignmentId}`,
        { method: 'DELETE' }
      );
      const result = await res.json();
      // console.log({ result, res });
      if (res.status >= 400)
        throw new Error(
          result.message
            ? result.message
            : 'something went very wrong, please try again!'
        );

      if (res.status === 200) {
        dispatch({
          type: Types.DEALLOCATE_PROFESSOR,
          payload: new AppAlert(result.message, 'success'),
          assignmentId,
        });
        clearContextAlerts();
      }
    } catch (err) {
      dispatch({
        type: Types.DEALLOCATE_PROFESSOR_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };

  const loadUnAssignedProfessors = async (courseId) => {
    try {
      dispatch({ type: Types.SET_RESOURCE_LOADING });

      const res = await fetch(`/api/v1/users/unassignedProfessors/${courseId}`);
      const result = await res.json();

      if (res.status >= 400)
        throw new Error(
          result.message
            ? result.message
            : 'something went very wrong, please try again!'
        );

      if (res.status === 200) {
        dispatch({
          type: Types.LOAD_UNASSIGNED_PROFESSORS,
          payload: result.unassignedProfessors,
        });
      }
    } catch (err) {
      dispatch({
        type: Types.LOAD_UNASSIGNED_PROFESSORS_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };

  const assignCourseToProfessor = async (
    init = { courseId: '', userIds: '' }
  ) => {
    try {
      const res = await fetch(
        `/api/v1/users/professors/?userIds=${init.userIds}&courseId=${init.courseId}`,
        { method: 'PATCH' }
      );
      const result = await res.json();
      if (res.status >= 400)
        throw new Error(
          result.message
            ? result.message
            : 'something went very wrong, please try again!'
        );
      if (res.status === 200) {
        dispatch({
          type: Types.ASSIGN_PROFESSOR,
          payload: new AppAlert(result.message, 'success'),
        });
        clearContextAlerts();
        await loadAssignedProfessors(init.courseId);
      }
    } catch (err) {
      dispatch({
        type: Types.ASSIGN_PROFESSOR_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
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
        departments: state.departments,
        departmentCourses: state.departmentCourses,
        assignedProfessors: state.assignedProfessors,
        unAssignedProfessors: state.unAssignedProfessors,
        addProfessor,
        addCourse,
        addFaculty,
        loadAllFaculties,
        loadAllCourses,
        loadAllProfessors,
        loadLectureHall,
        deleteProfessor,
        deleteLectureHallQRCode,
        deleteFaculty,
        deleteCourse,
        loadDepartments,
        loadDepartmentCourses,
        loadAssignedProfessors,
        deAllocateAssignedCourse,
        loadUnAssignedProfessors,
        assignCourseToProfessor,
      }}
    >
      {children}
    </resourceContext.Provider>
  );
};
export default resourceContext;
