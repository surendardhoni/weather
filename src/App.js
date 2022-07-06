import React from 'react'
import City from '../src/Search/City'
import Latitude from '../src/Search/Latitude'
import Tabs from '../src/Search/Tabs'
import { BrowserRouter, Route, Routes } from "react-router-dom";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tabs />}></Route>
          <Route path="/City" element={<City />}></Route>
          <Route path="/Latitude" element={<Latitude />}></Route>    
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

