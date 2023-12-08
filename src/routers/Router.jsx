import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import LayoutComponent from '../layout/LayoutComponent';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutComponent/>}>
          <Route path="/" element={<Home />} />
          {/* <Route path="about" element={<About />} /> */}
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="works" element={<Works />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
