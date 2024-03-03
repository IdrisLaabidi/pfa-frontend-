import { BrowserRouter , Routes, Route } from "react-router-dom"; // import react router dom
//import pages 
import HomePage from "./pages/dashboard/dashboardPage";
import LoginPage from "./pages/login/loginPage";

import './Themes/Themes'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />}/>
          <Route path="/Home" element={ <HomePage/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
