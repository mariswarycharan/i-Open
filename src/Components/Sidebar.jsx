import React, { useState, useEffect, useContext } from 'react';
import logoImage from './i-open.jpeg';
import './Sidebar.css';
import AppContext from './AppContext';


const Sidebar = () => {
    const { formData, setFormData, responseData } = useContext(AppContext);

    const handleTimeHorizonChange = (e) => {
        const newTimeHorizon = e.target.value;
        setFormData(prev => ({
            ...prev,
            time_horizon: newTimeHorizon,
        }));
    };

    var initialTableData = [
        { drug: 'Drug 1', option: 'Yes', originalValue: 6, value: 6, chosenValue: 6 },
        { drug: 'Drug 2', option: 'Yes', originalValue: 8, value: 8, chosenValue: 8 },
        { drug: 'Drug 3', option: 'Yes', originalValue: 8, value: 8, chosenValue: 8 },
        { drug: 'Drug 4', option: 'Yes', originalValue: 12, value: 12, chosenValue: 12 },
        { drug: 'Drug 5', option: 'Yes', originalValue: 12, value: 12, chosenValue: 12 }
    ];

    const [tableData, setTableData] = useState(() => {
        initialTableData.forEach((item, index) => {
            if (formData.drugs_selected.includes(item.drug)) {
                item.option = 'Yes';
            } else {
                item.option = 'No';
            }
            item.value = formData[`drug${index + 1}_dosage`] || 0;
        });
        return initialTableData;
    });
    useEffect(() => {
        if (responseData && formData.tableData) {
            const drug_dosages_side_bar_data = Object.values(responseData.drug_dosages_side_bar_data);
            const newTableData = formData.tableData.map((item, index) => {
                if (item.option === 'Yes') {
                    return { ...item, value: drug_dosages_side_bar_data[index] };
                }
                return { ...item, value: 0 };
            });
            setFormData(prev => ({ ...prev, tableData: newTableData }));

        }
        const data = [...tableData];
        data.forEach((item, index) => {
            if(responseData?.drug_dosages_side_bar_data[`Drug ${index + 1}`]!== undefined && item.option === 'Yes') {
                item.value = responseData.drug_dosages_side_bar_data[`Drug ${index + 1}`];
            }
        });
        setTableData(data);
    }, [responseData]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleOptionChange = (index, newValue) => {
        const newData = [...tableData];
        newData[index].option = newValue;
        newData[index].value = newValue === 'Yes' ? newData[index].value : 0;
        setTableData(newData);

        const drugs_selected_new = newData
            .filter(item => item.option === 'Yes')
            .map(item => item.drug);

        setFormData(prev => ({
            ...prev,
            drugs_selected: drugs_selected_new,
        }));
    };

    const handleDosageChange = (index, newValue) => {
        const newData = [...tableData];
        newData[index].value = Number(newValue);
        setTableData(newData);
        const drugs_selected = newData
            .filter(item => item.option === 'Yes')
            .map(item => item.drug);

        setFormData(prev => ({
            ...prev,
            [`drug${index + 1}_dosage`]: Number(newValue),
            drugs_selected
        }));
    };

    const handleCurrencyChange = (field, value) => {
        const valueWithoutCurrency = value.replace('₹', '').trim();
        const numericValue = parseInt(valueWithoutCurrency, 10);
        setFormData(prev => ({ ...prev, [field]: numericValue }));
    };

    

    return (
        <div className="sidebar">
            <div>
            <img src={logoImage} alt="Logo" style={{ maxWidth: '30%', height: '50px', position: 'relative', top: '-10px'}} />

            </div>

            <div>
                <h2>Disease Indication:</h2>
                <select id="diseaseSelect" value={formData.disease_indication || ''} onChange={e => handleChange('disease_indication', e.target.value)}>
                    <option value="WET AMD">WET AMD</option>
                    <option value="DME">DME</option>
                    <option value="None">None</option>
                </select>
            </div>

            <div>
            <h2>Time Horizon (in years):</h2>
            <select
                    id="timeHorizonSelect"
                    value={formData.time_horizon || ''}
                    onChange={handleTimeHorizonChange}
                >
                    {[1, 2, 3, 4, 5].map(value => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
        </div>

            <div>
                <h2>Government A/C:</h2>
                <select id="governmentACSelect" value={formData.government_ac || ''} onChange={e => handleChange('government_ac', e.target.value)}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="None">None</option>
                </select>
            </div>

           
            <div>
                <h2>Naive/Switch:</h2>
                <select id="naiveSwitchSelect" value={formData.naive_switch || ''} onChange={e => handleChange('naive_switch', e.target.value)}>
                    <option value="Naive">Naive</option>
                    <option value="Switch">Switch</option>
                </select>
            </div>

            <div>
                <h2>Clinical Status:</h2>
                <select id="clinicalStatusSelect" value={formData.clinical_status || ''} onChange={e => handleChange('clinical_status', e.target.value)}>
                    <option value="Per Label">Per Label</option>
                    <option value="RWE">RWE</option>
                </select>
            </div>

            <div className="table-container">
  <table className="drug-table">
    <thead>
      <tr>
        <th>Drug</th>
        <th>Yes/No</th>
        <th>Dosage</th>
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
            {formData.clinical_status === 'RWE' ? (
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
                <select id="ProcedureCost" value={`₹ ${formData.procedure_cost || 0}`} onChange={e => handleCurrencyChange('procedure_cost', e.target.value)}>
                    {[0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000].map(value => (
                        <option key={value} value={`₹ ${value}`}>{`₹ ${value}`}</option>
                    ))}
                </select>
            </div>

            <div>
                <h2>OCT Cost:</h2>
                <select id="OCTCostSelect" value={`₹ ${formData.oct_cost || 0}`} onChange={e => handleCurrencyChange('oct_cost', e.target.value)}>
                    {[0, 200, 300, 500, 700, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000].map(value => (
                        <option key={value} value={`₹ ${value}`}>{`₹ ${value}`}</option>
                    ))}
                </select>
            </div>

            <div>
                <h2>Consulting Charges:</h2>
                <select id="ConsultingChargesSelect" value={`₹ ${formData.consulting_charges || 0}`} onChange={e => handleCurrencyChange('consulting_charges', e.target.value)}>
                    {[0, 200, 300, 500, 700, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000].map(value => (
                        <option key={value} value={`₹ ${value}`}>{`₹ ${value}`}</option>
                    ))}
                </select>
            </div>

            <div>
                <h2>Miscellaneous Costs:</h2>
                <select id="MiscellaneousCostsSelect" value={`₹ ${formData.miscellaneous_cost || 0}`} onChange={e => handleCurrencyChange('miscellaneous_cost', e.target.value)}>
                    {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1200, 1400, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000].map(value => (
                        <option key={value} value={`₹ ${value}`}>{`₹ ${value}`}</option>
                    ))}
                </select>
            </div>

            <div>
                <h2>Travel Cost:</h2>
                <select id="TravelCostSelect" value={`₹ ${formData.travel_cost || 0}`} onChange={e => handleCurrencyChange('travel_cost', e.target.value)}>
                    {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1200, 1400, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000].map(value => (
                        <option key={value} value={`₹ ${value}`}>{`₹ ${value}`}</option>
                    ))}
                </select>
            </div>

            <div>
                <h2>Food Cost:</h2>
                <select id="FoodCostSelect" value={`₹ ${formData.food_cost || 0}`} onChange={e => handleCurrencyChange('food_cost', e.target.value)}>
                    {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1200, 1400, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000].map(value => (
                        <option key={value} value={`₹ ${value}`}>{`₹ ${value}`}</option>
                    ))}
                </select>
            </div>

            <div>
                <h2>Lost Opportunity Cost/Day(Patient):</h2>
                <select id="LostOpportunityCost" value={`₹ ${formData.patient_lost_opportunity_cost || 0}`} onChange={e => handleCurrencyChange('patient_lost_opportunity_cost', e.target.value)}>
                    {[0, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000].map(value => (
                        <option key={value} value={`₹ ${value}`}>{`₹ ${value}`}</option>
                    ))}
                </select>
            </div>

            <div>
                <h2>Lost Opportunity Cost/Day(Caregiver):</h2>
                <select id="Caregiver" value={`₹ ${formData.caregiver_lost_opportunity_cost || 0}`} onChange={e => handleCurrencyChange('caregiver_lost_opportunity_cost', e.target.value)}>
                    {[0, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000].map(value => (
                        <option key={value} value={`₹ ${value}`}>{`₹ ${value}`}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Sidebar;