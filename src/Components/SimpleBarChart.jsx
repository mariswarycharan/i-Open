import React, { useState, useEffect } from 'react';
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

const xLabels = ['Drug 1', 'Drug 2', 'Drug 3', 'Drug 4', 'Drug 5']; // Drug labels

const SimpleBarChart = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Generate random data for demonstration
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const getRandomData = () => {
      return xLabels.map(label => ({
        name: label,
        totalPackageCost: getRandomInt(5000, 300000),
        consultingCost: getRandomInt(5000, 60000),
        octCharges: getRandomInt(5000, 20000),
        travelFoodCost: getRandomInt(5000, 50000),
        opportunityCost: getRandomInt(5000, 60000),
      }));
    };

    // Set initial random data
    setTableData(getRandomData());
  }, []);

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
          { data: tableData.map(item => item.totalPackageCost), color: '#151B54' }, // Data for Total Package Cost
          { data: tableData.map(item => item.consultingCost), color: '#0041C2' }, // Data for Consulting Cost
          { data: tableData.map(item => item.octCharges), color: '#1E90FF' }, // Data for OCT Charges
          { data: tableData.map(item => item.travelFoodCost), color: '#4863A0' }, // Data for Travel and Food Costs
          { data: tableData.map(item => item.opportunityCost), color: '#79BAEC' }, // Data for Total Opportunity Cost
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
