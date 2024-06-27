import React , { useContext } from 'react';
import SimpleBarChart from './BarChart';
import './TotalPackageCostPage.css'; 
import homeIcon from './home.png';
import AppContext from './AppContext';
import { useNavigate } from 'react-router-dom';
const CumulativeComparisonCostPage = ( ) => {

    const { responseData, setResponseData } = useContext(AppContext);
    const navigation = useNavigate();

    const navigateToHomePage = () => {
        // Navigate to the main page (home)
        // window.location.href = '/';
        navigation('/');
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