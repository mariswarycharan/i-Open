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
import AppContext from './AppContext';
import { useContext, useEffect, useState } from 'react';


// Define colors
const colors = {
    packageCost: '#AFABAB', // Dark blue
    directCost: '#1E90FF', // Main blue
    indirectCosts: '#E7D6FE', // Light blue
};

// Define a custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: colors.packageCost, // Main blue color
        },
        background: {
            default: '#00008B', // Dark blue background color
        },
        blueShades: {
            light: colors.packageCost, // Light blue
            main: colors.directCost, // Main blue
            dark: colors.indirectCosts, // Dark blue
        },
    },
    typography: {
        fontSize: 14,
        fontFamily: ['Arial', 'Helvetica', 'sans-serif'].join(','),
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
                backgroundColor: 'black', // Header background color
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

const chartHeight = 200;

export default function PieChartWithDataTable() {
    const { responseData } = useContext(AppContext);
    const [rows, setRows] = useState([]);
    const [datasets, setDatasets] = useState([]);

    useEffect(() => {
        if (responseData && responseData.Total_Package_Cost) {
            const newRows = responseData.Total_Package_Cost.map((drugData, index) => {
                const [packageCost, directCost, indirectCosts] = drugData.data;

                return {
                    name: `Drug ${index + 1}`,
                    packageCost: packageCost,
                    directCost: directCost,
                    indirectCosts: indirectCosts,
                    totalCosts: packageCost + directCost + indirectCosts,
                };
            });

            setRows(newRows);

            console.log(newRows[0]['packageCost']);

            const newDatasets = newRows.map((row) => {
                const total = row.packageCost + row.directCost + row.indirectCosts;
                return [
                    { id: 0, value: row.packageCost , color: colors.packageCost },
                    { id: 1, value: row.directCost , color: colors.directCost },
                    { id: 2, value: row.indirectCosts , color: colors.indirectCosts },
                ];
            });

            setDatasets(newDatasets);
        }
    }, [responseData]);

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
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Total Package Costs @ Year 1</StyledTableCell>
                                <StyledTableCell align="right">Package Cost</StyledTableCell>
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
                        backgroundColor: '#1E90FF',
                        color: 'white',
                        padding: '10px',
                        textAlign: 'center',
                        marginTop: '30px',
                        borderRadius: '7px',
                        fontSize: '15px'
                    }}
                >
                    With VABYSMO<sup>®</sup>, Do More of what you love with a chance for up to 4 months between treatments.
                </Box>
            </div>
        </ThemeProvider>
    );
}
