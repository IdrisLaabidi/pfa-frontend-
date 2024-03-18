import { BrowserRouter , Routes, Route, json } from "react-router-dom"; // import react router dom
//import the theme variables 
import './Themes/Themes'
//import pages 
import HomePage from "./pages/dashboard/dashboardPage";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import Test from "./test";
import Layout from "./components/layout/layout";
import Cookies from "js-cookie";
import LeavePage from "./pages/leave/LeavePage";



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/Register" element={<RegisterPage />}/>
          <Route index  element={ <Layout path={'/projects'} children={<HomePage/>} title={'Projects'} /> } />
          <Route path="/Tasks" element={ <Layout path={'/tasks'} children={<HomePage token={Cookies.get('token')}/>} title={'Tasks'} /> } />
          <Route path="/chat" element={ <Layout path={'/chat'} children={<Test/>} title={'Chat'} />}/>
          <Route path="/leave" element={ <Layout path={'/leave'} children={<LeavePage/>} title={'Leave'} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;