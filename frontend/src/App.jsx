import React, { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    async function fetchData() {
      const { data } = axios.get("http://localhost:8000/");
      console.log(data);
    }
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
