// HeatMapRect.js
export default class HeatMapRect {
    constructor(overlay, ctx, data, candleWidth) {
        this.ctx = ctx;
        this.overlay = overlay;
        this.data = data;
        this.candleWidth = candleWidth;
        this.MAX_INTENSITY = 100;
        this.RECT_HEIGHT = 20;
    }

    draw() {
        let lastBid = null;
        let lastAsk = null;
        
        this.data.forEach(point => {
            const { x, y, color } = this.calculateRectangleProperties(point);
            this.drawRectangle(x, y, color, point[3]);
            if (point[3] === 'bid') lastBid = { x, y };
            if (point[3] === 'ask') lastAsk = { x, y };
        });
    }

    calculateRectangleProperties(point) {
        const layout = this.overlay.$props.layout;
        const x = layout.t2screen(point[0]) - this.candleWidth / 2;
        const y = layout.$2screen(point[1]);
        const intensity = Math.min(Math.max(point[2] / this.MAX_INTENSITY, 0), 1);
        const color = this.getColorForIntensity(intensity, point[3]);
        return { x, y, color };
    }

    drawRectangle(x, y, color, option) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        if (option === 'bid' && this.lastBid) {
            this.ctx.fillRect(this.lastBid.x, this.lastBid.y, x - this.lastBid.x, this.RECT_HEIGHT);
        } else if (option === 'ask' && this.lastAsk) {
            this.ctx.fillRect(this.lastAsk.x, this.lastAsk.y, x - this.lastAsk.x, this.RECT_HEIGHT);
        }
        this.ctx.fillRect(x, y, this.candleWidth, this.RECT_HEIGHT);
        this.ctx.stroke();
    }

    getColorForIntensity(intensity, option) {
        let r, g, b;
        if (option === 'bid') {
            r = Math.min(46 + (209 - 46) * (1 - intensity), 255);
            g = Math.min(134 + (233 - 134) * (1 - intensity), 255);
            b = Math.min(193 + (255 - 193) * (1 - intensity), 255);
        } else {
            r = Math.min(243 + (255 - 243) * (1 - intensity), 255);
            g = Math.min(156 + (140 - 156) * (1 - intensity), 255);
            b = Math.min(18 + (60 - 18) * (1 - intensity), 255);
        }
        return `rgba(${r}, ${g}, ${b}, ${intensity})`;
    }
  
  
}
