import React from "react";
import "./Race.css";
import { Routes, Route, Link } from "react-router-dom";

export default function Class() {
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
            </div>
            <div>Point Buy <input id='pointbuyvalue' type='number'></input></div>
            <div>
              Strength
              <input className='abilityscore' type='number' value='8'></input>
              <button className='upbutton'>^</button><button className='downbutton'>v</button>
            </div>
            <div>
              Dexterity
              <input className='abilityscore' type='number' value='8'></input>
              <button className='upbutton'>^</button><button className='downbutton'>v</button>
            </div>
            <div>
              Constitution
              <input className='abilityscore' type='number' value='8'></input>
              <button className='upbutton'>^</button><button className='downbutton'>v</button>
            </div>
            <div>
              Intelligence
              <input className='abilityscore' type='number' value='8'></input>
              <button className='upbutton'>^</button><button className='downbutton'>v</button>
            </div>
            <div>
              Wisdom
              <input className='abilityscore' type='number' value='8'></input>
              <button className='upbutton'>^</button><button className='downbutton'>v</button>
            </div>
            <div>
              Charisma
              <input className='abilityscore' type='number' value='8'></input>
              <button className='upbutton'>^</button><button className='downbutton'>v</button>
            </div>
            <Link to="/"><button>Home Menu</button></Link>
            <button>Next: Class</button>
        </main>
      </>
    );
  }