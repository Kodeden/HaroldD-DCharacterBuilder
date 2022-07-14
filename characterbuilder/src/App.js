import './App.css';
import { useState, createContext, useContext } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Race from './components/Race.js';
import Login from './components/Login.js';

export const AuthContext = createContext();

function RequiredAuth({ children }) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  return auth.isAuthenticated === true ? children : <Navigate to="/" replace />;
}

function App() {
  const [auth, setAuth] = useState({ isAuthenticated: false });
  const navigate = useNavigate();

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <div className="App">
        <h1>D&D 5E Point Buy Calculator</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="race" element={
              <RequiredAuth>
                <Race />
              </RequiredAuth>
            } />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}
export default App;
