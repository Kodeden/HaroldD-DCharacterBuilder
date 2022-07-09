import './App.css';
import { useState, createContext, useContext } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Race from './components/Race.js';
import Class from './components/Class.js';
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
        <h1>D&D 5E Character Builder</h1>
        {auth.isAuthenticated ? (
          <nav>
            <Link to="/race"><div>Race and Ability Scores</div></Link>
            <Link to="/class"><div>Class</div></Link>
            <div>Spell Selection</div>
            <div>Background</div>
            <div>ASIs/Feats</div>
            <div>Character Sheet</div>
            <button>Save</button>
            <button>Load</button>
            <button onClick={() => {
                setAuth({ isAuthenticated: false });
                navigate("/");
              }}>Sign Out</button>
          </nav>
        ) : null}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="race" element={
              <RequiredAuth>
                <Race />
              </RequiredAuth>
            } />
          <Route path="class" element={
              <RequiredAuth>
                <Class />
              </RequiredAuth>
            } />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}
export default App;
