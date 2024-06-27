import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import CumulativeComparisonPage from './Components/CumulativeComparisonPage';
import TotalPackageCostPage from './Components/TotalPackageCostPage';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { useState , useEffect} from 'react';
import AppContext from './Components/AppContext';

function AppRouter() {

  const [formData, setFormData] = useState({
    account_type: "Government Account",
    drugs_selected: ["Drug 1", "Drug 2", "Drug 3", "Drug 4", "Drug 5"],
    disease_indication: "WET AMD",
    time_horizon: "1",
    government_ac: "Yes",
    patient_support: "Yes",
    naive_switch: "Naive",
    clinical_status: "Per Label",
    drug1_dosage: 3,
    drug2_dosage: 3,
    drug3_dosage: 5,
    drug4_dosage: 8,
    drug5_dosage: 8,
    procedure_cost: 1000,
    oct_cost: 200,
    consulting_charges: 200,
    miscellaneous_cost: 100,
    travel_cost: 100,
    food_cost: 100,
    patient_lost_opportunity_cost: 1000,
    caregiver_lost_opportunity_cost: 1000,
    First_Drug: "Drug 1",
    Second_Drug: "Drug 2",
  });

  const [responseData, setResponseData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      console.table("INPUT DATA", formData);
      try {
        const response = await axios.post('https://i-open-backend.onrender.com/submit', formData);
        setResponseData(response.data);

        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data from API', error);
      }
    };

    fetchData();
  }, [formData]);

  const contextValue = {
    formData,
    setFormData,
    responseData,
    setResponseData
  };

  return (
    <AppContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cumulative-comparison" element={<CumulativeComparisonPage />} />
          <Route path="/total-package-cost" element={<TotalPackageCostPage />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter  />
  </React.StrictMode>
);

reportWebVitals(console.log);
