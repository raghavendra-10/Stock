import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Alert,
} from '@mui/material';

const StockData = () => {
    const [stockSymbol, setStockSymbol] = useState('');
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState(null);

    const fetchStockData = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/fetch_stock_data', {
                stock_name: stockSymbol,
            });
            setStockData(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.Error || 'An error occurred.');
        }
    };

    return (
        <div style={{
            backgroundColor: 'black',
        }}>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Stock Trading Dashboard
                </Typography>

                <Container sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <TextField
                        label="Enter Stock Name (e.g., RELIANCE)"
                        variant="outlined"
                        value={stockSymbol}
                        onChange={(e) => setStockSymbol(e.target.value)}
                        sx={{ mr: 2, width: '300px' }}
                    />
                    <Button variant="contained" color="primary" onClick={fetchStockData}>
                        Fetch Data
                    </Button>
                </Container>

                {error && <Alert severity="error">{error}</Alert>}

                {stockData && (
                    <Container>
                        {/* Alpha Vantage Table */}
                        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                            Alpha Vantage Data
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Open</TableCell>
                                        <TableCell>High</TableCell>
                                        <TableCell>Low</TableCell>
                                        <TableCell>Close</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{stockData.AlphaVantage?.Date || 'N/A'}</TableCell>
                                        <TableCell>{stockData.AlphaVantage?.Open || 'N/A'}</TableCell>
                                        <TableCell>{stockData.AlphaVantage?.High || 'N/A'}</TableCell>
                                        <TableCell>{stockData.AlphaVantage?.Low || 'N/A'}</TableCell>
                                        <TableCell>{stockData.AlphaVantage?.Close || 'N/A'}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* NSE Table */}
                        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                            NSE Data
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Current Price</TableCell>
                                        <TableCell>Day High</TableCell>
                                        <TableCell>Day Low</TableCell>
                                        <TableCell>Volume</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{stockData.NSE?.['Current Price'] || 'N/A'}</TableCell>
                                        <TableCell>{stockData.NSE?.['Day High'] || 'N/A'}</TableCell>
                                        <TableCell>{stockData.NSE?.['Day Low'] || 'N/A'}</TableCell>
                                        <TableCell>{stockData.NSE?.Volume || 'N/A'}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                )}
            </Container>
        </div>
    );
};

export default StockData;
