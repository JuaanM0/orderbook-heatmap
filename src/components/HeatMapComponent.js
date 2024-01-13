// MapLogic.js
import { tradeDataService } from "../services/tradeDataService";




export default class  TradingDataLogic { 


    fetchOHLCVDatas = (exchange, symbol) => {
        return tradeDataService.fetchOHLCVData(exchange, symbol);
    };

    fetchOrderBookDatas = (exchange, symbol) => {
        return tradeDataService.fetchOrderBookData(exchange, symbol);
    };

    parseCandles = (data) => {
        let ohlcv = [data.k.t ,data.k.o ,data.k.h ,data.k.l ,data.k.c, data.k.v].map(parseFloat);
        return ohlcv;
    };

    parseOrderBookDatas = (data,timestamp,multiplierQ,minimumQ) => {

        
        
        
        let orderbook  = Object.values(data);
        
        let bids = orderbook[1].slice(0);
        let asks = orderbook[2].slice(0);
    
  
        let maxQuantity = Math.max(
            ...bids.map(bid => parseFloat(bid[1])),
            ...asks.map(ask => parseFloat(ask[1]))
        );

        const normalizeQuantity = (quantity) => {
            return Math.trunc((quantity / maxQuantity) * multiplierQ);
        };

        let normalizedBids = bids.map(bid => {
            let [price, quantity] = bid;
            return [timestamp, parseFloat(price), normalizeQuantity(parseFloat(quantity) * multiplierQ), "bid"];
        }).filter(bid => bid[2] >= minimumQ);

        let normalizedAsks = asks.map(ask => {
            let [price, quantity] = ask;
            return [timestamp, parseFloat(price), normalizeQuantity(parseFloat(quantity) * multiplierQ), "ask"];
        }).filter(ask => ask[2] >= minimumQ);

        return { normalizedBids, normalizedAsks };
    };
}