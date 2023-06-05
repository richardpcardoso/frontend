
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Open from "./pages/open/Open";
import Home from "./pages/home/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="open/:key" element={<Open />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
