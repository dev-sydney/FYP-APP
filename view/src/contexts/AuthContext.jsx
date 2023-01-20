import { createContext, useReducer } from 'react';
import authReducer from '../reducers/authReducer';
import * as Types from '../utils/types';
import { AppAlert } from '../utils/config';

const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const intialState = {
    user: JSON.parse(localStorage.getItem('user')),
    isLoggedIn: false,
    authAlertMessage: null,
    loggedInUser: null,
    securityQuestions: null,
    isLoading: null,
    isUpdatesLoading: null,
    navBarVisibiltyStatus: true,
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

  const setNavBarVisibilty = (NavBarHiddenValue) => {
    dispatch({
      type: Types.SET_NAVBAR_VISIBIITY,
      payload: NavBarHiddenValue,
    });
  };

  /**
   * Function responsible for logging in the user
   * @param {Object} formData The Form Data object containing the users credentials
   * @param {Object} naviagteTo
   */
  const loginUser = async (formData, navigateTo) => {
    try {
      dispatch({
        type: Types.IS_AUTH_LOADING,
      });

      const res = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      //EDGE-CASE: IF THERE WAS WERE INCORRECT CREDENTIALS
      if (res.status >= 400) throw new Error(result.message);

      //TODO: GET THE USERS DATA FROM THE RESPONSE & DISPATCH TO THE REDUCER
      if (res.status === 200) {
        // const results = await res.json();
        dispatch({
          type: Types.SET_AUTH_ALERT,
          payload: new AppAlert('logged in successfully', 'success'),
        });
        clearContextAlerts(1500);
        state.user = result.data.user;
        dispatch({
          type: Types.SIGN_IN,
          payload: result.data.user,
        });
        //TODO: REDIRECT USER TO THE HOMEPAGE
        setTimeout(() => {
          if (result.data.user.hasSecurityQuestionsSet === 0) {
            navigateTo('/user-securityQnAs');
          } else {
            navigateTo('/');
          }
        }, 2000);
      }
    } catch (err) {
      dispatch({
        action: Types.SIGN_IN_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
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
          payload: new AppAlert('Sign up was successful', 'success'),
        });
        clearContextAlerts(400);
        //TODO: Navigate the user to the page that collects their security Q&A's
        setTimeout(() => {
          navigateTo('/user-securityQnAs');
        }, 700);
      }
    } catch (err) {
      dispatch({
        type: Types.SIGN_UP_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };
  /**
   * This function makes a call to the API to fetch the series of random security questions
   */
  const loadSecurityQuestions = async () => {
    try {
      dispatch({
        type: Types.IS_AUTH_LOADING,
      });
      const res = await fetch(`/api/v1/users/security-questions`);
      const results = await res.json();
      if (res.status >= 400) throw new Error(results.message);

      if (res.status === 200) {
        dispatch({
          type: Types.LOAD_SECURITY_QUESTIONS,
          payload: results.securityQuestions,
        });
      }
    } catch (err) {
      // console.log(err);
      dispatch({
        type: Types.SET_AUTH_ALERT,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };
  /**
   * This function makes a call to the API to set the users personal security questions & answers
   * @param {*} formData an object of the users questions as keys & the corresponding answers as values
   * @param {*} navigateTo
   */
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
      dispatch({
        type: Types.IS_AUTH_LOADING,
      });
      const res = await fetch(`/api/v1/users/update-password`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      //EDGE-CASE:THERE WAS AN ISSUE WHEN TRYING TO UPDATE THE PASSWORD
      if (res.status >= 400) throw new Error(result.message);

      if (res.status === 200) {
        dispatch({
          type: Types.UPDATE_PASSWORD_SUCCESS,
          payload: new AppAlert(result.message, 'success'),
        });
        clearContextAlerts();
      }
    } catch (err) {
      // console.log(err);
      dispatch({
        type: Types.UPDATE_PASSWORD_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
    }
  };
  const updateUserAccountInfo = async (formData) => {
    try {
      dispatch({
        type: Types.SET_USER_SETTINGS_LOADING,
      });

      const res = await fetch(`/api/v1/users/update-me`, {
        method: 'PATCH',
        body: formData,
      });

      const result = await res.json();
      if (res.status >= 400) throw new Error('Something went very wrong');

      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.user));
        state.user = result.user;

        dispatch({
          type: Types.UPDATE_ACCOUNT_SUCCESS,
          payload: result.user,
        });
        dispatch({
          type: Types.SET_AUTH_ALERT,
          payload: new AppAlert(result.message, 'success'),
        });
        clearContextAlerts();
      }
    } catch (err) {
      dispatch({
        type: Types.UPDATE_ACCOUNT_ERROR,
        payload: new AppAlert(err.message, 'error'),
      });
      clearContextAlerts();
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
        payload: new AppAlert(
          'Trouble signing out right now, please try again.',
          'error'
        ),
      });
      clearContextAlerts();
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
        isUpdatesLoading: state.isUpdatesLoading,
        navBarVisibiltyStatus: state.navBarVisibiltyStatus,
        loginUser,
        signupUser,
        loadSecurityQuestions,
        answerSecurityQuestions,
        updateUserPassword,
        updateUserAccountInfo,
        signUserOut,
        setNavBarVisibilty,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export default authContext;
