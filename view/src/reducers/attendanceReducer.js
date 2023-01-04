import * as Types from '../utils/types';

const attendanceReducer = (state, action) => {
  switch (action.type) {
    case Types.SET_LOADING:
      return {
        ...state,
        isLoading: state.isLoading ? null : true,
      };
    case Types.SET_ALERT:
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
      };
    case Types.START_ONGOING_ATTENDANCE_FAILURE:
      return {
        ...state,
        attendanceAlert: action.payload,
      };
    case Types.GET_QRCODE_DETAILS:
      return {
        ...state,
        codeDetails: action.payload,
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
      };
    case Types.SECURITY_ANSWER_CORRECT_INCORRECT:
      return {
        ...state,
        attendanceAlert: action.payload,
        isLoading: null,
      };
    case Types.GET_ONGOING_ATTENDANCES:
      return {
        ...state,
        ongoingAttendances: action.payload,
      };
    case Types.GET_ONGOING_ATTENDANCES_ERROR:
      return {
        ...state,
        attendanceAlert: action.payload,
      };
    case Types.GET_SIGNED_ATTENDANCES:
      return {
        ...state,
        signedAttendances: action.payload,
      };
    case Types.SET_STUDENT:
      return {
        ...state,
        student: action.payload,
      };
    case Types.SET_STUDENT_ERROR:
      return {
        ...state,
        attendanceAlert: action.payload,
      };
    case Types.ADD_STUDENT:
      return {
        ...state,
        signedAttendances: [action.payload, ...state.signedAttendances],
        attendanceAlert: 'Added student successfully',
      };
    case Types.ADD_STUDENT_ERROR:
      return {
        ...state,
        attendanceAlert: action.payload,
      };
    case Types.CLEAR_STUDENT:
      return {
        ...state,
        student: null,
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
      };
    default:
      return state;
  }
};

export default attendanceReducer;
