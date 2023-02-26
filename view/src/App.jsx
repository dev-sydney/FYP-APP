import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* ---------------CONTEXT-PROVIDERS------------------- */
import { AuthContextProvider } from './contexts/AuthContext';
import { AttendanceContextProvider } from './contexts/AttendanceContext';
import { QrCodeContextProvider } from './contexts/QRCodeContext';
import { ResourceContextProvider } from './contexts/ResourceContext';

import RequireAuth from './components/RequireAuth';

/* ---------------PAGES------------------- */
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import OngoingAttendancePage from './pages/OngoingAttendancePage';
import SignedAttendancesPage from './pages/SignedAttendancesPage';
import ProfilePage from './pages/ProfilePage';
import ResourcePage from './pages/ResourcePage';
import AttendanceScoresPage from './pages/AttendanceScoresPage';
import SignupPage from './pages/SignupPage';
import ProfessorResourcePage from './pages/ProfessorResourcePage';
import LectureHallResource from './pages/LectureHallResource';
import CoursesResourcePage from './pages/CoursesResourcePage';
import FacultyResourcePage from './pages/FacultyResourcePage';
import CollectUserSecurityQnAPage from './pages/CollectUserSecurityQnAPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AttendedLecturesPage from './pages/AttendedLecturesPage';
import CourseLectures from './pages/CourseLectures';
import DepartmentCoursesPage from './pages/DepartmentCoursesPage';
import AssignedLecturersPage from './pages/AssignedLecturersPage';
import AccountOverviewPage from './pages/AccountOverviewPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import AlertComponent from './components/AlertComponent';
import NavBar from './components/NavBar';
import './App.css';
import NotFound from './pages/NotFound';
import Testing from './pages/Testing';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <AttendanceContextProvider>
          <QrCodeContextProvider>
            <ResourceContextProvider>
              <AlertComponent />
              <BrowserRouter>
                <Routes>
                  <Route
                    path="/account/overview"
                    element={<RequireAuth children={<AccountOverviewPage />} />}
                  />
                  <Route
                    path="/account/change-password"
                    element={<RequireAuth children={<ChangePasswordPage />} />}
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route
                    path="/"
                    element={<RequireAuth children={<HomePage />} />}
                  />
                  <Route
                    path="/attendances/ongoingAttendances"
                    element={
                      <RequireAuth children={<OngoingAttendancePage />} />
                    }
                  />
                  <Route
                    path="/attendances/ongoingAttendances/:ongoingAttendanceId/:courseId"
                    element={
                      <RequireAuth children={<SignedAttendancesPage />} />
                    }
                  />
                  <Route
                    path="/account/profile"
                    element={<RequireAuth children={<ProfilePage />} />}
                  />
                  <Route
                    path="/resourceManager"
                    element={<RequireAuth children={<ResourcePage />} />}
                  />
                  <Route
                    path="/resourceManager/professors"
                    element={
                      <RequireAuth children={<ProfessorResourcePage />} />
                    }
                  />
                  <Route
                    path="/resourceManager/lecture-halls"
                    element={<RequireAuth children={<LectureHallResource />} />}
                  />
                  <Route
                    path="/resourceManager/courses"
                    element={<RequireAuth children={<CoursesResourcePage />} />}
                  />
                  <Route
                    path="/resourceManager/faculties"
                    element={<RequireAuth children={<FacultyResourcePage />} />}
                  />
                  <Route
                    path="/attendance-scores"
                    element={
                      <RequireAuth children={<AttendanceScoresPage />} />
                    }
                  />
                  <Route
                    path="/user-securityQnAs"
                    element={
                      <RequireAuth children={<CollectUserSecurityQnAPage />} />
                    }
                  />
                  <Route
                    path="/forgot-password"
                    element={<ForgetPasswordPage />}
                  />
                  <Route
                    path="/reset-password/:token"
                    element={<ResetPasswordPage />}
                  />
                  <Route
                    path="/attendedLectures"
                    element={
                      <RequireAuth children={<AttendedLecturesPage />} />
                    }
                  />
                  <Route
                    path="/attendedLectures/:courseId"
                    element={<RequireAuth children={<CourseLectures />} />}
                  />
                  <Route
                    path="/departmentCourses/"
                    element={
                      <RequireAuth children={<DepartmentCoursesPage />} />
                    }
                  />
                  <Route
                    path="/departmentCourses/:courseId"
                    element={
                      <RequireAuth children={<AssignedLecturersPage />} />
                    }
                  />
                  <Route path="/tests" element={<Testing />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <NavBar />
              </BrowserRouter>
            </ResourceContextProvider>
          </QrCodeContextProvider>
        </AttendanceContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
