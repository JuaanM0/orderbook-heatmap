import axios from 'axios';

const EXCHANGE_CONFIG = {
  binance: {
    orderBookEndpoint: (symbol) => `https://api.binance.com/api/v3/depth?symbol=${symbol.toUpperCase()}&limit=100`,
    ohlcvEndpoint : (symbol) => `https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=1m`,
    webSocketEndpoint: (symbol) => `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_1s`,
  },
  kucoin: {
    orderBookEndpoint: (symbol) => `URLKucoin ${symbol}`,
    ohlcvEndpoint : (symbol) => `URLKucoin  ${symbol}`,
    webSocketEndpoint: (symbol) => `URLWebSocketKucoin ${symbol}`,
  },
};

export const tradeDataService = {
    
    fetchOrderBookData(exchange, symbol) {
      if (!EXCHANGE_CONFIG[exchange]) {
        throw new Error(`Exchange '${exchange}' no supported.`);
      }
  
      const endpoint = EXCHANGE_CONFIG[exchange].orderBookEndpoint(symbol);
      return axios.get(endpoint);
    },

    fetchOHLCVkData(exchange, symbol) {
      if (!EXCHANGE_CONFIG[exchange]) {
          throw new Error(`Exchange '${exchange}' no supported.`);
      }
  
      const endpoint = EXCHANGE_CONFIG[exchange].ohlcvEndpoint(symbol);
      return axios.get(endpoint);
    },
  
    createWebSocket(exchange, symbol, onMessage, onClose) {
      if (!EXCHANGE_CONFIG[exchange]) {
        throw new Error(`Exchange '${exchange}' no supported.`);
      }
  
      const wsEndpoint = EXCHANGE_CONFIG[exchange].webSocketEndpoint(symbol);
      const socket = new WebSocket(wsEndpoint);
      socket.addEventListener('message', onMessage);
      socket.onclose = onClose;
      return socket;
    },
  };

