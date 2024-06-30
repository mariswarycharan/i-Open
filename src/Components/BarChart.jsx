import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Select,
  MenuItem,
} from '@mui/material';
import tableCellClasses from '@mui/material/TableCell/tableCellClasses';
import './BarChartStyles.css'; // Import the CSS file for additional styles
import { useContext, useEffect, useState } from 'react';
import AppContext from './AppContext';

// Styled components with reduced font size and padding
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#151B54',
    color: theme.palette.common.white,
    fontSize: '0.75rem', // Smaller font size for the header
    padding: '2px 4px', // Reduced padding
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '0.75rem', // Smaller font size for the body cells
    padding: '6px 10px', // Reduced padding
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#ffffff',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#ffffff',
  },
}));

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start', // Align items horizontally
  alignItems: 'flex-start', // Align items vertically
  width: '60%',
  padding: '20px',
});

const ChartContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: '20px',
  width: '100%',
  marginBottom: '20px',
  paddingLeft: '200px',
});

const ChartWithTableContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const DataTableContainer = styled('div')({
  marginTop: '10px',
  width: 'auto',
  // Rotate the table for a vertical layout
  transformOrigin: 'left top', // Rotate around the top left corner
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: '20px'
});

// Bar chart colors
const chartColors = ['#151B54', '#0041C2', '#1E90FF'];

export default function StackedBarChartsWithTables() {
  const [selectedDrug, setSelectedDrug] = React.useState('Drug 2'); // Initial selection for drug 2

  const { responseData, setFormData } = useContext(AppContext);

  const [barChartData, setBarChartData] = React.useState({
    "First_Drug_data": {
      "Indirect_Costs": [
        20700,
        0,
        0,
        0,
        0
      ],
      "Direct_Costs": [
        3600,
        0,
        0,
        0,
        0
      ],
      "Package_Cost": [
        366000,
        0,
        0,
        0,
        0
      ]
    },
    "Second_Drug_data": {
      "Indirect_Costs": [
        27600,
        0,
        0,
        0,
        0
      ],
      "Direct_Costs": [
        4800,
        0,
        0,
        0,
        0
      ],
      "Package_Cost": [
        368000,
        0,
        0,
        0,
        0
      ]
    }
  })

  console.log(responseData);

  useEffect(() => {
    if(!responseData) return;
    const { First_Drug_data, Second_Drug_data } = responseData
    setBarChartData((prev) => ({
      ...prev,
      First_Drug_data,Second_Drug_data
    }))
  }, [responseData])


  const handleChange = (event) => {
    setSelectedDrug(event.target.value);
    setFormData(prev => ({
      ...prev,
      Second_Drug: event.target.value
    }))
  };

  const renderDataTable1 = () => (
    <DataTableContainer>
      <TableContainer component={Paper} className="rotated-table">
        <Table sx={{ minWidth: 300 }} aria-label="cost table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell> {/* Empty cell for row labels */}
              {['1', '2', '3', '4', '5'].map((column) => (
                <StyledTableCell key={column} align="center">{column}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { label: 'Indirect cost', values: barChartData.First_Drug_data.Indirect_Costs },
              { label: 'Direct cost', values: barChartData.First_Drug_data.Direct_Costs },
              { label: 'Total Package cost', values: barChartData.First_Drug_data.Package_Cost }
            ].map((row, index) => (
              <StyledTableRow key={row.label}>
                <StyledTableCell component="th" scope="row">{row.label}</StyledTableCell>
                {row.values.map((value, idx) => (
                  <TableCell key={idx} align="center">₹ {value}</TableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DataTableContainer>
  );

  const renderDataTable2 = () => (
    <DataTableContainer>
      <TableContainer component={Paper} className="rotated-table">
        <Table sx={{ minWidth: 300 }} aria-label="cost table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell> {/* Empty cell for row labels */}
              {['1', '2', '3', '4', '5'].map((column) => (
                <StyledTableCell key={column} align="center">{column}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { label: 'Indirect cost', values: barChartData.Second_Drug_data.Indirect_Costs },
              { label: 'Direct cost', values: barChartData.Second_Drug_data.Direct_Costs },
              { label: 'Total Package cost', values: barChartData.Second_Drug_data.Package_Cost }
            ].map((row, index) => (
              <StyledTableRow key={row.label}>
                <StyledTableCell component="th" scope="row">{row.label}</StyledTableCell>
                {row.values.map((value, idx) => (
                  <TableCell key={idx} align="center">₹ {value}</TableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DataTableContainer>
  );

  return (
    <Container>
      {/* Table section */}
      <TableContainer
        component={Paper}
        style={{
          minWidth: 300,
          maxWidth: 400,
          marginRight: '20px',
          marginBottom: '20px',
          fontSize: '0.75rem', // Reduced font size for the entire table
        }}
        className="molecule-compare-table"
      >
        <Table sx={{ minWidth: 200 }} aria-label="data table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Molecule</StyledTableCell>
              <StyledTableCell>Compare</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">Drug 1</StyledTableCell>
              <TableCell align="center">Yes</TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                <Select value={selectedDrug} onChange={handleChange} fullWidth style={{ fontSize: '0.75rem' }}>
                  {['Drug 2', 'Drug 3', 'Drug 4', 'Drug 5'].map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </StyledTableCell>
              <TableCell align="center">Yes</TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Charts section */}
      <ChartContainer>
        {/* First chart with table */}
        <ChartWithTableContainer>
          <h3>Drug 1</h3>
          <BarChart
            width={500}
            height={300}
            series={[
              { data: barChartData.First_Drug_data.Indirect_Costs, label: 'Indirect Cost', id: 'indirect1', stack: 'total', color: chartColors[0] },
              { data: barChartData.First_Drug_data.Direct_Costs, label: 'Direct Cost', id: 'direct1', stack: 'total', color: chartColors[1] },
              { data: barChartData.First_Drug_data.Package_Cost, label: 'Total Package Cost', id: 'total1', stack: 'total', color: chartColors[2] },
            ]}
            xAxis={[{ data: ['1', '2', '3', '4', '5'], scaleType: 'band' }]}
          />
          {renderDataTable1()}
        </ChartWithTableContainer>

        {/* Second chart with table */}
        <ChartWithTableContainer>
          <h3>{selectedDrug}</h3>
          <BarChart
            width={500}
            height={300}
            series={[
              { data: barChartData.Second_Drug_data.Indirect_Costs, label: 'Indirect Cost', id: 'indirect2', stack: 'total', color: chartColors[0] },
              { data: barChartData.Second_Drug_data.Direct_Costs, label: 'Direct Cost', id: 'direct2', stack: 'total', color: chartColors[1] },
              { data: barChartData.Second_Drug_data.Package_Cost, label: 'Total Package Cost', id: 'total2', stack: 'total', color: chartColors[2] },
            ]}
            xAxis={[{ data: ['1', '2', '3', '4', '5'], scaleType: 'band' }]}
          />
          {renderDataTable2()}
        </ChartWithTableContainer>
      </ChartContainer>
    </Container>
    
  );
}
