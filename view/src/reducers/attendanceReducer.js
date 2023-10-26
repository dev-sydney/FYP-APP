import * as Types from '../utils/types';

const attendanceReducer = (state, action) => {
  switch (action.type) {
    case Types.SET_STUDENT_LOADING:
      return {
        ...state,
        isStudentLoading: true,
      };
    case Types.SET_ATTENDANCE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case Types.SET_ATTENDNACE_ALERT:
      return {
        ...state,
        attendanceAlert: action.payload,
      };
    case Types.CLEAR_ATTENDANCE_ALERT:
      return {
        ...state,
        attendanceAlert: null,
      };
    case Types.START_ONGOING_ATTENDANCE:
      return {
        ...state,
        attendanceAlert: action.payload,
        isLoading: null,
      };
    case Types.START_ONGOING_ATTENDANCE_FAILURE:
      return {
        ...state,
        attendanceAlert: action.payload,
        isLoading: null,
      };
    case Types.GET_QRCODE_DETAILS:
      return {
        ...state,
        codeDetails: action.payload,
        isLoading: null,
      };
    case Types.GET_QRCODE_DETAILS_FAILURE:
      return {
        ...state,
        QRcodeStatus: action.payload,
      };
    case Types.SET_RANDOM_SECURITY_QUESTION:
      return {
        ...state,
        studentRandomQ: action.payload,
      };
    case Types.CLEAR_RANDOM_SECURITY_QUESTION:
      return {
        ...state,
        studentRandomQ: null,
      };
    case Types.SECURITY_ANSWER_CORRECT:
      return {
        ...state,
        attendanceAlert: action.payload,
        studentRandomQ: null,
        isLoading: null,
      };
    case Types.SECURITY_ANSWER_INCORRECT:
      return {
        ...state,
        attendanceAlert: action.payload,
        isLoading: null,
      };
    case Types.GET_ONGOING_ATTENDANCES:
      return {
        ...state,
        ongoingAttendances: action.payload,
        isLoading: null,
      };
    case Types.GET_ONGOING_ATTENDANCES_ERROR:
      return {
        ...state,
        attendanceAlert: action.payload,
        isLoading: null,
      };
    case Types.GET_SIGNED_ATTENDANCES:
      return {
        ...state,
        isLoading: null,
        signedAttendances: action.payload,
      };
    case Types.SET_STUDENT:
      return {
        ...state,
        student: action.payload,
        isStudentLoading: null,
      };
    case Types.SET_STUDENT_ERROR:
      return {
        ...state,
        attendanceAlert: action.payload,
        isStudentLoading: null,
      };
    case Types.ADD_STUDENT:
      return {
        ...state,
        signedAttendances: [action.payload, ...state.signedAttendances],
        attendanceAlert: action.alert,
        isLoading: null,
        student: null,
      };
    case Types.ADD_STUDENT_ERROR:
      return {
        ...state,
        attendanceAlert: action.payload,
        isLoading: null,
        student: null,
      };
    case Types.CLEAR_STUDENT:
      return {
        ...state,
        student: null,
        signedAttendances: null,
      };
    case Types.ERASED_ONGOING_ATTENDANCE:
      return {
        ...state,
        attendanceAlert: action.payload,
      };
    case Types.ERASED_ONGOING_ATTENDANCE_ERROR:
      return {
        ...state,
        attendanceAlert: action.payload,
      };
    case Types.LOAD_ATTENDANCE_SCORES_SUCCESS:
      return {
        ...state,
        attendanceScores: action.payload,
      };
    case Types.LOAD_ATTENDANCE_SCORES_ERROR:
      return {
        ...state,
        attendanceScores: null,
        attendanceAlert: action.payload,
      };
    case Types.SET_RANDOM_SECURITY_QUESTION_FAILURE:
      return {
        ...state,
        attendanceAlert: action.payload,
      };
    case Types.QRCODE_LOCKED:
      return {
        ...state,
        QRcodeStatus: action.payload,
        isLoading: null,
      };
    case Types.CLEAR_QRCODE:
      return {
        ...state,
        QRcodeStatus: null,
        codeDetails: null,
      };
    case Types.LOAD_ATTENDED_LECTURES:
      return {
        ...state,
        attendedLecturesSummaries: action.payload,
        coursesColors: action.colors,
        isLoading: null,
      };
    case Types.LOAD_COURSE_SIGNED_ATENDANCES:
      return {
        ...state,
        attendedLectures: action.payload,
        isLoading: null,
      };
    case Types.LOAD_COURSE_SIGNED_ATENDANCES_ERROR:
      return {
        ...state,
        attendedLectures: null,
        isLoading: null,
        attendanceAlert: action.payload,
      };
    case Types.SET_CURRRENT_COURSENAME:
      return {
        ...state,
        currentCourseName: action.payload,
      };
    case Types.CLEAR_ATTENDED_LECTURES:
      return {
        ...state,
        attendedLectures: null,
      };
    case Types.CLEAR_ATTENDANCE_SCORES:
      return {
        ...state,
        attendanceScores: null,
      };
    default:
      return state;
  }
};

export default attendanceReducer;
