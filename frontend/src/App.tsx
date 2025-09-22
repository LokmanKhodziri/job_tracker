import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
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
          element={
            auth.token ? <Navigate to='/dashboard' /> : <Navigate to='/login' />
          }
        />
        <Route path='/login' element={<Login saveToken={saveToken} />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/dashboard'
          element={auth.token ? <Dashboard auth={auth} /> : <Navigate to='/login' />}
        />
        <Route
          path='/applications'
          element={auth.token ? <Applications auth={auth} /> : <Navigate to='/login' />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
