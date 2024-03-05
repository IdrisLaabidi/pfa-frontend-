import { BrowserRouter , Routes, Route } from "react-router-dom"; // import react router dom
//import the theme variables 
import './Themes/Themes'
//import pages 
import HomePage from "./pages/dashboard/dashboardPage";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import Test from "./test";
 

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />}/>
          <Route path="/Register" element={<RegisterPage />}/>
          <Route path="/Home" element={ <HomePage/> } />
          <Route path="/test" element={ <Test/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
