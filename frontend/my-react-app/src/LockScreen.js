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
  CircularProgress,
} from '@mui/material';

const StockData = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStockData = async () => {
    setLoading(true); // Start the loader
    setError(null); // Reset any previous errors
    setStockData(null); // Reset previous data
    try {
      const response = await axios.post('http://127.0.0.1:5000/fetch_stock_data', {
        stock_name: stockSymbol,
      });
      setStockData(response.data);
    } catch (err) {
      setError(err.response?.data?.Error || 'An error occurred.');
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        color: '#fff',
        backgroundColor: '#121212',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ color: '#fff' }}>
        Stock Trading Dashboard
      </Typography>

      <Container sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <TextField
          label="Enter Stock Name (e.g., RELIANCE)"
          variant="outlined"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
          sx={{
            mr: 2,
            width: '300px',
            '& .MuiInputBase-root': {
              color: '#fff',
              borderColor: '#fff',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#fff',
            },
            '& .MuiInputLabel-root': {
              color: '#aaa',
            },
          }}
          InputProps={{
            style: { color: '#fff' },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#333',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#555',
            },
          }}
          onClick={fetchStockData}
        >
          Fetch Data
        </Button>
      </Container>

      {loading && (
        <Container sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress sx={{ color: '#fff' }} />
          <Typography sx={{ mt: 2, color: '#fff' }}>Loading...</Typography>
        </Container>
      )}

      {error && <Alert severity="error" sx={{ backgroundColor: '#2a2a2a', color: '#ff6f61' }}>{error}</Alert>}

      {stockData && (
        <Container>
          {/* Alpha Vantage Table */}
          <Typography variant="h5" sx={{ mt: 4, mb: 2, color: '#fff' }}>
            Alpha Vantage Data
          </Typography>
          <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#fff' }}>Date</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Open</TableCell>
                  <TableCell sx={{ color: '#fff' }}>High</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Low</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Close</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ color: '#aaa' }}>{stockData.AlphaVantage?.Date || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#aaa' }}>{stockData.AlphaVantage?.Open || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#aaa' }}>{stockData.AlphaVantage?.High || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#aaa' }}>{stockData.AlphaVantage?.Low || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#aaa' }}>{stockData.AlphaVantage?.Close || 'N/A'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* NSE Table */}
          <Typography variant="h5" sx={{ mt: 4, mb: 2, color: '#fff' }}>
            NSE Data
          </Typography>
          <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#fff' }}>Current Price</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Day High</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Day Low</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Volume</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ color: '#aaa' }}>{stockData.NSE?.['Current Price'] || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#aaa' }}>{stockData.NSE?.['Day High'] || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#aaa' }}>{stockData.NSE?.['Day Low'] || 'N/A'}</TableCell>
                  <TableCell sx={{ color: '#aaa' }}>{stockData.NSE?.Volume || 'N/A'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </Container>
  );
};

export default StockData;
