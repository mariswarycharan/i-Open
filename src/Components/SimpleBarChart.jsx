import React, { useState, useEffect, useContext } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AppContext from './AppContext';

import './SimpleBarChart.css';

const SimpleBarChart = () => {
  const [tableData, setTableData] = useState([]);
  const { responseData, setResponseData } = useContext(AppContext);

  useEffect(() => {
    if (responseData) {
      const newTableData = xLabels.map((label, index) => {
        return {
          name: label,
          totalPackageCost: responseData.bar_gragh_data[0].data[index],
          consultingCost: responseData.bar_gragh_data[1].data[index],
          octCharges: responseData.bar_gragh_data[2].data[index],
          travelFoodCost: responseData.bar_gragh_data[3].data[index],
          opportunityCost: responseData.bar_gragh_data[4].data[index],
        };
      });
      setTableData(newTableData);
    }
  }, [responseData]);

  const calculateTotalCostPerPatient = (row) => {
    const {
      totalPackageCost,
      consultingCost,
      octCharges,
      travelFoodCost,
      opportunityCost,
    } = row;
    return (
      totalPackageCost +
      consultingCost +
      octCharges +
      travelFoodCost +
      opportunityCost
    );
  };

  const xLabels = ['Drug 1', 'Drug 2', 'Drug 3', 'Drug 4', 'Drug 5']; // Drug labels

  if (!responseData) {
    return <div>Loading...</div>;
  }

  // Find the row with the minimum Total Cost/Patient
  const minCostPatient = Math.min(...tableData.map(calculateTotalCostPerPatient));

  const wesToIndianConversion = (n) => {
    n = n.toString();
    let last3 = n.substring(n.length - 3);
    let otherNumbers = n.substring(0, n.length - 3);
    if (otherNumbers !== '') {
        last3 = ',' + last3;
    }
    const regex = /(\d+)(\d{2})/;
    while (regex.test(otherNumbers)) {
        otherNumbers = otherNumbers.replace(regex, '$1,$2');
    }
    return '₹' + otherNumbers + last3;
};


  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={1}>
      {/* Display "i-Open" text centered above the Bar Chart */}
      <Typography variant="h3" align="center" gutterBottom sx={{ fontSize: '2.5rem', mb: 1 }}>
        i-Open
      </Typography>

      {/* Bar Chart */}
      <Box width={1000} height={250} display="flex" justifyContent="center" alignItems="center">
        <BarChart
          width={1000} // Increased width for better visibility
          height={280} // Increased height for better range visibility
          series={[
            { data: responseData.bar_gragh_data[0].data.map(item => Math.round( item / 1000)), color: '#8932FA', barThickness: 20 }, // Adjusted bar thickness
            { data: responseData.bar_gragh_data[1].data.map(item => Math.round( item / 1000)), color: '#FFA500', barThickness: 20 },
            { data: responseData.bar_gragh_data[2].data.map(item => Math.round( item / 1000)), color: '#808080', barThickness: 20 },
            { data: responseData.bar_gragh_data[3].data.map(item => Math.round( item / 1000)), color: '#FFD700', barThickness: 20 },
            { data: responseData.bar_gragh_data[4].data.map(item =>  Math.round( item / 1000)), color: '#49759C', barThickness: 20 },
            { data: responseData.bar_gragh_data[5].data.map(item =>  Math.round( item / 1000)), color: '#290086', barThickness: 20 },
          ]}
          xAxis={[{ data: xLabels, scaleType: 'band' }]}
          options={{ legend: { display: false }, scales: { x: { beginAtZero: true }}}} // Ensure x-axis starts at zero
        />
      </Box>

      {/* Legend Box */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
        <Box mr={3} bgcolor="#8932FA" width={20} height={20}></Box>
        <Box mr={3}>Total Package Cost</Box>
        <Box mr={3} bgcolor="#FFA500" width={20} height={20}></Box>
        <Box mr={3}>Consulting Cost</Box>
        <Box mr={3} bgcolor="#808080" width={20} height={20}></Box>
        <Box mr={3}>OCT Charges</Box>
        <Box mr={3} bgcolor="#FFD700" width={20} height={20}></Box>
        <Box mr={3}>Travel and Food Costs</Box>
        <Box mr={3} bgcolor="#49759C" width={20} height={20}></Box>
        <Box>Total Opportunity Cost</Box>
        <Box mr={3} bgcolor="#290086" width={20} height={20}></Box>
        <Box>Total Cost/Patient</Box>
      </Box>

      {/* Data Table */}
      <TableContainer component={Paper} style={{ marginTop: '10px', width: '100%', maxWidth: '1200px', border: '1px solid black' }}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="sample dense table">
    <TableHead>
      <TableRow>
        <TableCell sx={{ fontWeight: 'bold' }}>Drug</TableCell>
        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total Package Cost</TableCell>
        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Consulting Cost</TableCell>
        <TableCell align="right" sx={{ fontWeight: 'bold' }}>OCT Charges</TableCell>
        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Travel and Food Cost</TableCell>
        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total Opportunity Cost Lost</TableCell>
        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total Cost/Patient</TableCell>
      </TableRow>
    </TableHead>
         
          <TableBody>
            {tableData.map((row) => {
              const totalCost = calculateTotalCostPerPatient(row);
              return (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{wesToIndianConversion(row.totalPackageCost)}</TableCell>
                  <TableCell align="right">{wesToIndianConversion(row.consultingCost)}</TableCell>
                  <TableCell align="right">{wesToIndianConversion(row.octCharges)}</TableCell>
                  <TableCell align="right">{wesToIndianConversion(row.travelFoodCost)}</TableCell>
                  <TableCell align="right">{wesToIndianConversion(row.opportunityCost)}</TableCell>
                  
                  <TableCell align="right" style={{ backgroundColor: totalCost === minCostPatient ? '#F08080' : 'inherit' }}>
                    {wesToIndianConversion(totalCost)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer Box */}
      <Box
        sx={{
          backgroundColor: '#151B54',
          color: 'white',
          padding: '10px',
          textAlign: 'center',
          marginTop: '30px',
          borderRadius: '7px',
          fontSize: '15px',
          maxWidth: '1900px', // Adjust width as needed
        }}
      >
        VABYSMO<sup>®</sup> is the FIRST & ONLY FDA-approved treatment designed to BLOCK 2 CAUSES of vision loss (VEGF & Ang-2)
      </Box>
    </Box>
  );
};

export default SimpleBarChart;

