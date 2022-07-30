import './App.css';
import { Routes, Route } from "react-router-dom";
import Stats from './components/Stats.js';


function App() {

  return (
    <div className="App">
      <h1>D&D 5E Ability Score Generator</h1>
      <Routes>
        <Route path="/" element={<Stats />} />
      </Routes>
    </div>
  );
}
export default App;
