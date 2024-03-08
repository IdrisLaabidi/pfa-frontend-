import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';
// Import components and pages
import Layout from "./components/layout/layout";
import HomePage from "./pages/dashboard/dashboardPage";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
// Import styles
import './Themes/Themes';

function App() {
  const token = Cookies.get("token");
  // Wrap the page content with the Layout component (7atytha just for readability 5ater 7asytha masta fl element hhh)
  const renderLayout = (PageComponent, props) => (
    <Layout>
      <PageComponent {...props} />
    </Layout>
  );

  return (
    <div className='App'>
      <BrowserRouter>
          {token ? (
            // If the user is authenticated
            <Routes>
              <Route path="/" element={renderLayout(HomePage)} />
              <Route path="/home" element={renderLayout(HomePage)} />
              <Route path="/login" element={renderLayout(HomePage)} />
              <Route path="*" element={<div>Error page</div>} />
              </Routes>
          ) : (
            // If the user is not authenticated
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<div>Error page</div>} />
            </Routes>
          )}
      </BrowserRouter>
    </div>
  );
}

export default App;