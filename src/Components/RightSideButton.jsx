import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RightSideButton.css';
import AppContext from './AppContext';

const RightSideButton = () => {
    const navigate = useNavigate();
    const { formData } = useContext(AppContext);
    const [totalPackageCost, setTotalPackageCost] = useState('');

    useEffect(() => {
        const calculateTotalPackageCost = () => {
            const timeHorizon = formData.time_horizon || 1; // Default to 1 if not set
            const totalCost = 1000 * timeHorizon; // Example calculation, replace with your actual logic
            setTotalPackageCost(totalCost);
        };

        calculateTotalPackageCost();
    }, [formData.time_horizon]);

    const handleButtonClick = (path) => {
        navigate(path);
    };

    return (
        <div className="right-side-buttons">
            <button className="rounded-button" onClick={() => handleButtonClick('/total-package-cost')}>
                Total Package Cost @ Year {formData.time_horizon}
                
            </button>
            <button className="rounded-button" onClick={() => handleButtonClick('/cumulative-comparison')}>
                Cumulative Comparison of Costs
            </button>
        </div>
    );
};

export default RightSideButton;


