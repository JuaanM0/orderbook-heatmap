<script>
import { Overlay } from "trading-vue-js";
import HeatMapRect from './HeatMapRect.js';
export default {
  name: "HeatMap",
  mixins: [Overlay],
  data() {
    return {
      COLORS: {
        bid: "#2E86C1",
        ask: "#F39C12",
      },
      LEYENDCOLORS: {
        bid: "#2E86C1",
        ask: "#F39C12",
      },
      MAX_INTENSITY: 100,
      RECT_HEIGHT: 20,
    };
  },

  methods: {
    draw(ctx) {
        const layout = this.$props.layout;
        const candleWidth = layout.t2screen(1) - layout.t2screen(0);
        const data = this.$props.data;   
        const heatMapRect = new HeatMapRect(this, ctx, data, candleWidth);
        heatMapRect.draw();
    },
     use_for() {
      return ["HeatMap"];
    },
  },
};
</script>