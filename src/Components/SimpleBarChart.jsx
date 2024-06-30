import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; 
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

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      {/* Display "i-Open" text centered above the Bar Chart */}
      <Typography variant="h5" align="center" gutterBottom sx={{ fontSize: '1.5rem', mb: 1 }}>
        i-Open
      </Typography>

      {/* Bar Chart */}
      <Box width={600} height={350} display="flex" justifyContent="center" alignItems="center">
        <BarChart
          width={550} // Increased width for better visibility
          height={300} // Increased height for better range visibility
          series={[
            { data: responseData.bar_gragh_data[0].data, color: '#151B54', barThickness: 20 }, // Adjusted bar thickness
            { data: responseData.bar_gragh_data[1].data, color: '#0041C2', barThickness: 20 },
            { data: responseData.bar_gragh_data[2].data, color: '#1E90FF', barThickness: 20 },
            { data: responseData.bar_gragh_data[3].data, color: '#4863A0', barThickness: 20 },
            { data: responseData.bar_gragh_data[4].data, color: '#79BAEC', barThickness: 20 },
          ]}
          xAxis={[{ data: xLabels, scaleType: 'band' }]}
          options={{ legend: { display: false }, scales: { x: { beginAtZero: true }}}} // Ensure x-axis starts at zero
        />
      </Box>

      {/* Legend Box */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
        <Box mr={2} bgcolor="#151B54" width={20} height={20}></Box>
        <Box mr={2}>Total Package Cost</Box>
        <Box mr={2} bgcolor="#0041C2" width={20} height={20}></Box>
        <Box mr={2}>Consulting Cost</Box>
        <Box mr={2} bgcolor="#1E90FF" width={20} height={20}></Box>
        <Box mr={2}>OCT Charges</Box>
        <Box mr={2} bgcolor="#4863A0" width={20} height={20}></Box>
        <Box mr={2}>Travel and Food Costs</Box>
        <Box mr={2} bgcolor="#79BAEC" width={20} height={20}></Box>
        <Box>Total Opportunity Cost</Box>
      </Box>

      {/* Data Table */}
      <TableContainer component={Paper} style={{ marginTop: '10px', width: '100%', maxWidth: '1200px', border: '1px solid black' }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="sample dense table">
          <TableHead>
            <TableRow>
              <TableCell>Drug</TableCell>
              <TableCell align="right">Total Package Cost</TableCell>
              <TableCell align="right">Consulting Cost</TableCell>
              <TableCell align="right">OCT Charges</TableCell>
              <TableCell align="right">Travel and Food Cost</TableCell>
              <TableCell align="right">Total Opportunity Cost Lost</TableCell>
              <TableCell align="right">Total Cost/Patient</TableCell>
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
                  <TableCell align="right">{row.totalPackageCost}</TableCell>
                  <TableCell align="right">{row.consultingCost}</TableCell>
                  <TableCell align="right">{row.octCharges}</TableCell>
                  <TableCell align="right">{row.travelFoodCost}</TableCell>
                  <TableCell align="right">{row.opportunityCost}</TableCell>
                  <TableCell align="right" style={{ backgroundColor: totalCost === minCostPatient ? '#F08080' : 'inherit' }}>
                    {totalCost}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SimpleBarChart;

