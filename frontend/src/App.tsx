import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Home from "./pages/Home";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/Navbar";

function App() {
  const { auth, saveToken, logout } = useAuth();

  return (
    <BrowserRouter>
      <Navbar auth={auth} logout={logout} />
      <Routes>
        <Route
          path='/'
          element={<Home />} // Always render Home for the root path
        />
        <Route path='/login' element={<Login saveToken={saveToken} />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/dashboard'
          element={auth.token ? <Dashboard /> : <Navigate to='/login' />}
        />
        <Route
          path='/applications'
          element={auth.token ? <Applications /> : <Navigate to='/login' />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
