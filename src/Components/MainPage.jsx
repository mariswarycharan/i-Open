// MainPage.jsx
import React, { useState } from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';
import Sidebar from './Sidebar'; // Import the Sidebar component
import Box from '@mui/material/Box';
import './MainPage.css'; // Import CSS for styling
import SimpleBarChart from './SimpleBarChart'; // Import the SimpleBarChart component

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    '& .MuiFormControlLabel-label': {
        fontWeight: 'bold',
    },
}));

const MainPage = () => {
    const [selectedOption, setSelectedOption] = useState('government');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Box display="flex" className="main-page" style={{ height: '100vh' }}>
            {/* Sidebar Section */}
            <Box component="aside" className="sidebar-container">
                <Sidebar />
            </Box>
            
            {/* Main Content Section */}
            <Box component="main" className="content-container">
                <RadioGroup value={selectedOption} onChange={handleChange} row>
                    <StyledFormControlLabel
                        value="government"
                        control={<Radio />}
                        label="Government Account"
                    />
                    <StyledFormControlLabel
                        value="trade"
                        control={<Radio />}
                        label="Trade Account"
                    />
                </RadioGroup>
                
                {/* Include the SimpleBarChart component below the RadioGroup */}
                <SimpleBarChart />
            </Box>
        </Box>
    );
};

export default MainPage;
