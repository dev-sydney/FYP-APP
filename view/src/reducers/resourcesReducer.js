import * as Types from '../utils/types';

const resourceReducer = (state, action) => {
  switch (action.type) {
    case Types.SET_RESOURCE_LOADING:
      return {
        ...state,
        isResourceLoading: !state.isResourceLoading ? true : null,
      };
    case Types.ADD_PROFESSOR_SUCCESS:
      return {
        ...state,
        resourceContextAlert: action.payload,
      };
    case Types.LOAD_PROFESSORS:
      return {
        ...state,
        professors: action.payload,
        isResourceLoading: null,
      };
    case Types.LOAD_PROFESSORS_ERROR:
      return {
        ...state,
        professors: null,
        isResourceLoading: null,
        resourceContextAlert: action.payload,
      };
    case Types.ADD_COURSE_SUCCESS:
      return {
        ...state,
        resourceContextAlert: action.payload,
      };
    case Types.ADD_COURSE_ERROR:
      return {
        ...state,
        resourceContextAlert: action.payload,
      };
    case Types.ADD_LECTURE_ROOM_SUCCESS:
      return {
        ...state,
        lectureRoomQRcode: action.payload,
      };
    case Types.ADD_FACULTY_SUCCESS:
      return {
        ...state,
        resourceContextAlert: action.payload,
      };
    case Types.ADD_FACULTY_ERROR:
      return {
        ...state,
        resourceContextAlert: action.payload,
      };
    case Types.LOAD_FACULTIES_SUCCESS:
      return {
        ...state,
        faculties: action.payload,
      };
    case Types.LOAD_FACULTIES_ERROR:
      return {
        ...state,
        faculties: null,
        resourceContextAlert: action.payload,
      };
    case Types.LOAD_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload,
      };
    case Types.LOAD_COURSES_ERROR:
      return {
        ...state,
        courses: null,
        resourceContextAlert: action.payload,
      };
    default:
      return state;
  }
};
export default resourceReducer;
