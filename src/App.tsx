import React from 'react';
import { Route, Routes } from 'react-router-dom';
import People from './components/Characters';
import Films from './components/Films';
import GalaxyMap from './components/Galaxy';
import Header from './components/Header';
import Species from './components/Species';
import Starships from './components/Starships';
import Vehicles from './components/Vehicles';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/'element= { <GalaxyMap /> } /> 
        <Route path='/starships'element= { <Starships /> } /> 
        <Route path='/people'element= { <People /> } /> 
        <Route path='/films'element= { <Films /> } /> 
        <Route path='/species'element= { <Species /> } /> 
        <Route path='/vehicles'element= { <Vehicles /> } /> 
      </Routes>
    </>
  );
}

export default App;
