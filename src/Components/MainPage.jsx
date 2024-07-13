// MainPage.jsx
import React, { useState , useEffect, useContext} from 'react';
import axios from 'axios';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';
import Sidebar from './Sidebar'; // Import the Sidebar component
import Box from '@mui/material/Box';
import './MainPage.css'; // Import CSS for styling
import SimpleBarChart from './SimpleBarChart'; // Import the SimpleBarChart component
import TotalPackageCostPage from './TotalPackageCostPage';
import BasicPie from './PieChart';
import StackedBarChartsWithTables from './BarChart';
import AppContext from './AppContext';

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    '& .MuiFormControlLabel-label': {
        fontWeight: 'bold',
    },
}));

const MainPage = () => {
    const { formData, setFormData, responseData, setResponseData } = useContext(AppContext);
    // const [selectedOption, setSelectedOption] = useState('Government Account');

    console.log("Main page response data", responseData);

    const handleChange = (event) => {
        {
            // setSelectedOption(event.target.value);
            setFormData(prev => ({
                ...prev,
                account_type: event.target.value
            }))
        }
    };

    // const [formData, setFormData] = useState({
    //     account_type: "Government Account",
    //     drugs_selected: ["Drug 1", "Drug 2", "Drug 3", "Drug 4", "Drug 5"],
    //     disease_indication: "WET AMD",
    //     time_horizon: "1",
    //     government_ac: "Yes",
    //     patient_support: "Yes",
    //     naive_switch: "Naive",
    //     clinical_status: "Per Label",
    //     drug1_dosage: 3,
    //     drug2_dosage: 3,
    //     drug3_dosage: 5,
    //     drug4_dosage: 8,
    //     drug5_dosage: 8,
    //     procedure_cost: 1000,
    //     oct_cost: 200,
    //     consulting_charges: 200,
    //     miscellaneous_cost: 100,
    //     travel_cost: 100,
    //     food_cost: 100,
    //     patient_lost_opportunity_cost: 1000,
    //     caregiver_lost_opportunity_cost: 1000,
    //     First_Drug: "Drug 1",
    //     Second_Drug: "Drug 2",
    //   });

    //   const [responseData, setResponseData] = useState(null);
    //   useEffect(() => {
    //     const fetchData = async () => {
    //       console.table("INPUT DATA", formData);
    //       try {
    //         const response = await axios.post('http://127.0.0.1:8000/submit', formData);
    //         setResponseData(response.data);

    //         console.log(response.data);
    //       } catch (error) {
    //         console.error('Error fetching data from API', error);
    //       }
    //     };

    //     fetchData();
    //   }, [formData]);

    return (
        <Box display="flex" className="main-page" style={{ height: '100vh' }}>
            {/* Sidebar Section */}
            <Box component="aside" className="sidebar-container">
                <Sidebar  />

            </Box>

            {/* Main Content Section */}
            <Box component="main" className="content-container">
                <RadioGroup value={formData.account_type} onChange={handleChange} row>
                    <StyledFormControlLabel
                        value="Government Account"
                        control={<Radio />}
                        label="Government Account"
                        sx={{ marginLeft: 2 }} 
                    />
                    <StyledFormControlLabel
                        value="Trade Account"
                        control={<Radio />}
                        label="Trade Account"
                        sx={{ marginLeft: 2 }} 
                    />
                </RadioGroup>

                {/* Include the SimpleBarChart component below the RadioGroup */}
                <SimpleBarChart  />
            </Box>
        </Box>
    );
};

export default MainPage;
