import * as React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';

// Define color

const colors = {
    packageCost: '#014d60', // Dark blue
    directCost: '#05a1c9', // Main blue
    indirectCosts: '#05c7f7', // Light blue
  };

// Define a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: colors.packageCost, // Main blue color
    },
    background: {
      default: '#00008B', // Light grey background color
    },
    blueShades: {
      light: colors.packageCost, // Light blue
      main: colors.directCost, // Main blue
      dark: colors.indirectCosts, // Dark blue
    },
  },
  typography: {
    // Define typography options
    fontSize: 14,
    fontFamily: [
      'Arial',
      'Helvetica',
      'sans-serif',
    ].join(','),
    h6: {
      fontSize: '1.5rem', // Font size for header cells
    },
    subtitle1: {
      fontSize: '1rem', // Font size for body cells
    },
  },
  overrides: {
    MuiTableCell: {
      root: {
        borderBottom: 'none', // Remove default table cell bottom border
      },
      head: {
        backgroundColor: 'white', // Header background color
        color: '#000', // Header text color
        fontSize: '1.5rem', // Apply h6 font size
      },
      body: {
        fontSize: '1.2rem', // Apply subtitle1 font size
      },
    },
    MuiTableRow: {
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: '#00008B', // Alternate row background color
        },
        '&:nth-of-type(even)': {
          backgroundColor: '#00008B', // Alternate row background color
        },
      },
    },
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.blueShades.main,
    color: theme.palette.common.white,
    fontSize: theme.typography.h6.fontSize, // Use h6 font size
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: theme.typography.subtitle1.fontSize, // Use subtitle1 font size
  },
}));

// Updated rows data with 5 columns and 6 rows
const rows = [
  { name: 'Drug 1', packageCost: 228000, directCost: 20250, indirectCosts: 21600, totalCosts: 269850 },
  { name: 'Drug 2', packageCost: 183000, directCost: 20250, indirectCosts: 21600, totalCosts: 224850 },
  { name: 'Drug 3', packageCost: 180000, directCost: 33750, indirectCosts: 36000, totalCosts: 149750 },
  { name: 'Drug 4', packageCost: 208000, directCost: 54000, indirectCosts: 57600, totalCosts: 319600 },
  { name: 'Drug 5', packageCost: 168000, directCost: 54000, indirectCosts: 57600, totalCosts: 279600 },
];

// Calculate percentages for each drug based on total costs
const datasets = rows.map((row) => {
  const total = row.packageCost + row.directCost + row.indirectCosts;
  return [
    { id: 0, value: (row.packageCost / total) * 100, color: colors.packageCost },
    { id: 1, value: (row.directCost / total) * 100, color: colors.directCost },
    { id: 2, value: (row.indirectCosts / total) * 100, color: colors.indirectCosts },
  ];
});

const chartHeight = 200;

export default function PieChartWithDataTable() {
  const legendItems = [
    { label: 'Package Cost', color: colors.packageCost },
    { label: 'Direct Cost', color: colors.directCost },
    { label: 'Indirect Cost', color: colors.indirectCosts },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          {datasets.map((data, index) => (
            <MuiPieChart
              key={index}
              series={[
                {
                  data,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'black' },
                },
              ]}
              height={chartHeight}
            />
          ))}
        </div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '10px',
            marginBottom: '20px',
          }}
        >
          {legendItems.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: item.color, marginRight: '5px' }}></div>
              {item.label}
            </div>
          ))}
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Total Package Costs @ Year 1</StyledTableCell>
                <StyledTableCell align="right">Total package Cost</StyledTableCell>
                <StyledTableCell align="right">Direct Costs</StyledTableCell>
                <StyledTableCell align="right">Indirect Costs</StyledTableCell>
                <StyledTableCell align="right">Total Costs</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">₹{row.packageCost}</StyledTableCell>
                  <StyledTableCell align="right">₹{row.directCost}</StyledTableCell>
                  <StyledTableCell align="right">₹{row.indirectCosts}</StyledTableCell>
                  <StyledTableCell align="right">₹{row.totalCosts}</StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            backgroundColor: theme.palette.blueShades.main,
            color: 'white',
            padding: '10px',  
            textAlign: 'center',
            marginTop: '50px',
            borderRadius: '5px',
            fontSize: '20px'
          }}
        >
          With VABYSMO<sup>®</sup>, Do More of what you love with a chance for up to 4 months between treatments.
        </Box>
      </div>
    </ThemeProvider>
  );
}
