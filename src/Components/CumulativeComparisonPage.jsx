import React, { useContext } from 'react';
import SimpleBarChart from './BarChart';
import homeIcon from './back.jpg';
import AppContext from './AppContext';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import './CumulativeComparison.css';

const CumulativeComparisonCostPage = () => {
    const { responseData, setResponseData } = useContext(AppContext);
    const navigation = useNavigate();
    const theme = useTheme();

    const navigateToHomePage = () => {
        navigation('/');
    };

    return (
        <div className="cumulative-comparison-cost-page">
            <div className="page-container"> {/* Added container for page border */}
                <h2 className="outlined-heading">Cumulative Comparison Of Costs</h2>
                <div className="home-icon-container" onClick={navigateToHomePage}>
                    <img src={homeIcon} alt="Home" className="home-icon" />
                </div>
                <SimpleBarChart />

                {/* Footer */}
                <Box
                    sx={{
                        backgroundColor: '#151B54', // Set background color to #151B54
                        color: theme.palette.primary.contrastText, // Adjust text color as per your theme
                        padding: '10px',
                        textAlign: 'center',
                        marginTop: '30px',
                        borderRadius: '7px',
                        fontSize: '20px',
                    }}
                >
                    <Typography variant="body1">
                        VABYSMO<sup>®</sup> improves vision quickly with results maintained in the second year of treatment.
                    </Typography>
                </Box>
            </div>
        </div>
    );
};

export default CumulativeComparisonCostPage;

