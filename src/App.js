import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './Themes/Themes'; // Import the theme variables
// Import pages
import ProjectPage from "./pages/dashboard/dashboardPage";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import Layout from "./components/layout/layout";
import LeavePage from "./pages/leave/LeavePage";
import Tasks from "./pages/tasksPage/Tasks";
import NewProjectPage from "./pages/newProject/newProjectPage";
import Profile from "./pages/profile/profilePage";
import Chat from "./pages/Chat/Chat";
import Error from "./pages/Error/errorPage";
import MeetPage from "./pages/Meet/MeetPage";
import Cookies from "js-cookie";

// Create a wrapper component for routes that should be inaccessible with a valid token
function PrivateRoute({ children }) {
  const userToken = Cookies.get('token');
  return userToken ? <Navigate to="/" replace /> : children;
}
function ProtectedRoute({ children }) {
  const userToken = Cookies.get('token');
  // If there is no token, redirect to the login page
  return userToken ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/*Wrap Private routes with PrivateRoute component */}
          <Route path="/login" element={<PrivateRoute><LoginPage /></PrivateRoute>} />
          <Route path="/register" element={<PrivateRoute><RegisterPage /></PrivateRoute>} />
          {/* Wrap protected routes with ProtectedRoute component */}
          <Route
            index
            element={<ProtectedRoute><Layout path={'/'} children={<ProjectPage />} title={'projects'} /></ProtectedRoute>}
          />
          <Route
            path="/meet"
            element={<ProtectedRoute><Layout path={'/meet'} children={<MeetPage/>} title={'meet'} /></ProtectedRoute>}
          />
          <Route
            path="/newProject"
            element={<ProtectedRoute><Layout path={'/newProject'} children={<NewProjectPage />} /></ProtectedRoute>}
          />
          <Route
            path="/tasks"
            element={<ProtectedRoute><Layout path={'/tasks'} children={<Tasks />} title={'tasks'} /></ProtectedRoute>}
          />
          <Route
            path="/chat"
            element={<ProtectedRoute><Layout path={'/chat'} children={<Chat />} title={'Chat'} /></ProtectedRoute>}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute><Layout path={'/profile'} children={<Profile />} /></ProtectedRoute>}
          />
          <Route
            path="/leave"
            element={<ProtectedRoute><Layout path={'/leave'} children={<LeavePage />} title={'Leave'} /></ProtectedRoute>}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;