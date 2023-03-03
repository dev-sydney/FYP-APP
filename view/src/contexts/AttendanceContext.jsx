import { createContext, useReducer } from 'react';
import randomColor from 'randomcolor';

import attendanceReducer from '../reducers/attendanceReducer';
import * as Types from '../utils/types';
import { AppAlert } from '../utils/config';

const attendanceContext = createContext();

export const AttendanceContextProvider = ({ children }) => {
  const initialState = {
    attendanceAlert: null,
    signedAttendances: null,
    ongoingAttendances: null,
    codeDetails: null,
    studentRandomQ: null,
    QRcodeId: null,
    securityQuestionAlert: null,
    student: null,
    isLoading: null,
    attendanceScores: null,
    QRcodeStatus: null,
    isStudentLoading: null,
    attendedLecturesSummaries: null,
    attendedLectures: null,
    currentCourseName: null,
    coursesColors: null,
  };

  const [state, dispatch] = useReducer(attendanceReducer, initialState);
  const clearSomeContextState = (type) => {
    dispatch({
      type,
    });
  };
  /**
   * This function starts a timeout function which dispatches the type to clear authAlertMessage in the context
   */
  const clearContextAlerts = (secs = 3000) => {
    setTimeout(() => {
      dispatch({
        type: Types.CLEAR_ATTENDANCE_ALERT,
      });
    }, secs);
  };

  /**
   * This function is responsible for making requests to the API route that will start
   * the ongoing attendance
   * @param {Object} durationCourse
   * @param {String} QRcodeData
   */
  const startOngoingAttendance = async (
    durationCourse = { duration: 0, courseId: 0, courseName: '' },
    QRcodeData
  ) => {
    try {
      dispatch({ type: Types.SET_ATTENDANCE_LOADING });
      let QRcodeIdLectureRoom = QRcodeData.split(' '); //--> ['QRcodeId=?','lectureRoom=?']
      const res = await fetch(
        `/api/v1/attendances/ongoing/?${QRcodeIdLectureRoom[0]}&${QRcodeIdLectureRoom[1]}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(durationCourse),
        }
      );
      const results = await res.json();
      //EDGE-CASE: something went wrong with starting the ongoing attendance
      if (res.status >= 400) {
        throw new Error(results.message);
      }

      if (res.status === 201) {
        dispatch({
          type: Types.START_ONGOING_ATTENDANCE,
          payload: new AppAlert(results.message, 'success'),
        });
        clearContextAlerts();
      }
    } catch (err) {
      dispatch({
        type: Types.START_ONGOING_ATTENDANCE_FAILURE,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };

  /**
   * This function makes a call to the API to fetch the data about a scanned QRcode (whether its occupied by a professor or its locked)
   * @param {*} QRcodeData The string data got from the scanned QRcode
   */
  const getQRcodeDetails = async (QRcodeData) => {
    try {
      dispatch({
        type: Types.SET_ATTENDANCE_LOADING,
      });

      state.QRcodeId = QRcodeData.split(' ')[0].split('=')[1]; //QRcodeId=1 --> 1
      // console.log(QRcodeData);
      const res = await fetch(
        `/api/v1/attendances/getCurrentProfessor/${state.QRcodeId}`
      );
      const results = await res.json();
      //EDGE-CASE: IF THE QRCODE IS EITHER LOCKED
      if (res.status === 423) {
        dispatch({
          type: Types.QRCODE_LOCKED,
          payload: results.message,
        });
      }
      // OR UNKNOWN(NOT AVAILABLE IN THE DB)
      // if (res.status >= 400) {
      //   throw new Error(results.message ? results.message : results.msg);
      // }
      // console.log({ results, res });
      //EDGE-CASE: IF THE status is 'rejected'

      //TODO: IF THE status is 'success'
      if (res.status === 200) {
        dispatch({
          type: Types.GET_QRCODE_DETAILS,
          payload: results.qrCodeDetails,
        });
      }
    } catch (err) {
      /* dispatch({
        type: Types.GET_QRCODE_DETAILS_FAILURE,
        payload: {
          heading: 'Uh, oh',
          detail: err.message,
          type: 'error',
        },
      }); */
      console.log(err.message);
    }
  };

  /**
   * Function Responsible for making an API call to validate whether a student can sign an attendance by
   * checking whether an ongoing attendance has expired or not and get a randomsecurity question
   * @param {*} QRcodeData
   */
  const getRandomSecurityQuestion = async () => {
    try {
      const res = await fetch(
        `/api/v1/attendances/validate-attendance/${state.QRcodeId}`
      );
      const results = await res.json();

      //EDGE-CASE: IF THE RESPONSE WAS UNSUCCESSFUL & ATTENDANCE TIMED OUT
      if (res.status >= 400) throw new Error(results.message);

      //TODO: RESPONSE WAS SUCCESSFUL AND USER GETS SECURITY QUESTION
      delete results['status'];
      if (res.status == 200) {
        dispatch({
          type: Types.SET_RANDOM_SECURITY_QUESTION,
          payload: results,
        });
      }
    } catch (err) {
      dispatch({
        type: Types.SET_RANDOM_SECURITY_QUESTION_FAILURE,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };
  /**
   * Function Responsible for making an API call to validate a users answer
   * to a security question and to create a signed attendance if the answer's right
   * @param {*} formData
   */
  const answerQuestionAndSignAttendance = async (formData) => {
    try {
      dispatch({
        type: Types.SET_ATTENDANCE_LOADING,
      });
      const res = await fetch(
        `/api/v1/attendances/sign-attendance/${state.studentRandomQ.ongoingAttendanceId}/${state.studentRandomQ.courseId}/${state.studentRandomQ.randomIndexNum}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await res.json();
      // console.log({ res, result });
      //EDGE-CASE: IF THE ANSWER IS INCORRECT
      /*  if (res.status === 406) {
        let incorrectAnswerError = new Error(result.message);
        incorrectAnswerError.status = 406;
        throw incorrectAnswerError;
      } */

      if (res.status >= 400) throw new Error(result.message);

      if (res.status === 200) {
        dispatch({
          type: Types.SECURITY_ANSWER_CORRECT,
          payload: {
            heading: 'Well done!',
            detail: result.message,
            type: 'success',
          },
        });
        clearContextAlerts(2000);
      }
    } catch (err) {
      dispatch({
        type: Types.SECURITY_ANSWER_INCORRECT,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };

  /**
   * Function Responsible for making API calls to retrieve the attendances started by a professor
   */
  const getAttendancesStarted = async (navigateTo) => {
    try {
      dispatch({
        type: Types.SET_ATTENDANCE_LOADING,
      });
      const res = await fetch(`/api/v1/attendances/ongoing/`);

      //EDGE-CASE: IF THE USER HAS UNAUTHORIZED ACCESS
      if (res.status === 401) navigateTo('/');
      if (res.status === 200) {
        const results = await res.json();

        dispatch({
          type: Types.GET_ONGOING_ATTENDANCES,
          payload: results.professorAttendances,
        });
      }
    } catch (err) {
      dispatch({
        type: Types.GET_ONGOING_ATTENDANCES_ERROR,
        payload: new AppAlert(
          'Touble getting attendances at the moment, please try again later.',
          'error'
        ),
      });
      clearContextAlerts();
    }
  };
  const getSignedAttendances = async (ongoingAttendanceId) => {
    try {
      dispatch({
        type: Types.SET_ATTENDANCE_LOADING,
      });

      const res = await fetch(
        `/api/v1/attendances/signed-attendances/${+ongoingAttendanceId}`
      );
      if (res.status === 200) {
        const results = await res.json();
        dispatch({
          type: Types.GET_SIGNED_ATTENDANCES,
          payload: results.studentsPresent,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getStudent = async (formData) => {
    try {
      formData.indexNumber = +formData.indexNumber;
      dispatch({
        type: Types.SET_STUDENT_LOADING,
      });
      const res = await fetch(`/api/v1/users/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      //EDGE-CASE: IF THERES NO MATCH FOR THE INDEX NUMBER
      if (res.status >= 400) throw new Error(result.message);

      if (res.status === 200) {
        dispatch({
          type: Types.SET_STUDENT,
          payload: result.student,
        });
      }
    } catch (err) {
      dispatch({
        type: Types.SET_STUDENT_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };
  /**
   * Function responsible for making an API call to the route that will
   * add a student to the attendances being taken incase a student is unable to answer their security
   * question to successfully sign an attendance
   * @param {Number} userId The students userId corresponding to what is in the DB
   * @param {Number} ongoingAttendanceId The id of the ongoingAttendance corresponding to what is in the DB
   * @param {Number} courseId The id of the course corresponding to what is in the DB
   */
  const addStudentToAttendances = async (
    userId,
    ongoingAttendanceId,
    courseId
  ) => {
    try {
      dispatch({
        type: Types.SET_ATTENDANCE_LOADING,
      });

      const res = await fetch(
        `/api/v1/attendances/manual-attendance-sign/${+userId}/${+courseId}/${+ongoingAttendanceId}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      const result = await res.json();

      if (res.status >= 400) throw new Error(result.message);

      if (res.status === 201) {
        dispatch({
          type: Types.ADD_STUDENT,
          payload: result.signedAttendance,
          alert: new AppAlert('Signed successfully!', 'success'),
        });
        clearContextAlerts();
      }
    } catch (err) {
      // console.log(err);
      dispatch({
        type: Types.ADD_STUDENT_ERROR,
        payload: new AppAlert(
          'Trouble Adding Student, please try again.',
          'error'
        ),
      });
      clearContextAlerts();
    }
  };

  const eraseOngoingAttendance = async (ongoingAttendanceId) => {
    try {
      const res = await fetch(`/api/v1/ongoing/${ongoingAttendanceId}`, {
        method: 'PATCH',
      });
      const result = await res.json();

      if (res.status >= 400) throw new Error(result.message);

      if (res.status === 200) {
        dispatch({
          type: Types.ERASED_ONGOING_ATTENDANCE,
          payload: new AppAlert(result.message, 'success'),
        });
        clearContextAlerts();
      }
    } catch (err) {
      // console.log(err);
      dispatch({
        type: Types.ERASED_ONGOING_ATTENDANCE_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };

  const loadAttendanceScores = async (formData) => {
    try {
      formData.startDate = formData.startDate.replace('T', ' ');
      formData.endDate = formData.endDate.replace('T', ' ');
      const res = await fetch(
        `/api/v1/attendances/semester-attendance-scores/`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (res.status >= 400) throw new Error(data.message);

      if (res.status === 200) {
        dispatch({
          type: Types.LOAD_ATTENDANCE_SCORES_SUCCESS,
          payload: data.results,
        });
      }
    } catch (err) {
      // console.log(err);
      dispatch({
        type: Types.LOAD_ATTENDANCE_SCORES_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };

  const getAttendedLecturesSummaries = async (formData) => {
    try {
      dispatch({
        type: Types.SET_ATTENDANCE_LOADING,
      });

      const res = await fetch(`/api/v1/attendances/lecturesAttended`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (res.status >= 400) throw new Error(result.message);

      if (res.status === 200) {
        dispatch({
          type: Types.LOAD_ATTENDED_LECTURES,
          payload: result.attendedLectures,
          colors: randomColor({
            count: result.attendedLectures.length,
            format: 'rgba',
            alpha: 0.7,
          }),
        });
      }
    } catch (err) {
      dispatch({
        type: Types.LOAD_ATTENDED_LECTURES_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };

  const getCoursesSignedAttendances = async (courseId) => {
    try {
      dispatch({
        type: Types.SET_ATTENDANCE_LOADING,
      });

      const res = await fetch(
        `/api/v1/attendances/lecturesAttended/${courseId}`
      );
      const results = await res.json();

      if (res.status >= 400) throw new Error(results.message);

      if (res.status === 200) {
        dispatch({
          type: Types.LOAD_COURSE_SIGNED_ATENDANCES,
          payload: results.attendedLectures,
        });
      }
    } catch (err) {
      dispatch({
        type: Types.LOAD_COURSE_SIGNED_ATENDANCES_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts;
    }
  };

  const clearRandomSecurityQuestion = () => {
    dispatch({ type: Types.CLEAR_RANDOM_SECURITY_QUESTION });
  };
  const setCurrentCourseName = (courseName) => {
    dispatch({ type: Types.SET_CURRRENT_COURSENAME, payload: courseName });
  };
  return (
    <attendanceContext.Provider
      value={{
        signedAttendances: state.signedAttendances,
        ongoingAttendances: state.ongoingAttendances,
        attendanceAlert: state.attendanceAlert,
        codeDetails: state.codeDetails,
        studentRandomQ: state.studentRandomQ,
        securityQuestionAlert: state.securityQuestionAlert,
        student: state.student,
        isLoading: state.isLoading,
        attendanceScores: state.attendanceScores,
        QRcodeStatus: state.QRcodeStatus,
        isStudentLoading: state.isStudentLoading,
        attendedLectures: state.attendedLectures,
        attendedLecturesSummaries: state.attendedLecturesSummaries,
        currentCourseName: state.currentCourseName,
        coursesColors: state.coursesColors,
        startOngoingAttendance,
        getQRcodeDetails,
        getRandomSecurityQuestion,
        answerQuestionAndSignAttendance,
        getAttendancesStarted,
        getSignedAttendances,
        getStudent,
        addStudentToAttendances,
        clearSomeContextState,
        eraseOngoingAttendance,
        loadAttendanceScores,
        clearRandomSecurityQuestion,
        getAttendedLecturesSummaries,
        getCoursesSignedAttendances,
        setCurrentCourseName,
      }}
    >
      {children}
    </attendanceContext.Provider>
  );
};

export default attendanceContext;
