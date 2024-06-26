import React from 'react';
import BasicPie from './PieChart';
import './TotalPackageCostPage.css'; 
import homeIcon from './home.png';
//import { Link } from 'react-router-dom';



const TotalPackageCostPage = () => {
    const navigateToHomePage = () => {
        // Navigate to the main page (home)
        window.location.href = '/';
    };

    return (
        <div className="total-package-cost-page">
            <h2 className="outlined-heading">Total Package Cost</h2>
            <div className="home-icon-container" onClick={navigateToHomePage}>
                <img src={homeIcon} alt="Home" className="home-icon" />
            </div>
            <BasicPie />
        </div>
    );
};

export default TotalPackageCostPage;