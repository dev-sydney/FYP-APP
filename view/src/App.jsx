import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* ---------------CONTEXT-PROVIDERS------------------- */
import { AuthContextProvider } from './contexts/AuthContext';
import { AttendanceContextProvider } from './contexts/AttendanceContext';
import { QrCodeContextProvider } from './contexts/QRCodeContext';
import { ResourceContextProvider } from './contexts/ResourceContext';
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

import Empty from './pages/Empty';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <AttendanceContextProvider>
          <QrCodeContextProvider>
            <ResourceContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/attendances/ongoingAttendances"
                    element={<OngoingAttendancePage />}
                  />
                  <Route
                    path="/attendances/ongoingAttendances/:ongoingAttendanceId/:courseId"
                    element={<SignedAttendancesPage />}
                  />
                  <Route path="/me" element={<ProfilePage />} />
                  <Route path="/resourceManager" element={<ResourcePage />} />
                  <Route
                    path="/resourceManager/professors"
                    element={<ProfessorResourcePage />}
                  />
                  <Route
                    path="/resourceManager/lecture-halls"
                    element={<LectureHallResource />}
                  />
                  <Route
                    path="/resourceManager/courses"
                    element={<CoursesResourcePage />}
                  />
                  <Route
                    path="/resourceManager/faculties"
                    element={<FacultyResourcePage />}
                  />
                  <Route
                    path="/attendance-scores"
                    element={<AttendanceScoresPage />}
                  />
                  <Route path="/empty" element={<Empty />} />
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
