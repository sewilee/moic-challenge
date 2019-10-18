import React from 'react';
import './App.css';
import ScoopFlavor from './components/ScoopFlavor';

function App() {
  return (
    <>
      <header className="header">
        <h1>GET THE SCOOP</h1>
        <div className="credit">
          <p>Created by Sewina Lee</p>
          <a href="https://www.sewinalee.com" target="_blank">Portfolio</a>
          <a href="https://github.com/sewilee/moic-challenge" target="_blank">Github</a>
        </div>
      </header>
      <ScoopFlavor />
    </>
  );
}

export default App;
