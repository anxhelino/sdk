import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Viewer from './pages/Viewer';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Viewer />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
