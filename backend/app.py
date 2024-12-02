from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import yfinance as yf

# Alpha Vantage API Key
ALPHA_VANTAGE_API_KEY = "LWAZSTQWZLVOQXYZ"

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

def fetch_alpha_vantage_data(stock_symbol):
    """Fetch stock data from Alpha Vantage (BSE extension)."""
    # Append `.BSE` for Bombay Stock Exchange
    stock_symbol_with_extension = stock_symbol + ".BSE"

    alpha_vantage_url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={stock_symbol_with_extension}&apikey={ALPHA_VANTAGE_API_KEY}'
    response = requests.get(alpha_vantage_url).json()

    if 'Time Series (Daily)' in response:
        time_series = response['Time Series (Daily)']
        latest_date = sorted(time_series.keys())[0]
        data = time_series[latest_date]
        return {
            "Date": latest_date,
            "Open": data['1. open'],
            "High": data['2. high'],
            "Low": data['3. low'],
            "Close": data['4. close']
        }
    else:
        return {"Error": response.get("Error Message", "Alpha Vantage data not available.")}

def fetch_nse_data(stock_symbol):
    """Fetch stock data from NSE using Yahoo Finance (NS extension)."""
    # Append `.NS` for National Stock Exchange
    stock_symbol_with_extension = stock_symbol + ".NS"

    try:
        stock = yf.Ticker(stock_symbol_with_extension)
        info = stock.info

        return {
            "Current Price": info.get("regularMarketPrice", "Data not available"),
            "Day High": info.get("dayHigh", "Data not available"),
            "Day Low": info.get("dayLow", "Data not available"),
            "Volume": info.get("volume", "Data not available")
        }
    except Exception as e:
        return {"Error": f"Error fetching NSE data: {str(e)}"}

@app.route('/fetch_stock_data', methods=['POST'])
def fetch_stock_data():
    """Fetch stock data for a given stock name."""
    data = request.get_json()
    stock_name = data.get("stock_name", "").strip()

    if not stock_name:
        return jsonify({"Error": "Stock name is required."}), 400

    # Fetch data from both APIs
    alpha_data = fetch_alpha_vantage_data(stock_name)
    nse_data = fetch_nse_data(stock_name)

    return jsonify({
        "AlphaVantage": alpha_data,
        "NSE": nse_data
    })

# Run the app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
