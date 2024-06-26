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

// Styled components with reduced font size and padding
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#05a1c9',
    color: theme.palette.common.white,
    fontSize: '0.75rem', // Smaller font size for the header
    padding: '6px 10px', // Reduced padding
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '0.75rem', // Smaller font size for the body cells
    padding: '6px 10px', // Reduced padding
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f1f1f1',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#ffffff',
  },
}));

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
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
});

// Bar chart colors
const chartColors = ['#05a1c9', '#014d60', '#05c7f7'];

export default function StackedBarChartsWithTables() {
  const [selectedDrug, setSelectedDrug] = React.useState('Drug 2'); // Initial selection for drug 2

  const handleChange = (event) => {
    setSelectedDrug(event.target.value);
  };

  const renderDataTable = () => (
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
            {['Indirect cost', 'Direct cost', 'Total Package cost'].map((row, index) => (
              <StyledTableRow key={row}>
                <StyledTableCell component="th" scope="row">{row}</StyledTableCell>
                {[0, 0, 0, 0, 0].map((value, idx) => (
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
              { data: [1000, 1500, 1300, 1700, 1100], label: 'Indirect Cost', id: 'indirect1', stack: 'total', color: chartColors[0] },
              { data: [2000, 2300, 1900, 2500, 2100], label: 'Direct Cost', id: 'direct1', stack: 'total', color: chartColors[1] },
              { data: [3000, 3800, 3200, 4200, 3200], label: 'Total Package Cost', id: 'total1', stack: 'total', color: chartColors[2] },
            ]}
            xAxis={[{ data: ['1', '2', '3', '4', '5'], scaleType: 'band' }]}
          />
          {renderDataTable()}
        </ChartWithTableContainer>

        {/* Second chart with table */}
        <ChartWithTableContainer>
          <h3>{selectedDrug}</h3>
          <BarChart
            width={500}
            height={300}
            series={[
              { data: [1200, 1600, 1400, 1800, 1150], label: 'Indirect Cost', id: 'indirect2', stack: 'total', color: chartColors[0] },
              { data: [2200, 2400, 2000, 2600, 2150], label: 'Direct Cost', id: 'direct2', stack: 'total', color: chartColors[1] },
              { data: [3400, 4000, 3500, 4400, 3300], label: 'Total Package Cost', id: 'total2', stack: 'total', color: chartColors[2] },
            ]}
            xAxis={[{ data: ['1', '2', '3', '4', '5'], scaleType: 'band' }]}
          />
          {renderDataTable()}
        </ChartWithTableContainer>
      </ChartContainer>
    </Container>
  );
}
