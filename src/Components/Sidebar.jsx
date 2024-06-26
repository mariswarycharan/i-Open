import React, { useState } from 'react';
import logoImage from './i-open.jpeg';
import './Sidebar.css';

const Sidebar = ({ formData, setFormData }) => {

    const [DiseaseIndication, setDiseaseIndication] = useState('WET AMD'); // State for time horizon selection
    const handleDiseaseIndication = (event) => {
        setDiseaseIndication(event.target.value)
        setFormData(prev => ({
            ...prev,
            disease_indication: event.target.value
        }))
    };


    const [timeHorizon, setTimeHorizon] = useState('1'); // State for time horizon selection
    const handleTimeHorizonChange = (event) => {
        setTimeHorizon(event.target.value)
        setFormData(prev => ({
            ...prev,
            time_horizon: event.target.value
        }))
    };

    const [governmentAC, setGovernmentAC] = useState('Yes'); // State for government A/C selection
    const handleGovernmentACChange = (event) => {
        setGovernmentAC(event.target.value);
        setFormData(prev => ({
            ...prev,
            government_ac: event.target.value
        }))
    }

    const [naiveSwitch, setNaiveSwitch] = useState('Naive'); // State for naive/switch selection
    const handleNaiveSwitchChange = (event) => {
        setNaiveSwitch(event.target.value);
        setFormData(prev => ({
            ...prev,
            naive_switch: event.target.value
        }))
    }

    const [clinicalStatus, setClinicalStatus] = useState('Per Label'); // State for clinical status selection
    const handleClinicalStatusChange = (event) => {setClinicalStatus(event.target.value);
        setFormData(prev=>({
            ...prev,
            clinical_status: event.target.value
        }))
    }

    const initialTableData = [
        { drug: 'Drug 1', option: 'Yes', originalValue: 3, value: 3, chosenValue: 3 },
        { drug: 'Drug 2', option: 'Yes', originalValue: 6, value: 6, chosenValue: 6 },
        { drug: 'Drug 3', option: 'Yes', originalValue: 4, value: 4, chosenValue: 4 },
        { drug: 'Drug 4', option: 'Yes', originalValue: 12, value: 12, chosenValue: 12 },
        { drug: 'Drug 5', option: 'Yes', originalValue: 12, value: 12, chosenValue: 12 }
    ];

    const [tableData, setTableData] = useState(initialTableData);

    const handleOptionChange = (index, newValue) => {
        const newData = [...tableData];
        if (newValue === 'No') {
            newData[index].value = 0;
        } else if (newValue === 'Yes') {
            newData[index].value = newData[index].originalValue;
        }
        newData[index].option = newValue;
        setTableData(newData);
    };

    const handleDosageChange = (index, newValue) => {
        const newData = [...tableData];
        newData[index].value = Number(newValue);
        setTableData(newData);
        const drugs_selected = newData.filter(item => item.option === 'Yes').map(item => item.drug);
        console.log("drugs_selected", drugs_selected);
        setFormData(prev => ({
            ...prev,
            [`drug${index + 1
                }_dosage`]: Number(newValue),
            drugs_selected
        }))
    };


    const [ProcedureCost, setProcedureCost] = useState(1000);
    const handleProcedureCostChange = (event) => {setProcedureCost(event.target.value);
        const valueWithoutCurrency = event.target.value.replace('₹', '').trim();
        const numericValue = parseInt(valueWithoutCurrency, 10);
        setFormData(prev=>({
            ...prev,
            procedure_cost: numericValue
        }))
    }

    const [OCTCost, setOCTCost] = useState(200);
    const handleOCTCostChange = (event) => {setOCTCost(event.target.value);
        const valueWithoutCurrency = event.target.value.replace('₹', '').trim();
        const numericValue = parseInt(valueWithoutCurrency, 10);
        setFormData(prev=>({
            ...prev,
            oct_cost: numericValue
        }))
    }

    const [ConsultingCharges, setConsultingCharges] = useState(200);
    const handleConsultingChargesChange = (event) => {setConsultingCharges(event.target.value);
        const valueWithoutCurrency = event.target.value.replace('₹', '').trim();
        const numericValue = parseInt(valueWithoutCurrency, 10);
        setFormData(prev=>({
            ...prev,
            consulting_charges: numericValue
        }))
    }

    const [MiscellaneousCosts, setMiscellaneousCosts] = useState('₹ 0');
    const handleMiscellaneousCostsChange = (event) => {setMiscellaneousCosts(event.target.value);
        const valueWithoutCurrency = event.target.value.replace('₹', '').trim();
        const numericValue = parseInt(valueWithoutCurrency, 10);
        setFormData(prev=>({
            ...prev,
            miscellaneous_cost: numericValue
        }))
    }

    const [TravelCost, setTravelCost] = useState('₹ 0');
    const handleTravelCostChange = (event) => {setTravelCost(event.target.value);
        const valueWithoutCurrency = event.target.value.replace('₹', '').trim();
        const numericValue = parseInt(valueWithoutCurrency, 10);
        setFormData(prev=>({
            ...prev,
            travel_cost: numericValue
        }))
    }

    const [LostOpportunityCost, setLostOpportunityCost] = useState('₹ 0');
    const handleLostOpportunityCostChange = (event) => {setLostOpportunityCost(event.target.value);
        const valueWithoutCurrency = event.target.value.replace('₹', '').trim();
        const numericValue = parseInt(valueWithoutCurrency, 10);
        setFormData(prev=>({
            ...prev,
            patient_lost_opportunity_cost: numericValue
        }))
    }

    const [Caregiver, setCaregiver] = useState('₹ 0');
    const handleCaregiverChange = (event) => {setCaregiver(event.target.value);
        const valueWithoutCurrency = event.target.value.replace('₹', '').trim();
        const numericValue = parseInt(valueWithoutCurrency, 10);
        setFormData(prev=>({
            ...prev,
            caregiver_lost_opportunity_cost: numericValue
        }))
    }


    return (


        <div className="sidebar">
            <div>
                <img src={logoImage} alt="Logo" style={{ maxWidth: '30%' }} />
            </div>

            <div>
                <h2>Disease Indication:</h2>
                <select id="diseaseSelect" value={DiseaseIndication} onChange={handleDiseaseIndication}>
                    <option value="WET AMD">WET AMD</option>
                    <option value="DME">DME</option>
                    <option value="None">None</option>
                </select>
            </div>

            <div>
                <h2>Time Horizon(in years):</h2>
                <select id="timeHorizonSelect" value={timeHorizon} onChange={handleTimeHorizonChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="None">None</option>
                </select>
            </div>
            <div>
                <h2>Government A/C:</h2>
                <select id="governmentACSelect" value={governmentAC} onChange={handleGovernmentACChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="None">None</option>
                </select>
            </div>
            <div>
                <h2>Naive/Switch:</h2>
                <select id="naiveSwitchSelect" value={naiveSwitch} onChange={handleNaiveSwitchChange}>
                    <option value="Naive">Naive</option>
                    <option value="Switch">Switch</option>
                </select>
            </div>

            <div>
                <h2>Clinical Status:</h2>
                <select id="clinicalStatusSelect" value={clinicalStatus} onChange={handleClinicalStatusChange}>
                    <option value="Per Label">Per Label</option>
                    <option value="RWE">RWE</option>
                </select>
            </div>
            <div className="table-container">
                <table className="drug-table">
                    <thead>
                        <tr>
                            <th style={{ width: '100%' }}>Drug</th>
                            <th style={{ width: '100%' }}>Yes/No</th>
                            <th style={{ width: '100%' }}>Dosage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.drug}</td>
                                <td >
                                    <select style={{ width: '200%' }} 
                                        value={item.option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                    >
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                        <option value="None">None</option>
                                    </select>
                                </td>
                                <td>
                                    {clinicalStatus === 'RWE' ? (
                                        <select style={{ width: '200%' }} 
                                            value={item.value}
                                            onChange={(e) => handleDosageChange(index, e.target.value)}
                                        >
                                            {[...Array(15).keys()].map(n => (
                                                <option key={n + 1} value={n + 1}>{n + 1}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        item.value
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div>
                <h2>Procedure Cost:</h2>
                <select id="ProcedureCost" value={ProcedureCost} onChange={handleProcedureCostChange}>
                    <option value="₹ 0">₹ 0</option>
                    <option value="₹ 1000">₹ 1000</option>
                    <option value="₹ 2000">₹ 2000</option>
                    <option value="₹ 3000">₹ 3000</option>
                    <option value="₹ 4000">₹ 4000</option>
                    <option value="₹ 5000">₹ 5000</option>
                    <option value="₹ 6000">₹ 6000</option>
                    <option value="₹ 7000">₹ 7000</option>
                    <option value="₹ 8000">₹ 8000</option>
                    <option value="₹ 9000">₹ 9000</option>
                    <option value="₹ 10000">₹ 10000</option>
                    <option value="₹ 11000">₹ 11000</option>
                    <option value="₹ 12000">₹ 12000</option>
                    <option value="₹ 13000">₹ 13000</option>
                    <option value="₹ 14000">₹ 14000</option>
                    <option value="₹ 15000">₹ 15000</option>
                    <option value="₹ 16000">₹ 16000</option>
                    <option value="₹ 17000">₹ 17000</option>
                    <option value="₹ 18000">₹ 18000</option>
                    <option value="₹ 19000">₹ 19000</option>
                    <option value="₹ 20000">₹ 20000</option>
                </select>
            </div>
            <div>
                <h2>OCT Cost:</h2>
                <select id="OCTCostSelect" value={OCTCost} onChange={handleOCTCostChange}>
                    <option value="₹ 0">₹ 0</option>
                    <option value="₹ 200">₹ 200</option>
                    <option value="₹ 300">₹ 300</option>
                    <option value="₹ 500">₹ 500</option>
                    <option value="₹ 700">₹ 700</option>
                    <option value="₹ 1000">₹ 200</option>
                    <option value="₹ 1500">₹ 200</option>
                    <option value="₹ 2000">₹ 200</option>
                    <option value="₹ 2500">₹ 200</option>
                    <option value="₹ 3000">₹ 200</option>
                    <option value="₹ 3500">₹ 200</option>
                    <option value="₹ 4000">₹ 200</option>
                    <option value="₹ 4500">₹ 200</option>
                    <option value="₹ 5000">₹ 200</option>

                </select>
            </div>
            <div>
                <h2>Consulting Charges:</h2>
                <select id="ConsultingChargesSelect" value={ConsultingCharges} onChange={handleConsultingChargesChange}>
                    <option value="₹ 0">₹ 0</option>
                    <option value="₹ 200">₹ 200</option>
                    <option value="₹ 300">₹ 300</option>
                    <option value="₹ 500">₹ 500</option>
                    <option value="₹ 700">₹ 700</option>
                    <option value="₹ 1000">₹ 1000</option>
                    <option value="₹ 1500">₹ 1500</option>
                    <option value="₹ 2000">₹ 2000</option>
                    <option value="₹ 2500">₹ 2500</option>
                    <option value="₹ 3000">₹ 3000</option>
                    <option value="₹ 3500">₹ 3500</option>
                    <option value="₹ 4000">₹ 4000</option>
                    <option value="₹ 4500">₹ 4500</option>
                    <option value="₹ 5000">₹ 5000</option>
                </select>
            </div>
            <div>
                <h2>Miscellaneous Costs:</h2>
                <select id="MiscellaneousCostsSelect" value={MiscellaneousCosts} onChange={handleMiscellaneousCostsChange}>
                    <option value="₹ 0">₹ 0</option>
                    <option value="₹ 100">₹ 100</option>
                    <option value="₹ 200">₹ 200</option>
                    <option value="₹ 300">₹ 300</option>
                    <option value="₹ 400">₹ 400</option>
                    <option value="₹ 500">₹ 500</option>
                    <option value="₹ 600">₹ 600</option>
                    <option value="₹ 700">₹ 700</option>
                    <option value="₹ 800">₹ 800</option>
                    <option value="₹ 900">₹ 900</option>
                    <option value="₹ 1000">₹ 1000</option>
                    <option value="₹ 1200">₹ 1200</option>
                    <option value="₹ 1400">₹ 1400</option>
                    <option value="₹ 1500">₹ 1500</option>
                    <option value="₹ 2000">₹ 2000</option>
                    <option value="₹ 2500">₹ 2500</option>
                    <option value="₹ 3000">₹ 3000</option>
                    <option value="₹ 3500">₹ 3500</option>
                    <option value="₹ 4000">₹ 4000</option>
                    <option value="₹ 4500">₹ 4500</option>
                    <option value="₹ 5000">₹ 5000</option>
                </select>
            </div>
            <div>
                <h2>Travel Cost:</h2>
                <select id="TravelCostSelect" value={TravelCost} onChange={handleTravelCostChange}>
                    <option value="₹ 0">₹ 0</option>
                    <option value="₹ 100">₹ 100</option>
                    <option value="₹ 200">₹ 200</option>
                    <option value="₹ 300">₹ 300</option>
                    <option value="₹ 400">₹ 400</option>
                    <option value="₹ 500">₹ 500</option>
                    <option value="₹ 600">₹ 600</option>
                    <option value="₹ 700">₹ 700</option>
                    <option value="₹ 800">₹ 800</option>
                    <option value="₹ 900">₹ 900</option>
                    <option value="₹ 1000">₹ 1000</option>
                    <option value="₹ 1200">₹ 1200</option>
                    <option value="₹ 1400">₹ 1400</option>
                    <option value="₹ 1500">₹ 1500</option>
                    <option value="₹ 2000">₹ 2000</option>
                    <option value="₹ 2500">₹ 2500</option>
                    <option value="₹ 3000">₹ 3000</option>
                    <option value="₹ 3500">₹ 3500</option>
                    <option value="₹ 4000">₹ 4000</option>
                    <option value="₹ 4500">₹ 4500</option>
                    <option value="₹ 5000">₹ 5000</option>
                </select>
            </div>
            <div>
                <h2>Lost Opportunity Cost/Day(Patient):</h2>
                <select id="LostOpportunityCost" value={LostOpportunityCost} onChange={handleLostOpportunityCostChange}>
                    <option value="₹ 0">₹ 0</option>
                    <option value="₹ 1000">₹ 1000</option>
                    <option value="₹ 1500">₹ 1500</option>
                    <option value="₹ 2000">₹ 2000</option>
                    <option value="₹ 2500">₹ 2500</option>
                    <option value="₹ 3000">₹ 3000</option>
                    <option value="₹ 3500">₹ 3500</option>
                    <option value="₹ 4000">₹ 4000</option>
                    <option value="₹ 4500">₹ 1000</option>
                    <option value="₹ 5000">₹ 5000</option>
                    <option value="₹ 6000">₹ 6000</option>
                    <option value="₹ 7000">₹ 7000</option>
                    <option value="₹ 8000">₹ 8000</option>
                    <option value="₹ 9000">₹ 9000</option>
                    <option value="₹ 10000">₹ 10000</option>
                    <option value="₹ 11000">₹ 11000</option>
                    <option value="₹ 12000">₹ 12000</option>
                    <option value="₹ 13000">₹ 13000</option>
                    <option value="₹ 14000">₹ 14000</option>
                    <option value="₹ 15000">₹ 15000</option>
                    <option value="₹ 16000">₹ 16000</option>
                    <option value="₹ 17000">₹ 17000</option>
                    <option value="₹ 18000">₹ 18000</option>
                    <option value="₹ 19000">₹ 19000</option>
                    <option value="₹ 20000">₹ 20000</option>
                </select>
            </div>
            <div>
                <h2>Lost Opportunity Cost/Day(Caregiver):</h2>
                <select id="Caregiver" value={Caregiver} onChange={handleCaregiverChange}>
                    <option value="₹ 0">₹ 0</option>
                    <option value="₹ 1000">₹ 1000</option>
                    <option value="₹ 1500">₹ 1500</option>
                    <option value="₹ 2000">₹ 2000</option>
                    <option value="₹ 2500">₹ 2500</option>
                    <option value="₹ 3000">₹ 3000</option>
                    <option value="₹ 3500">₹ 3500</option>
                    <option value="₹ 4000">₹ 4000</option>
                    <option value="₹ 4500">₹ 1000</option>
                    <option value="₹ 5000">₹ 5000</option>
                    <option value="₹ 6000">₹ 6000</option>
                    <option value="₹ 7000">₹ 7000</option>
                    <option value="₹ 8000">₹ 8000</option>
                    <option value="₹ 9000">₹ 9000</option>
                    <option value="₹ 10000">₹ 10000</option>
                    <option value="₹ 11000">₹ 11000</option>
                    <option value="₹ 12000">₹ 12000</option>
                    <option value="₹ 13000">₹ 13000</option>
                    <option value="₹ 14000">₹ 14000</option>
                    <option value="₹ 15000">₹ 15000</option>
                    <option value="₹ 16000">₹ 16000</option>
                    <option value="₹ 17000">₹ 17000</option>
                    <option value="₹ 18000">₹ 18000</option>
                    <option value="₹ 19000">₹ 19000</option>
                    <option value="₹ 20000">₹ 20000</option>
                </select>
            </div>
        </div>

    );
};

export default Sidebar;

