import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Landing from './pages/Landing';
import Analytics from './pages/Analytics';
import Profiles from './pages/Profiles';
import ThemeToggle from './components/ThemeToggle.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profiles" element={<Profiles />} />
      </Routes>
      <ThemeToggle />
    </BrowserRouter>
  );
}