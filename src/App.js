import { BrowserRouter , Routes, Route , Navigate } from "react-router-dom"; // import react router dom
//import the theme variables 
import './Themes/Themes'
//import pages 
import HomePage from "./pages/dashboard/dashboardPage";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import Chat from "./pages/Chat/Chat";

function App() {
  const token = localStorage.getItem("token");
  if(token){
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage/>}/>
            <Route path="/home" element={<HomePage/>} />
            <Route path="/Chat" element={<Chat/>}/>
            <Route path="/Login" element={<HomePage/>}/>
            <Route path="/Register" element={<HomePage/>}/>
            <Route path="*" element={<div>Error 404 Page Not Found</div>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }else{
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
          <Route index element={<LoginPage/>}/>
            <Route path="/home" element={<LoginPage/>} />
            <Route path="/Chat" element={<LoginPage/>}/>
            <Route path="/Login" element={<LoginPage/>}/>
            <Route path="/Register" element={<RegisterPage/>}/>
            <Route path="*" element={<div>Error 404 Page Not Found</div>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
