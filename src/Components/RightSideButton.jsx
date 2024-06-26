import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './RightSideButton.css'; // Import CSS file for styling (optional)

const RightSideButton = () => {
    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        navigate(path); // Use navigate to change the route
    };

    return (
        <div className="right-side-buttons">
            <button className="rounded-button" onClick={() => handleButtonClick('/total-package-cost')}>
                Total Package costs @ Year 1
            </button>
            <button className="rounded-button" onClick={() => handleButtonClick('/cumulative-comparison')}>
                Cumulative Comparison of Costs
            </button>
        </div>
    );
};

export default RightSideButton;

