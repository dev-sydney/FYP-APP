import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* ---------------CONTEXT-PROVIDERS------------------- */
import { AuthContextProvider } from './contexts/AuthContext';
import { AttendanceContextProvider } from './contexts/AttendanceContext';
import { QrCodeContextProvider } from './contexts/QRCodeContext';
import { ResourceContextProvider } from './contexts/ResourceContext';

/* ---------------COMPONENTS------------------- */
import RequireAuth from './components/RequireAuth';
import AlertComponent from './components/AlertComponent';
import NavBar from './components/NavBar';
import Testing from './pages/Testing';
import LoadingFallBack from './components/loadingComponents/LoadingFallBack';

/* ---------------LAZY LOADED PAGE COMPONENTS------------------- */
const LazyHomePage = React.lazy(() => import('./pages/HomePage'));
const LazyAccountOverviewPage = React.lazy(() =>
  import('./pages/AccountOverviewPage')
);
const LazySignupPage = React.lazy(() => import('./pages/SignupPage'));
const LazyLoginPage = React.lazy(() => import(`./pages/LoginPage`));
const LazyForgetPasswordPage = React.lazy(() =>
  import('./pages/ForgetPasswordPage')
);
const LazyResetPasswordPage = React.lazy(() =>
  import('./pages/ResetPasswordPage')
);
const LazyProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const LazyChangePasswordPage = React.lazy(() =>
  import('./pages/ChangePasswordPage')
);
const LazyCollectUserSecurityQnAPage = React.lazy(() =>
  import('./pages/CollectUserSecurityQnAPage')
);
const LazyAttendedLecturesPage = React.lazy(() =>
  import('./pages/AttendedLecturesPage')
);
const LazyCourseLectures = React.lazy(() => import('./pages/CourseLectures'));
const LazyOngoingAttendancePage = React.lazy(() =>
  import('./pages/OngoingAttendancePage')
);
const LazySignedAttendancesPage = React.lazy(() =>
  import('./pages/SignedAttendancesPage')
);
const LazyResourcePage = React.lazy(() => import('./pages/ResourcePage'));
const LazyProfessorResourcePage = React.lazy(() =>
  import('./pages/ProfessorResourcePage')
);
const LazyLectureHallResource = React.lazy(() =>
  import('./pages/LectureHallResource')
);
const LazyCoursesResourcePage = React.lazy(() =>
  import('./pages/CoursesResourcePage')
);
const LazyFacultyResourcePage = React.lazy(() =>
  import('./pages/FacultyResourcePage')
);
const LazyAttendanceScoresPage = React.lazy(() =>
  import('./pages/AttendanceScoresPage')
);
const LazyDepartmentCoursesPage = React.lazy(() =>
  import('./pages/DepartmentCoursesPage')
);
const LazyAssignedLecturersPage = React.lazy(() =>
  import('./pages/AssignedLecturersPage')
);
const LazyNotFound = React.lazy(() => import('./pages/NotFound'));

