import './App.css';
import { Routes, Route, Link } from "react-router-dom";



function Home() {
  return (
    <>
      <main>
        <ul>
          <Link to="/race"><li>Race and Ability Scores</li></Link>
          <li>Class</li>
          <li>Spell Selection</li>
          <li>Background</li>
          <li>ASIs/Feats</li>
          <li>Character Sheet</li>
        </ul>
        <div><button>Save</button><button>Load</button></div>
        <div>Variants
          <ul>
            <li><input type='checkbox'></input>Rolled HP (default 1/2 HD rounded up)</li>
            <li><input type='checkbox'></input>Feats (default is using ASIs only)</li>
            <li><input type='checkbox'></input>Lineage Stats (default is normal Racial stat boosts)</li>
            <li><input type='checkbox'></input>Rolled Stats (default is Point Buy)</li>
          </ul>
        </div>
      </main>
    </>
  );
}

function Race() {
  return (
    <>
      <main>
          <select>
            <option value="Human">Human</option>
            <option value="Elf">Elf</option>
            <option value="Dwarf">Dwarf</option>
            <option value="Gnome">Gnome</option>
          </select>
          <div>
            <input type='checkbox'></input>Lineage Stats (default is normal Racial stat boosts)
            <input type='checkbox'></input>Rolled Stats (default is Point Buy)
          </div>
          <div>Point Buy <input id='pointbuyvalue' type='number'></input></div>
          <div>
            Strength
            <input className='abilityscore' type='number'></input>
            <button className='upbutton'>^</button><button className='downbutton'>v</button>
          </div>
          <div>
            Dexterity
            <input className='abilityscore' type='number'></input>
            <button className='upbutton'>^</button><button className='downbutton'>v</button>
          </div>
          <div>
            Constitution
            <input className='abilityscore' type='number'></input>
            <button className='upbutton'>^</button><button className='downbutton'>v</button>
          </div>
          <div>
            Intelligence
            <input className='abilityscore' type='number'></input>
            <button className='upbutton'>^</button><button className='downbutton'>v</button>
          </div>
          <div>
            Wisdom
            <input className='abilityscore' type='number'></input>
            <button className='upbutton'>^</button><button className='downbutton'>v</button>
          </div>
          <div>
            Charisma
            <input className='abilityscore' type='number'></input>
            <button className='upbutton'>^</button><button className='downbutton'>v</button>
          </div>
          <Link to="/"><button>Home Menu</button></Link>
          <button>Next: Class</button>
      </main>
    </>
  );
}


function App() {
  return (
    <div className="App">
      <h1>D&D 5E Character Builder</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="race" element={<Race />} />
      </Routes>
    </div>
  );
}
export default App;
