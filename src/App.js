import React from 'react';
import BarChart from './components/BarChart';
import ServerResponse from "./components/ServerResponse";
import './App.css';


export default function App() {
  return (
    <div className="App">
      <BarChart />
      <ServerResponse url="http://localhost:8080/" />
    </div>
  );
};
