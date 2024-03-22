import { BrowserRouter , Routes, Route } from "react-router-dom"; // import react router dom
//import the theme variables 
import './Themes/Themes'
//import pages 
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

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/Register" element={<RegisterPage />}/>
          <Route index element={ <Layout path={'/'} children={<ProjectPage/>} title={'projects'} /> } />
          <Route path="/newProject" element={<Layout path={'/newProject'} children={<NewProjectPage/>} />} />
          <Route path="/Tasks" element={ <Layout path={'/tasks'} children={<Tasks/>} title={'tasks'} /> } />
          <Route path="/chat" element={ <Layout path={'/chat'} children={<Chat/>} title={'Chat'} />}/>
          <Route path="/profile" element={<Layout path={'/profile'} children={<Profile/>}   />} />
          <Route path="/leave" element={ <Layout path={'/leave'} children={<LeavePage/>} title={'Leave'} />}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;