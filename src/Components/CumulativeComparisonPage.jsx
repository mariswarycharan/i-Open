import React from 'react';
import SimpleBarChart from './BarChart';
import './TotalPackageCostPage.css'; 
import homeIcon from './home.png';




const CumulativeComparisonCostPage = () => {
    const navigateToHomePage = () => {
        // Navigate to the main page (home)
        window.location.href = '/';
    };

    return (
        <div className="cumulative-comparison-cost-page">
            <h2 className="outlined-heading">Cumulative Comparison Of Costs</h2>
            <div className="home-icon-container" onClick={navigateToHomePage}>
                <img src={homeIcon} alt="Home" className="home-icon" />
            </div>
            <SimpleBarChart />
        </div>
    );
};

export default CumulativeComparisonCostPage;