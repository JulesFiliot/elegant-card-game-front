import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu';
import Auth from './pages/Auth';
import MarketComponent from './components/market/components/MarketComponent';
import Navbar from './components/Navbar/Navbar';

export default function Main() {
  return (
    <div className="Main">
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route index element={<Menu />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/" element={<Menu />} />
            <Route
              path="/buy"
              element={(
                <MarketComponent mode="buy" />
              )}
            />
            <Route
              path="/sell"
              element={(
                <MarketComponent mode="sell" />
              )}
            />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>

      </BrowserRouter>

    </div>
  );
}
