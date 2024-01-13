Please Note: This version of OrderBook Heatmap is a dummy implementation, intended for demonstration purposes. It serves as a prototype to showcase the potential application and functionalities.

With OrderBook Heatmap, you'll be one step ahead in the market, harnessing advanced visualization to make informed and timely trading decisions. Explore the power of visual data and elevate your market analysis to the next level!


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

![XZ1](https://github.com/JuaanM0/orderbook-heatmap/assets/87079935/96cc6fdf-edb2-4734-aa72-17956db0cc64)


![XZ2](https://github.com/JuaanM0/orderbook-heatmap/assets/87079935/3715a382-0acd-4c31-959d-7e84aacf0348)


### CalculateRectangleProperties

This function calculates the properties needed to draw a rectangle (representing a buy or sell order) on the heatmap.

x and y are the coordinates on the canvas where the rectangle should be drawn. They are calculated using the layout object (part of the Trading Vue library) to transform time (point[0]) and price (point[1]) into pixel coordinates.

intensity is calculated as a normalized value of the quantity (point[2]) divided by MAX_INTENSITY. This normalization ensures that the intensity is a value between 0 and 1.

color is determined by the getColorForIntensity function based on the intensity and whether the point represents a supply or demand. 


### DrawRectangle 
This function is responsible for actually drawing the rectangle on the canvas.

It uses ctx (the rendering context of the canvas) to draw rectangles. The color of each rectangle is set by the fillStyle property.

If the current point is a continuation of the previous supply or demand (determined by this.lastBid or this.lastAsk), it draws a rectangle from the last point to the current point to create a continuous visual effect.

### GetColorForIntensity 
This function generates a color based on the intensity and whether it is a bid or ask.

For bids, the color goes from light blue to dark blue as the intensity increases. For demands, the color goes from light yellow to dark orange.

The color is returned in rgba format, where r, g and b are the red, green and blue color values, and the intensity is used as the alpha (transparency) value.

### Config

SYMBOL_BASE: Represents the 'base' of a trading pair. In this case, 'xrp' indicates that Ripple (XRP) is the base currency of the trading pair.
It is generally used in trading platforms to indicate one of the two currencies in a transaction. For example, in the XRP/USDT pair, XRP is the base currency.

SYMBOL_QUOTE: Indicates the "quote" of the trading pair, which in this case is 'usdt' (Tether).

EXCHANGE: Specifies the exchange platform or exchange where the trading is performed, in this case, 'binance'. It indicates that the application obtains data from this exchange.

INTERVAL: Defines the time interval for the data being monitored or viewed, here indicated as '1m', which generally means "one minute".
This interval could be used to determine the data update frequency or to set time intervals in price charts. [NOT USED!]

MULTIPLER: A multiplier applied to certain operations or calculations within the application. To scale certain numerical values. It is currently completely discretionary and must be adjusted manually to find the indicated ratio by which the quantities should be increased. [IN THE FUTURE IT SHOULD BE STANDARDIZED!]

MiniumQuantity: This property sets a minimum threshold, in this case 5, which is likely to be used as a filter or selection criterion.
It can be used to determine the minimum amount of an asset that enters the map. Map quantities must exceed this value to be drawn on the canvas.
