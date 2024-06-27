import React, { useContext } from 'react';
import BasicPie from './PieChart';
import './TotalPackageCostPage.css'; 
import homeIcon from './home.png';
import { useNavigate } from 'react-router-dom';
import AppContext from './AppContext';
//import { Link } from 'react-router-dom';



const TotalPackageCostPage = ( ) => {
    const { responseData, setResponseData } = useContext(AppContext);
    const navigation = useNavigate();
    
    const navigateToHomePage = () => {
        // Navigate to the main page (home)
        navigation('/');
    };

    return (
        <div className="total-package-cost-page">
            <h2 className="outlined-heading">Total Package Cost</h2>
            <div className="home-icon-container" onClick={navigateToHomePage}>
                <img src={homeIcon} alt="Home" className="home-icon" />
            </div>
            <BasicPie responseData={responseData} setResponseData={setResponseData} />
        </div>
    );
};

export default TotalPackageCostPage;