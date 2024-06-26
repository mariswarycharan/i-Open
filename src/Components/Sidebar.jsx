import React, { useState } from 'react';
import logoImage from './i-open.jpeg';
import './Sidebar.css';

const Sidebar = () => {
    
    
    const [timeHorizon, setTimeHorizon] = useState('None'); // State for time horizon selection
    const handleTimeHorizonChange = (event) => setTimeHorizon(event.target.value);

    const [governmentAC, setGovernmentAC] = useState('None'); // State for government A/C selection
    const handleGovernmentACChange = (event) => setGovernmentAC(event.target.value);

    const [naiveSwitch, setNaiveSwitch] = useState('Naive'); // State for naive/switch selection
    const handleNaiveSwitchChange = (event) => setNaiveSwitch(event.target.value);

    const [clinicalStatus, setClinicalStatus] = useState('Per Label'); // State for clinical status selection
    const handleClinicalStatusChange = (event) => setClinicalStatus(event.target.value);

    const initialTableData = [
        { drug: 'Drug1', option: 'Yes', originalValue: 3, value: 3, chosenValue: 3},
        { drug: 'Drug2', option: 'Yes', originalValue: 6, value: 6, chosenValue: 6},
        { drug: 'Drug3', option: 'Yes', originalValue: 4, value: 4, chosenValue: 4},
        { drug: 'Drug4', option: 'Yes', originalValue: 12, value: 12, chosenValue: 12},
        { drug: 'Drug5', option: 'Yes', originalValue: 12, value: 12, chosenValue: 12}
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
    };


    const [ProcedureCost, setProcedureCost] = useState('₹ 0');
    const handleProcedureCostChange = (event) => setProcedureCost(event.target.value);

    const [OCTCost, setOCTCost] = useState('₹ 0');
    const handleOCTCostChange = (event) => setOCTCost(event.target.value);

    const [ConsultingCharges, setConsultingCharges] = useState('₹ 0');
    const handleConsultingChargesChange = (event) => setConsultingCharges(event.target.value);

    const [MiscellaneousCosts, setMiscellaneousCosts] = useState('₹ 0');
    const handleMiscellaneousCostsChange = (event) => setMiscellaneousCosts(event.target.value);

    const [TravelCost, setTravelCost] = useState('₹ 0');
    const handleTravelCostChange = (event) => setTravelCost(event.target.value);

    const [LostOpportunityCost, setLostOpportunityCost] = useState('₹ 0');
    const handleLostOpportunityCostChange = (event) => setLostOpportunityCost(event.target.value);

    const [Caregiver, setCaregiver] = useState('₹ 0');
    const handleCaregiverChange = (event) => setCaregiver(event.target.value);

    
    return (
           
        
        <div className="sidebar">
            <div>
                <img src={logoImage} alt="Logo" style={{ maxWidth: '30%' }} />
            </div>
            
            <div>
                <h2>Disease Indication:</h2>
                <select id="diseaseSelect">
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
                    <td>
                        <select
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
                            <select
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

