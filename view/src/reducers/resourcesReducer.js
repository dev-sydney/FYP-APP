import * as Types from '../utils/types';

const resourceReducer = (state, action) => {
  switch (action.type) {
    case Types.CLEAR_RESOURCE_ALERT:
      return {
        ...state,
        resourceContextAlert: null,
      };
    case Types.SET_RESOURCE_LOADING:
      return {
        ...state,
        isResourceLoading: true,
      };
    case Types.ADD_PROFESSOR_SUCCESS:
      return {
        ...state,
        resourceContextAlert: action.payload,
        isResourceLoading: null,
      };
    case Types.ADD_PROFESSOR_ERROR:
      return {
        ...state,
        resourceContextAlert: action.payload,
        isResourceLoading: null,
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
        isResourceLoading: null,
      };
    case Types.ADD_COURSE_ERROR:
      return {
        ...state,
        resourceContextAlert: action.payload,
        isResourceLoading: null,
      };
    case Types.ADD_LECTURE_ROOM_SUCCESS:
      return {
        ...state,
        lectureRoomQRcode: action.payload,
        isResourceLoading: null,
      };
    case Types.ADD_FACULTY_SUCCESS:
      return {
        ...state,
        resourceContextAlert: action.payload,
        isResourceLoading: null,
      };
    case Types.ADD_FACULTY_ERROR:
      return {
        ...state,
        resourceContextAlert: action.payload,
        isResourceLoading: null,
      };
    case Types.LOAD_FACULTIES_SUCCESS:
      return {
        ...state,
        faculties: action.payload,
        isResourceLoading: null,
      };
    case Types.LOAD_FACULTIES_ERROR:
      return {
        ...state,
        faculties: null,
        // resourceContextAlert: action.payload,
        isResourceLoading: null,
      };
    case Types.LOAD_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        isResourceLoading: null,
      };
    case Types.LOAD_COURSES_ERROR:
      return {
        ...state,
        courses: null,
        resourceContextAlert: action.payload,
        isResourceLoading: null,
      };
    case Types.LOAD_LECTURE_HALL_QRCODES:
      return {
        ...state,
        LectureHallQRcodes: action.payload,
        isResourceLoading: null,
      };
    case Types.LOAD_LECTURE_HALL_QRCODES_ERROR:
      return {
        ...state,
        LectureHallQRcodes: null,
        isResourceLoading: null,
        resourceContextAlert: action.payload,
      };
    case Types.DELETE_PROFESSOR:
      return {
        ...state,
        resourceContextAlert: action.payload,
        professors: state.professors.filter(
          (el) => el.userId !== action.userId
        ),
      };
    case Types.DELETE_PROFESSOR_ERROR:
      return {
        ...state,
        resourceContextAlert: action.payload,
      };
    case Types.DELETE_LECTURE_HALL:
      return {
        ...state,
        resourceContextAlert: action.payload,
        LectureHallQRcodes: state.LectureHallQRcodes.filter(
          (el) => el.QRcodeId !== action.QRcodeId
        ),
      };
    case Types.DELETE_LECTURE_HALL_ERROR:
      return {
        ...state,
        resourceContextAlert: action.payload,
      };
    case Types.DELETE_FACULTY:
      return {
        ...state,
        resourceContextAlert: action.payload,
        faculties: state.faculties.filter(
          (el) => el.facultyId !== action.facultyId
        ),
      };
    case Types.DELETE_FACULTY_ERROR:
      return {
        ...state,
        resourceContextAlert: action.payload,
      };
    case Types.DELETE_COURSE:
      return {
        ...state,
        resourceContextAlert: action.payload,
        courses: state.courses.filter((el) => el.courseId !== action.courseId),
      };
    case Types.DELETE_COURSE_ERROR:
      return {
        ...state,
        resourceContextAlert: action.payload,
      };
    case Types.LOAD_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };
    case Types.LOAD_DEPARTMENT_COURSES:
      return {
        ...state,
        departmentCourses: action.payload,
        deptCoursesColors: action.colors,
        isResourceLoading: null,
      };
    case Types.LOAD_DEPARTMENT_COURSES_ERROR:
      return {
        ...state,
        departmentCourses: null,
        isResourceLoading: null,
        resourceContextAlert: action.payload,
      };
    case Types.LOAD_ASSIGNED_PROFESSORS:
      return {
        ...state,
        assignedProfessors: action.payload,
        isResourceLoading: null,
      };
    case Types.LOAD_ASSIGNED_PROFESSORS_ERROR:
      return {
        ...state,
        assignedProfessors: null,
        isResourceLoading: null,
        resourceContextAlert: action.payload,
      };
    case Types.DEALLOCATE_PROFESSOR:
      return {
        ...state,
        assignedProfessors: state.assignedProfessors.filter(
          (el) => el.assignmentId !== action.assignmentId
        ),
        resourceContextAlert: action.payload,
      };
    case Types.DEALLOCATE_PROFESSOR_ERROR:
      return {
        ...state,
        resourceContextAlert: action.payload,
      };
    case Types.LOAD_UNASSIGNED_PROFESSORS:
      return {
        ...state,
        unAssignedProfessors: action.payload,
        isResourceLoading: null,
      };
    case Types.LOAD_UNASSIGNED_PROFESSORS_ERROR:
      return {
        ...state,
        unAssignedProfessors: null,
        isResourceLoading: null,
        resourceContextAlert: action.payload,
      };
    case Types.ASSIGN_PROFESSOR:
      return {
        ...state,
        resourceContextAlert: action.payload,
      };
    case Types.ASSIGN_PROFESSOR_ERROR:
      return {
        ...state,
        resourceContextAlert: action.payload,
      };
    case Types.LOAD_USER_ASSIGNED_COURSES:
      return {
        ...state,
        userAssignedCourses: action.payload,
        isResourceLoading: null,
      };
    case Types.LOAD_USER_ASSIGNED_COURSES_ERROR:
      return {
        ...state,
        isResourceLoading: null,
        userAssignedCourses: null,
        resourceContextAlert: action.payload,
      };
    case Types.CLEAR_ASSIGNED_COURSES:
      return {
        ...state,
        userAssignedCourses: null,
        resourceContextAlert: null,
      };
    case Types.CLEAR_ALL_LECTURERS:
      return {
        ...state,
        unAssignedProfessors: null,
        assignedProfessors: null,
      };
    default:
      return state;
  }
};
export default resourceReducer;
