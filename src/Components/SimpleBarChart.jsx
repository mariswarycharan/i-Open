import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Import the Sidebar component
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

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      {/* Display "i-Open" text centered above the Bar Chart */}
      <Typography variant="h6" align="center" gutterBottom>
        i-Open
      </Typography>

      {/* Bar Chart */}
      <BarChart
        width={500}
        height={300}
        series={[
          { data: responseData.bar_gragh_data[0].data, color: '#151B54' }, // Data for Total Package Cost
          { data: responseData.bar_gragh_data[1].data, color: '#0041C2' }, // Data for Consulting Cost
          { data: responseData.bar_gragh_data[2].data, color: '#1E90FF' }, // Data for OCT Charges
          { data: responseData.bar_gragh_data[3].data, color: '#4863A0' }, // Data for Travel and Food Costs
          { data: responseData.bar_gragh_data[4].data, color: '#79BAEC' }, // Data for Total Opportunity Cost
        ]}
        xAxis={[{ data: xLabels, scaleType: 'band' }]}
        options={{ legend: { display: false } }} // Disable legend
      />

      {/* Legend Box */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Box mr={2} bgcolor="#151B54" width={20} height={20}></Box>
        <Box mr={2}>Data for Total Package Cost</Box>
        <Box mr={2} bgcolor="#0041C2" width={20} height={20}></Box>
        <Box mr={2}>Data for Consulting Cost</Box>
        <Box mr={2} bgcolor="#1E90FF" width={20} height={20}></Box>
        <Box mr={2}>Data for OCT Charges</Box>
        <Box mr={2} bgcolor="#4863A0" width={20} height={20}></Box>
        <Box mr={2}>Data for Travel and Food Costs</Box>
        <Box mr={2} bgcolor="#79BAEC" width={20} height={20}></Box>
        <Box>Data for Total Opportunity Cost</Box>
      </Box>

      {/* Data Table */}
      <TableContainer component={Paper} style={{ marginTop: '20px', width: '100%', maxWidth: '1200px' }}>
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
            {tableData.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.totalPackageCost}</TableCell>
                <TableCell align="right">{row.consultingCost}</TableCell>
                <TableCell align="right">{row.octCharges}</TableCell>
                <TableCell align="right">{row.travelFoodCost}</TableCell>
                <TableCell align="right">{row.opportunityCost}</TableCell>
                <TableCell align="right">
                  {calculateTotalCostPerPatient(row)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SimpleBarChart;
