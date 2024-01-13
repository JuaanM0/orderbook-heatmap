<template>
  <div class="section">
    <trading-vue
      :data="chart"
      :height="height"
      :width="width"
      :titleTxt="titleTxt"
      :indexBased="true"
      :toolbar="true"
      :overlays="overlays"
      :extensions="ext"
      :legend-buttons="['display', { name: 'aumentar', icon: icon }]"
      v-on:legend-button-click="on_button_click"
      :chartConfig="{
        MIN_ZOOM: 1,
        modal: modalHeat,
        contrast: contrast,
      }"
    ></trading-vue>
    <article class="loader_modal" v-if="load">
      <div class="loader"></div>
    </article>
  </div>
</template>
<script>



import { TradingVue, DataCube } from "trading-vue-js";
import XP from "tvjs-xp";
import axios from 'axios';
import HeatMap from "../overlays/HeatMap.vue";
import { tradeDataService } from "../services/tradeDataService"; // Asegúrate de que la ruta sea correcta
import TradingDataLogic from "./HeatMapComponent.js";




export default {
  name: "MapComponent",
  components: { TradingVue},
  data() {
    return {
      titleTxt: "Atrahasis Research : " + env.SYMBOL_BASE.toUpperCase() + "/" + env.SYMBOL_QUOTE.toUpperCase(),
      data: new DataCube(),
      ext: Object.values(XP),
      overlays: [HeatMap],
      heightNav: "",
      height: window.innerHeight - 12,
      width: window.innerWidth,
      modalHeat: true,
      contrast: 1,
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEU0OkArMjhobHEoPUPFEBIuO0L+AAC2FBZ2JyuNICOfGx7xAwTjCAlCNTvVDA1aLzQ3COjMAAAAVUlEQVQI12NgwAaCDSA0888GCItjn0szWGBJTVoGSCjWs8TleQCQYV95evdxkFT8Kpe0PLDi5WfKd4LUsN5zS1sKFolt8bwAZrCaGqNYJAgFDEpQAAAzmxafI4vZWwAAAABJRU5ErkJggg==",
      chart: {},
      load: true,
      useStaticData: false,
      socketChart: null,
      socketOnChart: null,
      tradingLogic: new TradingDataLogic(),

    };
  },
  beforeMount() {
    this.chart = new DataCube({
      chart: {
        type: "Candles",
        data: [],
      },
      onchart: [
        {
          name: "Bid/Ask",
          type: "HeatMap",
          id: "heat-map",
          data: [],
        },
      ],
    });
  },
  mounted() {
   
    
    this.selectedExchange = env.EXCHANGE;
    this.selectedSymbol =  env.SYMBOL_BASE.toUpperCase() + env.SYMBOL_QUOTE.toUpperCase();
    this.selectedTimeframe = env.INTERVAL ;
    this.multiplierQ = env.MULTIPLER;
    this.minimumQ = env.MiniumQuantity;
    




    this.connectToWebSockets(this.selectedExchange, this.selectedSymbol);

    this.heightNav = document.querySelector("nav").offsetHeight;
    this.height -= this.heightNav;
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight - this.heightNav - 8;
    });
    const timeOut = setInterval(() => {
      if (this.chart.data.chart.data.length >= 2) {
        this.load = false;
        clearInterval(timeOut);
      }
    }, 4000);
  },
 methods: {

 
    fetchOrderBookData(exchange, symbol,timestamp) {
      this.tradingLogic.fetchOrderBookDatas(exchange, symbol)
        .then(response => {
          const { normalizedBids, normalizedAsks } = this.tradingLogic.parseOrderBookDatas(response.data,timestamp,this.multiplierQ,this.minimumQ);
          normalizedBids.forEach(bid => this.chart.data.onchart[0].data.push(bid));
          normalizedAsks.forEach(ask => this.chart.data.onchart[0].data.push(ask));
        })
        .catch(error => console.error('Error fetching order book data:', error));
    },
    connectToWebSockets(exchange, symbol) {
      this.socketChart = tradeDataService.createWebSocket(
        exchange, symbol,
        e => this.parse_candle(JSON.parse(e.data)),
        e => this.handleWebSocketClose(e)
      );
    },
    handleWebSocketClose(e) {
      console.log('WebSocket closed. Reconnecting...', e);
    },
    parse_candle(data) {
     
      const candleData = this.tradingLogic.parseCandles(data);
      this.fetchOrderBookData(this.selectedExchange, this.selectedSymbol,candleData[0]);
      this.fill_chart(candleData);
      
    },
    fill_chart(candleData) {
      this.chart.merge("chart.data", [candleData]);
    },
    on_button_click(e) {
      if (e.button === "aumentar") {
        this.modalHeat = !this.modalHeat;
        this.contrast = this.modalHeat ? 1 : 2;
      }
    }
  },
  beforeDestroy() {
    if (this.socketChart) this.socketChart.close();
    if (this.socketOnChart) this.socketOnChart.close();
  }
};
</script>
