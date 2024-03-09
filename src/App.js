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


function App() {
  const token = Cookies.get('token');
  return (
    <div className="App">
      <BrowserRouter>
        {token? (
          <Routes>
            <Route path="/" element={ <Layout path={'/projects'} children={<HomePage/>} title={'home page'} /> } />
            <Route path="/login" element={ <Layout path={'/home'} children={<HomePage/>} title={'home page'} /> } />
            <Route path="/regsiter" element={ <Layout path={'/home'} children={<HomePage/>} title={'home page'} /> } />
            <Route path="/Home" element={ <Layout path={'/projects'} children={<HomePage/>} title={'home page'} /> } />
            <Route path="/chat" element={ <Layout path={'/chat'} children={<Chat/>} title={'test'} /> } />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        ):(
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        )
        
        }
        
      </BrowserRouter>
    </div>
  );
}

export default App;