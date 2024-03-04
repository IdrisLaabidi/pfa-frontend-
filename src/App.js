import { BrowserRouter , Routes, Route } from "react-router-dom"; 
import HomePage from "./pages/dashboard/dashboardPage";
import LoginPage from "./pages/login/loginPage";
import Chat from "./pages/Chat/Chat";
import "./Themes/Themes";
import './App.css'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />}/>
          <Route path="/Chat" element={<Chat />}/>
          <Route path="/Home" element={ <HomePage/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
