import { createContext, useReducer } from 'react';
import authReducer from '../reducers/authReducer';
import * as Types from '../utils/types';

const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const intialState = {
    user: JSON.parse(localStorage.getItem('user')),
    isLoggedIn: false,
    authAlertMessage: null,
    loggedInUser: null,
    securityQuestions: null,
    isLoading: null,
  };

  const [state, dispatch] = useReducer(authReducer, intialState);
  /**
   * This function starts a timeout function which dispatches the type to clear authAlertMessage in the context
   */
  const clearContextAlerts = (secs = 3000) => {
    setTimeout(() => {
      dispatch({
        type: Types.CLEAR_AUTH_ALERT,
      });
    }, secs);
  };

  /**
   * Function responsible for logging in the user
   * @param {Object} formData The Form Data object containing the users credentials
   * @param {Object} naviagteTo
   */
  const loginUser = async (formData, navigateTo) => {
    try {
      const res = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      //EDGE-CASE: IF THERE WAS WERE INCORRECT CREDENTIALS
      if (res.status === 404)
        throw new Error('Invalid email or password, please try again.');

      //TODO: GET THE USERS DATA FROM THE RESPONSE & DISPATCH TO THE REDUCER
      if (res.ok) {
        const results = await res.json();
        state.user = results.data.user;
        dispatch({
          type: Types.SIGN_IN,
          payload: results.data.user,
        });

        //TODO: REDIRECT USER TO THE HOMEPAGE
        setTimeout(() => {
          navigateTo('/');
        }, 500);
      }
    } catch (err) {
      dispatch({
        action: Types.SIGN_IN_ERROR,
        payload: err.message,
      });
    }
  };
  /**
   * Function responsible for signing up new users and loggin them in
   * @param {Object} formData The Form Data object containing the users credentials
   * @param {Object} naviagteTo
   */
  const signupUser = async (formData, navigateTo) => {
    try {
      dispatch({
        type: Types.IS_AUTH_LOADING,
      });
      //TODO: Convert the fields that are supossed to be numeric to numbers
      formData.indexNumber = +formData.indexNumber;
      formData.facultyId = +formData.facultyId;

      const res = await fetch('/api/v1/users/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      //EDGE-CASE: IF SOMETHING WENT WRONG
      if (res.status >= 400) {
        throw new Error(result.message);
      }
      if (res.status === 201) {
        dispatch({
          type: Types.SIGN_UP,
          payload: result.data.user,
        });
        dispatch({
          type: Types.SET_AUTH_ALERT,
          payload: {
            heading: 'Awesome',
            detail: 'Sign up was successful',
            type: 'success',
          },
        });
        clearContextAlerts(400);
        //TODO: Navigate the user to the page that collects their security Q&A's
        setTimeout(() => {
          navigateTo('/user-securityQnAs');
        }, 700);
      }
    } catch (err) {
      // console.log(err);
      dispatch({
        type: Types.SIGN_UP_ERROR,
        payload: {
          heading: 'Uh Oh',
          detail: err.message,
          type: 'error',
        },
      });
      clearContextAlerts();
    }
  };

  const loadSecurityQuestions = async () => {
    try {
      const res = await fetch(`/api/v1/users/security-questions`);
      const results = await res.json();

      if (res.ok) {
        dispatch({
          type: Types.LOAD_SECURITY_QUESTIONS,
          payload: results.securityQuestions,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const answerSecurityQuestions = async (formData, navigateTo) => {
    try {
      dispatch({ type: Types.IS_AUTH_LOADING });

      dispatch({
        type: Types.SET_AUTH_ALERT,
        payload: {
          heading: 'Hang In There',
          detail: "We're getting you all set up, this might take a while",
          type: 'success',
        },
      });
      clearContextAlerts();

      const res = await fetch(`/api/v1/users/security-questions`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 200) {
        const results = await res.json();
        delete results.user['userPassword'];

        dispatch({
          type: Types.SET_USER_SECURITY_ANSWERS,
          payload: results.user,
        });

        navigateTo('/');
      }
    } catch (err) {
      // console.log(err);
      //NOTE: SET THE authAlertMessage in the context
      dispatch({
        type: Types.SET_USERS_QA_ERROR,
        payload: {
          heading: 'Uh Oh',
          detail:
            'Trouble setting the your security questions, please try again',
          type: 'error',
        },
      });
      clearContextAlerts();
    }
  };

  /**
   * Function responsible for updating the users password
   * @param {Object} formData
   */
  const updateUserPassword = async (formData) => {
    try {
      const res = await fetch(`/api/v1/users/update-password`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      //EDGE-CASE:THERE WAS AN ISSUE WHEN TRYING TO UPDATE THE PASSWORD

      if (res.status === 400) throw new Error(result.message);
      if (res.ok) {
        dispatch({
          type: Types.UPDATE_PASSWORD_SUCCESS,
          payload: result.msg,
        });
      }
    } catch (err) {
      // console.log(err);
      dispatch({
        type: Types.UPDATE_PASSWORD_ERROR,
        payload: err.message,
      });
    }
  };
  const updateUserAccountInfo = async (formData) => {
    try {
      const res = await fetch(`/api/v1/users/update-me`, {
        method: 'PATCH',
        body: formData,
      });

      const result = await res.json();
      localStorage.setItem('user', JSON.stringify(result.user));
      state.user = result.user;
      dispatch({
        type: Types.UPDATE_ACCOUNT_SUCCESS,
        payload: result.msg,
      });
    } catch (err) {
      dispatch({
        type: Types.UPDATE_ACCOUNT_ERROR,
        payload: err.message,
      });
    }
  };

  const signUserOut = async (navigateTo) => {
    try {
      const res = await fetch(`/api/v1/users/signout`);
      if (res.status === 200) {
        dispatch({
          type: Types.SIGN_OUT,
        });

        setTimeout(() => {
          navigateTo('/login');
        }, 500);
        state.user = null;
      }
    } catch (err) {
      dispatch({
        type: Types.SIGN_OUT_ERROR,
        payload: 'Trouble signing out right now, please try again.',
      });
    }
  };
  return (
    <authContext.Provider
      value={{
        user: state.user,
        authAlertMessage: state.authAlertMessage,
        isLoggedIn: state.isLoggedIn,
        securityQuestions: state.securityQuestions,
        isLoading: state.isLoading,
        loginUser,
        signupUser,
        loadSecurityQuestions,
        answerSecurityQuestions,
        updateUserPassword,
        updateUserAccountInfo,
        signUserOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export default authContext;
