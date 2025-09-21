import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { token, saveToken, logout } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            token ? <Navigate to='/dashboard' /> : <Navigate to='/login' />
          }
        />
        <Route path='/login' element={<Login saveToken={saveToken} />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/dashboard'
          element={
            token ? (
              <Dashboard token={token} logout={logout} />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/applications'
          element={
            token ? <Applications token={token} /> : <Navigate to='/login' />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
