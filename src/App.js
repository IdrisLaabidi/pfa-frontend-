import { BrowserRouter , Routes, Route, json } from "react-router-dom"; // import react router dom
//import the theme variables 
import './Themes/Themes'
//import pages 
import ProjectPage from "./pages/dashboard/dashboardPage";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import Test from "./test";
import Layout from "./components/layout/layout";
import Tasks from "./pages/tasksPage/Tasks";
import NewProjectPage from "./pages/newProject/newProjectPage";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/Register" element={<RegisterPage />}/>
          <Route index element={ <Layout path={'/project'} children={<ProjectPage/>} title={'projects'} /> } />
          <Route path="/newProject" element={<Layout path={'/newProject'} children={<NewProjectPage/>} />} />
          <Route path="/Tasks" element={ <Layout path={'/tasks'} children={<Tasks/>} title={'tasks'} /> } />
          <Route path="/chat" element={ <Layout path={'/chat'} children={<Test/>} title={'Chat'} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;