import { BrowserRouter , Routes, Route } from "react-router-dom"; // import react router dom
//import the theme variables 
import './Themes/Themes'
//import pages 
import HomePage from "./pages/dashboard/dashboardPage";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import Test from "./test";
import Layout from "./components/layout/layout";
import Chat from './pages/Chat/Chat'
import Cookies from "js-cookie";
import ErrorPage from './pages/Error/errorPage';
import ProfilePage from "./pages/profile/profilePage";



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Layout path={'/projects'} children={<HomePage/>} title={'home page'} /> } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/Home" element={ <Layout path={'/projects'} children={<HomePage/>} title={'home page'} /> } />
            <Route path="/chat" element={ <Layout path={'/chat'} children={<Chat/>} title={'test'} /> } />
            <Route path="/profile" element={ <Layout path={'/profile'} children={<ProfilePage/>} title={'profile'} /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;