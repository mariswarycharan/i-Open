import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import CumulativeComparisonPage from './Components/CumulativeComparisonPage';
import TotalPackageCostPage from './Components/TotalPackageCostPage';
import reportWebVitals from './reportWebVitals';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main landing page */}
        <Route path="/" element={<App />} />
        {/* Routes for other pages */}
        <Route path="/cumulative-comparison" element={<CumulativeComparisonPage />} />
        <Route path="/total-package-cost" element={<TotalPackageCostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

reportWebVitals(console.log);


