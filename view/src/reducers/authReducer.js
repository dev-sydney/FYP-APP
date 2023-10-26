import * as Types from '../utils/types';

const authReducer = (state, action) => {
  switch (action.type) {
    case Types.SET_NAVBAR_VISIBIITY:
      return {
        ...state,
        navBarVisibiltyStatus: action.payload,
      };
    case Types.SET_AUTH_ALERT:
      return {
        ...state,
        authAlertMessage: action.payload,
      };
    case Types.CLEAR_AUTH_ALERT:
      return {
        ...state,
        authAlertMessage: null,
        isLoading: null,
      };
    case Types.IS_AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case Types.SET_USER_SETTINGS_LOADING:
      return {
        ...state,
        isUpdatesLoading: true,
      };
    case Types.SIGN_UP:
      localStorage.removeItem('F_Y_P_USER');
      localStorage.setItem('F_Y_P_USER', JSON.stringify(action.payload));
      return {
        ...state,
        isLoggedIn: true,
        isLoading: null,
        user: action.payload,
        // authAlertMessage: 'Sign up successful!',
      };
    case Types.SIGN_UP_ERROR:
      localStorage.removeItem('F_Y_P_USER');
      return {
        ...state,
        isLoggedIn: false,
        authAlertMessage: action.payload,
        isLoading: null,
      };

    case Types.SIGN_IN:
      localStorage.removeItem('F_Y_P_USER');
      localStorage.setItem('F_Y_P_USER', JSON.stringify(action.payload));
      return {
        ...state,
        isLoggedIn: true,
        isLoading: null,
        user: action.payload,
      };
    case Types.SIGN_IN_ERROR:
      localStorage.removeItem('F_Y_P_USER');
      return {
        ...state,
        authAlertMessage: action.payload,
        isLoading: null,
        isLoggedIn: false,
      };

    case Types.LOAD_SECURITY_QUESTIONS:
      return {
        ...state,
        securityQuestions: action.payload,
        isLoading: null,
      };
    case Types.SET_USER_SECURITY_ANSWERS:
      localStorage.removeItem('F_Y_P_USER');
      localStorage.setItem('F_Y_P_USER', JSON.stringify(action.payload));
      return {
        ...state,
        isLoading: null,
        user: action.payload,
      };

    case Types.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        authAlertMessage: action.payload,
        isLoading: null,
      };
    case Types.UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        authAlertMessage: action.payload,
        isLoading: null,
      };

    case Types.UPDATE_ACCOUNT_SUCCESS:
      localStorage.setItem('F_Y_P_USER', JSON.stringify(action.payload));
      return {
        ...state,
        isUpdatesLoading: null,
      };
    case Types.UPDATE_ACCOUNT_ERROR:
      return {
        ...state,
        authAlertMessage: action.payload,
        isUpdatesLoading: null,
      };

    case Types.SIGN_OUT:
      localStorage.removeItem('F_Y_P_USER');
      return {
        ...state,
      };
    case Types.SIGN_OUT_ERROR:
      return {
        ...state,
        authAlertMessage: action.payload,
      };
    case Types.SET_USERS_QA_ERROR:
      return {
        ...state,
        authAlertMessage: action.payload,
      };
    case Types.FORGOT_PASSWORD:
      return {
        ...state,
        authAlertMessage: action.payload,
        isLoading: null,
      };
    case Types.FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        authAlertMessage: action.payload,
        isLoading: null,
      };
    case Types.RESET_PASSWORD:
      return {
        ...state,
        authAlertMessage: action.payload,
        isLoading: null,
      };
    case Types.RESET_PASSWORD_ERROR:
      return {
        ...state,
        authAlertMessage: action.payload,
        isLoading: null,
      };
    default:
      return state;
  }
};

export default authReducer;