import './App.css';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <AttendanceContextProvider>
          <QrCodeContextProvider>
            <ResourceContextProvider>
              <AlertComponent />
              <div className="app_flex">
                <BrowserRouter>
                  <Routes>
                    <Route
                      path="/account/overview"
                      element={
                        <RequireAuth
                          children={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <LazyAccountOverviewPage />
                            </React.Suspense>
                          }
                        />
                      }
                    />
                    <Route
                      path="/account/change-password"
                      element={
                        <RequireAuth
                          children={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <LazyChangePasswordPage />
                            </React.Suspense>
                          }
                        />
                      }
                    />
                    <Route
                      path="/login"
                      element={
                        <React.Suspense fallback={<LoadingFallBack />}>
                          <LazyLoginPage />
                        </React.Suspense>
                      }
                    />
                    <Route
                      path="/signup"
                      element={
                        <React.Suspense fallback={<LoadingFallBack />}>
                          <LazySignupPage />
                        </React.Suspense>
                      }
                    />
                    <Route
                      path="/"
                      element={
                        <RequireAuth
                          children={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <LazyHomePage />
                            </React.Suspense>
                          }
                        />
                      }
                    />
                    <Route
                      path="/attendances/ongoingAttendances"
                      element={
                        <RequireAuth
                          children={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <LazyOngoingAttendancePage />
                            </React.Suspense>
                          }
                        />
                      }
                    />
                    <Route
                      path="/attendances/ongoingAttendances/:ongoingAttendanceId/:courseId"
                      element={
                        <RequireAuth
                          children={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <LazySignedAttendancesPage />
                            </React.Suspense>
                          }
                        />
                      }
                    />
                    <Route
                      path="/account/profile"
                      element={
                        <RequireAuth
                          children={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <LazyProfilePage />
                            </React.Suspense>
                          }
                        />
                      }
                    />
                    <Route
                      path="/resourceManager"
                      element={
                        <RequireAuth
                          children={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <LazyResourcePage />
                            </React.Suspense>
                          }
                        />
                      }
                    />
                    <Route
                      path="/resourceManager/professors"
                      element={
                        <RequireAuth
                          children={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <LazyProfessorResourcePage />
                            </React.Suspense>
                          }
                        />
                      }
                    />
                    <Route
                      path="/resourceManager/lecture-halls"
                      element={
                        <RequireAuth
                          children={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <LazyLectureHallResource />
                            </React.Suspense>
                          }
                        />
                      }
                    />
                    <Route
                      path="/resourceManager/courses"
                      element={
                        <RequireAuth
                          children={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <LazyCoursesResourcePage />
                            </React.Suspense>
                          }
                        />
                      }
                    />
                    <Route
                      path="/resourceManager/faculties"
                      element={
                        <RequireAuth
                          children={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <LazyFacultyResourcePage />
                            </React.Suspense>
                          }
                        />
                      }
                    />
                    <Route
                      path="/attendance-scores"
                      element={
                        <RequireAuth
                          children={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <LazyAttendanceScoresPage />
                            </React.Suspense>
                          }
                        />
                      }
                    />
                    <Route
                      path="/user-securityQnAs"
                      element={
                        <RequireAuth
                          children={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <LazyCollectUserSecurityQnAPage />
                            </React.Suspense>
                          }
                        />
                      }
                    />
                    <Route
                      path="/forgot-password"
                      element={
                        <React.Suspense fallback={<LoadingFallBack />}>
                          <LazyForgetPasswordPage />
                        </React.Suspense>
                      }
                    />
                    <Route
                      path="/reset-password/:token"
                      element={
                        <React.Suspense fallback={<LoadingFallBack />}>
                          <LazyResetPasswordPage />
                        </React.Suspense>
                      }
                    />
                    <Route
                      path="/attendedLectures"
                      element={
                        <RequireAuth
                          children={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <LazyAttendedLecturesPage />
                            </React.Suspense>
                          }
                        />
                      }
                    />
                    <Route
                      path="/attendedLectures/:courseId"
                      element={
                        <RequireAuth
                          children={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <LazyCourseLectures />
                            </React.Suspense>
                          }
                        />
                      }
                    />
                    <Route
                      path="/departmentCourses/"
                      element={
                        <RequireAuth
                          children={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <LazyDepartmentCoursesPage />
                            </React.Suspense>
                          }
                        />
                      }
                    />
                    <Route
                      path="/departmentCourses/:courseId"
                      element={
                        <RequireAuth
                          children={
                            <React.Suspense fallback={<LoadingFallBack />}>
                              <LazyAssignedLecturersPage />
                            </React.Suspense>
                          }
                        />
                      }
                    />
                    <Route path="/tests" element={<Testing />} />
                    <Route
                      path="*"
                      element={
                        <React.Suspense fallback={<LoadingFallBack />}>
                          <LazyNotFound />
                        </React.Suspense>
                      }
                    />
                  </Routes>
                  <NavBar />
                </BrowserRouter>
              </div>
            </ResourceContextProvider>
          </QrCodeContextProvider>
        </AttendanceContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
