import { createContext, useReducer } from 'react';

import attendanceReducer from '../reducers/attendanceReducer';
import * as Types from '../utils/types';

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
  };

  const [state, dispatch] = useReducer(attendanceReducer, initialState);
  const clearSomeContextState = (type) => {
    dispatch({
      type,
    });
  };
  /**
   * Creates a timestamp string in the format (YYYY-MM-DD hh:mm:ss)
   * @param {Object} DateObject A Date Object
   * @returns {String} TIMESTAMP string
   */
  const getDateTimeString = (DateObject) => {
    return DateObject.toISOString().split('T').join(' ').replace('Z', '');
  };

  /**
   * This function is responsible for making requests to the API route that will start
   * the ongoing attendance
   * @param {Object} formData
   * @param {String} QRcodeData
   */
  const startOngoingAttendance = async (formData, QRcodeData) => {
    try {
      //TODO: Create the start and end time AND adding it to the form data
      let currentTime = new Date(
        Date.now() + (+formData.duration + 1) * 60 * 1000
      ); //Add an extra min cos it might take a while

      formData.createdAt = getDateTimeString(new Date(Date.now()));
      formData.endsAt = getDateTimeString(currentTime);

      let queryStrings = QRcodeData.split(' '); //get the query strings for the URL

      //TODO: MODIFY THE FORM DATA TO BE SENT TO THE API
      delete formData['duration']; //deleting the unwanted fields
      delete formData['facultyId'];
      formData.courseId = +formData.courseId; //make the neccesary fields have numeric values

      // //TODO:
      const res = await fetch(
        `/api/v1/attendances/ongoing/?${queryStrings[0]}&${queryStrings[1]}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      if (res.status === 201) {
        const results = await res.json();
        dispatch({
          type: Types.START_ONGOING_ATTENDANCE,
          payload: {
            heading: 'Awesome',
            detail: results.msg,
            type: 'success',
          },
        });
        setTimeout(() => {
          dispatch({
            type: Types.CLEAR_ATTENDANCE_ALERT,
          });
        }, 2000);
      }
    } catch (err) {
      dispatch({
        type: Types.START_ONGOING_ATTENDANCE_FAILURE,
        payload: {
          heading: 'Uh, oh',
          detail: 'Oops, trouble starting an attendance, please try again',
          type: 'error',
        },
      });
    }
  };
  /**
   * Function gets the data about a scanned QRcode whether its occupied by a professor or its locked
   * @param {*} QRcodeData The string data got from the scanned QRcode
   */
  const getAttendanceDetails = async (QRcodeData) => {
    try {
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

      //EDGE-CASE: IF THE RESPONSE WAS UNSUCCESSFUL & ATTENDANCE TIMED OUT
      if (res.status === 406) {
        const result = await res.json();
        dispatch({
          type: Types.SET_RANDOM_SECURITY_QUESTION_FAILURE,
          payload: {
            heading: 'Uh, oh',
            detail: result.message,
            type: 'error',
          },
        });

        setTimeout(() => {
          dispatch({
            type: Types.CLEAR_ATTENDANCE_ALERT,
          });
        }, 2000);
      }
      //TODO: RESPONSE WAS SUCCESSFUL AND USER GETS SECURITY QUESTION
      const results = await res.json();
      delete results['status'];

      dispatch({
        type: Types.SET_RANDOM_SECURITY_QUESTION,
        payload: results,
      });
    } catch (err) {
      console.log(err.message);
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
        type: Types.SET_LOADING,
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
      if (res.status === 406) {
        let incorrectAnswerError = new Error(result.message);
        incorrectAnswerError.status = 406;
        throw incorrectAnswerError;
      }

      if (res.status === 200) {
        dispatch({
          type: Types.SECURITY_ANSWER_CORRECT,
          payload: {
            heading: 'Well done!',
            detail: result.message,
            type: 'success',
          },
        });

        setTimeout(() => {
          dispatch({ type: Types.CLEAR_ATTENDANCE_ALERT });
        }, 2000);
      }
    } catch (err) {
      if (err.status === 406) {
        dispatch({
          type: Types.SECURITY_ANSWER_CORRECT_INCORRECT,
          payload: {
            heading: 'Uh, oh',
            detail: err.message,
            type: 'error',
          },
        });
        setTimeout(() => {
          dispatch({ type: Types.CLEAR_ATTENDANCE_ALERT });
        }, 2000);
      } else {
        dispatch({
          type: Types.SET_ALERT,
          payload: {
            heading: 'Uh, oh',
            detail: 'Something went very wrong',
            type: 'error',
          },
        });
        setTimeout(() => {
          dispatch({ type: Types.CLEAR_ATTENDANCE_ALERT });
        }, 2000);
      }
    }
  };
  /**
   * Function Responsible for making API calls to retrieve the attendances started by a professor
   */
  const getAttendancesStarted = async (navigateTo) => {
    try {
      const res = await fetch(`/api/v1/attendances/ongoing/`);

      //EDGE-CASE: IF THE USER HAS UNAUTHORIZED ACCESS
      if (res.status === 401) navigateTo('/');
      if (res.ok) {
        const results = await res.json();

        dispatch({
          type: Types.GET_ONGOING_ATTENDANCES,
          payload: results.professorAttendances,
        });
      }
    } catch (err) {
      dispatch({
        type: Types.GET_ONGOING_ATTENDANCES_ERROR,
        payload:
          'Touble getting attendances at the moment, please try again later.',
      });
    }
  };
  const getSignedAttendances = async (ongoingAttendanceId) => {
    try {
      const res = await fetch(
        `/api/v1/attendances/signed-attendances/${+ongoingAttendanceId}`
      );
      if (res.ok) {
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
      state.isLoading = true;
      const res = await fetch(`/api/v1/users/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      //EDGE-CASE: IF THERES NO MATCH FOR THE INDEX NUMBER
      if (res.status === 404) throw new Error('No results found.');

      if (res.ok) {
        const result = await res.json();
        state.isLoading = false;

        dispatch({
          type: Types.SET_STUDENT,
          payload: result.student,
        });
      }
    } catch (err) {
      dispatch({
        type: Types.SET_STUDENT_ERROR,
        payload: err.message,
      });
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
      const res = await fetch(
        `/api/v1/attendances/manual-attendance-sign/${+userId}/${+courseId}/${+ongoingAttendanceId}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      if (res.ok) {
        const result = await res.json();

        dispatch({
          type: Types.ADD_STUDENT,
          payload: result.signedAttendance,
        });
      }
    } catch (err) {
      // console.log(err);
      dispatch({
        type: Types.ADD_STUDENT_ERROR,
        payload: 'Trouble Adding Student, please try again.',
      });
    }
  };
  const eraseOngoingAttendance = async (ongoingAttendanceId) => {
    try {
      const res = await fetch(`/api/v1/ongoing/${ongoingAttendanceId}`, {
        method: 'PATCH',
      });
      if (res.ok) {
        const result = await res.json();
        dispatch({
          type: Types.ERASED_ONGOING_ATTENDANCE,
          payload: result.msg,
        });
      }
    } catch (err) {
      // console.log(err);
      dispatch({
        type: Types.ERASED_ONGOING_ATTENDANCE_ERROR,
        payload: 'Touble ending this attendance,please connect and try again.',
      });
    }
  };
  const loadAttendanceScores = async (formData, courseId) => {
    try {
      formData.startDate = formData.startDate.replace('T', ' ');
      formData.endDate = formData.endDate.replace('T', ' ');
      const res = await fetch(
        `/api/v1/attendances/semester-attendance-scores/${courseId}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        dispatch({
          type: Types.LOAD_ATTENDANCE_SCORES_SUCCESS,
          payload: data.results,
        });
      }
    } catch (err) {
      // console.log(err);
      dispatch({
        type: Types.LOAD_ATTENDANCE_SCORES_ERROR,
        payload: err.message,
      });
    }
  };
  const clearRandomSecurityQuestion = () => {
    dispatch({ type: Types.CLEAR_RANDOM_SECURITY_QUESTION });
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
        startOngoingAttendance,
        getAttendanceDetails,
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
      }}
    >
      {children}
    </attendanceContext.Provider>
  );
};

export default attendanceContext;
