import * as Types from '../utils/types';

const authReducer = (state, action) => {
  switch (action.type) {
    case Types.SIGN_IN:
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        isLoggedIn: true,
      };
    case Types.SIGN_IN_ERROR:
      localStorage.removeItem('user');
      return {
        ...state,
        isLoggedIn: true,
        authAlertMessage: action.payload,
      };
    case Types.LOAD_SECURITY_QUESTIONS:
      return {
        ...state,
        securityQuestions: action.payload,
      };
    case Types.SET_USER_SECURITY_ANSWERS:
      // localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
      };

    case Types.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        authAlertMessage: action.payload,
      };
    case Types.UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        authAlertMessage: action.payload,
      };
    case Types.UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        authAlertMessage: action.payload,
      };
    case Types.UPDATE_ACCOUNT_ERROR:
      return {
        ...state,
        authAlertMessage: action.payload,
      };
    case Types.SIGN_OUT:
      localStorage.removeItem('user');
      return {
        ...state,
      };
    case Types.SIGN_OUT_ERROR:
      return {
        ...state,
        authAlertMessage: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
