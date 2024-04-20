import { BrowserRouter, Routes, Route} from "react-router-dom";
import './Themes/Themes'; // Import the theme variables
// Import pages
import ProjectPage from "./pages/dashboard/dashboardPage";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import Layout from "./components/layout/layout";
import LeavePage from "./components/LeaveForm/LeaveForm";
import Tasks from "./pages/tasksPage/Tasks";
import NewProjectPage from "./pages/newProject/newProjectPage";
import Profile from "./pages/profile/profilePage";
import Chat from "./pages/Chat/Chat";
import Error from "./pages/Error/errorPage";
import NotAuthorizedPage from './pages/notAuthorized/NotAuth'
import AdminDashboard from "./pages/adminDashbord/adminDashboard";
import AdminProfile from './pages/profileAdmin/profileAdmin'
import CreateUser from "./pages/createUserPage/createUser";
import Meet from "./pages/Meet/MeetPage";
import LeaveRequest from "./pages/LeaveRequest/leaveRequest";
import Setting from "./pages/settingsPage/setting";
import LandingPage from "./pages/landingPage/landingPage";
import MeetingEndedPage from "./pages/Meet/MeetingEndedPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/Register" element={<RegisterPage />}/>
          <Route path="/projects" element={ <Layout path={'/projects'} children={<ProjectPage/>} title={'projects'} /> } />
          <Route path="/newProject" element={<Layout path={'/newProject'} children={<NewProjectPage/>} />} />
          <Route path="/Tasks" element={ <Layout path={'/tasks'} children={<Tasks/>} title={'tasks'} /> } />
          <Route path="/chat" element={ <Layout path={'/chat'} children={<Chat/>} title={'Chat'} />}/>
          <Route path="/profile" element={<Layout path={'/profile'} children={<Profile/>}/>} />
          <Route path="/meet" element={<Layout path={'/meet'} children={<Meet/>}/>} />
          <Route path="/leave" element={ <Layout path={'/leave'} children={<LeavePage/>} title={'Leave'} />}/>
          <Route path="/admin/profile" element={ <Layout path={'/admin/profile'} children={<AdminProfile/>} title={'Profile'} />}/>
          <Route path="/admin/newUser" element={ <Layout path='/admin/newUser' title='New User'> <CreateUser /> </Layout>} />
          <Route path="/admin/members" element={ <Layout path={'/admin/members'} children={<AdminDashboard/>} title={'All users'} />}/>
          <Route path="/admin/leaveRequest" element={ <Layout path={'/admin/leaveRequest'} children={<LeaveRequest/>} title={'Leave Requests'} />}/>
          <Route path="/notAuthorized" element={<NotAuthorizedPage/>}/>
          <Route path="/setting" element={ <Layout path={'/setting'} children={<Setting/>} title={'Leave Requests'} />}/>
          <Route path="/MeetingEndedPage" element={<MeetingEndedPage/>} />
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;